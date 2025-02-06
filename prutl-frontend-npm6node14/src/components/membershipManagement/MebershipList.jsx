import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMemberships,
  deleteMembership,
  createNewMembership,
  updateMembership,
} from "../../redux/slices/membershipSlice";
import EditableSelectInput from "../common/EditableSelectInput ";
import ErrorModal from "../common/ErrorModal";

const MembershipList = () => {
  const dispatch = useDispatch();
  const { memberships, loading, error } = useSelector(
    (state) => state.memberships
  );
  const [editingMembership, setEditingMembership] = useState(null);
  const [newMembership, setNewMembership] = useState({
    membership_type: "",
    start_date: "",
    end_date: "",
    payment_status: "",
    remark: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    dispatch(getAllMemberships());
  }, [dispatch]);

  const handleDelete = (membershipId) => {
    dispatch(deleteMembership(membershipId));
  };

  const handleEdit = (membership) => {
    setEditingMembership({ ...membership });
    // setShowModal(true);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingMembership) {
      setEditingMembership({ ...editingMembership, [name]: value });
    } else {
      setNewMembership({ ...newMembership, [name]: value });
    }
  };

  const validateForm = (formData) => {
    let newErrors = {};

    if (!formData.membership_type) {
      newErrors.membership_type = "Please enter a valid membership type.";
    }
    if (!formData.start_date) {
      newErrors.start_date = "Please enter a valid start date.";
    }
    if (!formData.end_date) {
      newErrors.end_date = "Please enter a valid end date.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (editingMembership) {
      if (editingMembership.membership_id && editingMembership) {
        dispatch(
          updateMembership({
            membershipId: editingMembership.membership_id,
            data: editingMembership,
          })
        );
      } else {
        console.error("Error: user_id or editingUser is undefined");
      }
      setEditingMembership(null);
    } else {
      if (validateForm(newMembership)) {
        dispatch(createNewMembership(newMembership));
        setNewMembership({
          membership_type: "",
          start_date: "",
          end_date: "",
          payment_status: "",
          remark: "",
        });
        setShowModal(false);
      }
    }
  };

  const handleUndo = () => {
    setEditingMembership(null);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleCloseModal = () => {
    setShowError(false);
  };

  useEffect(() => {
    if (loading) {
      console.log("Loading memberships...");
    }
    if (error) {
      console.error("Error fetching memberships:", error);
    }
    if (memberships.length > 0) {
      console.log("Fetched memberships:", memberships);
    }
  }, [loading, error, memberships]);

  if (loading) {
    return <p>Loading...</p>;
  }

  // if (error) {
  //   return <p className="error-message">{error}</p>;
  // }

  return (
    <div className="membership-list overflow-auto">
      {error && (
        <p className="error-message">
          {showError && (
            <ErrorModal message={error} onClose={handleCloseModal} />
          )}
        </p>
      )}
      <button
        className="bg-blue-500 text-white px-4 py-2 m-2 rounded mb-4"
        onClick={toggleModal}
      >
        Create New Membership
      </button>
      <div className="table-wrapper max-h-80 overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="whitespace-nowrap sticky top-0 z-30 tableHeadEditDelete  ">
            <tr>
              {/* <th className="px-4 py-2 whitespace-nowrap sticky top-0 left-0 z-20 tableHeadEditDelete">
                Membership ID
              </th> */}
              <th className="px-4 py-2 whitespace-nowrap">Membership Type</th>
              <th className="px-4 py-2 whitespace-nowrap">Start Date</th>
              <th className="px-4 py-2 whitespace-nowrap">End Date</th>
              <th className="px-4 py-2 whitespace-nowrap">Payment Status</th>
              <th className="px-4 py-2 whitespace-nowrap">Remark</th>
              <th className="px-4 py-2 whitespace-nowrap sticky top-0 right-0 z-20 tableHeadEditDelete">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {memberships.map((membership) => (
              <tr key={membership.membership_id}>
                {/* <td className="px-4 py-2 whitespace-nowrap sticky left-0 tableHeadEditDelete">
                  {membership.membership_id}
                </td> */}
                <td className="px-4 py-2 whitespace-nowrap">
                  {editingMembership && editingMembership.membership_id === membership.membership_id ? (
                    <EditableSelectInput
                      name="membership_type"
                      options={memberships.map((membership) => ({
                        value: membership.membership_type, // Actual value (membership_type)
                        label: membership.membership_type, // Display value (membership.membership_type)
                      }))}
                      value={editingMembership.membership_type}
                      onChange={handleInputChange}
                      editable={true} // Allows typing and selection from dropdown
                      // error={errors.membership_type}
                      placeholder="Select Membership Type"
                      id="membership_type"
                    />
                  ) : (
                    membership.membership_type
                  )}
                </td>
                {/* <td className="px-4 py-2 whitespace-nowrap">
                  {editingMembership &&
                  editingMembership.membership_id ===
                    membership.membership_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="membership_type"
                        value={editingMembership.membership_type || ""}
                        onChange={handleInputChange}
                        placeholder="Membership Type"
                      />
                    </div>
                  ) : (
                    membership.membership_type
                  )}
                </td> */}
                <td className="px-4 py-2 whitespace-nowrap">
                  {editingMembership &&
                  editingMembership.membership_id ===
                    membership.membership_id ? (
                    <div className="input-group">
                      <input
                        type="date"
                        name="start_date"
                        value={editingMembership.start_date.split("T")[0] || ""}
                        onChange={handleInputChange}
                        placeholder="Start Date"
                      />
                    </div>
                  ) : (
                    new Date(membership.start_date).toLocaleDateString()
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingMembership &&
                  editingMembership.membership_id ===
                    membership.membership_id ? (
                    <div className="input-group">
                      <input
                        type="date"
                        name="end_date"
                        value={editingMembership.end_date.split("T")[0] || ""}
                        onChange={handleInputChange}
                        placeholder="End Date"
                      />
                    </div>
                  ) : (
                    new Date(membership.end_date).toLocaleDateString()
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingMembership && editingMembership.membership_id === membership.membership_id ? (
                    <EditableSelectInput
                      name="payment_status"
                      options={memberships.map((membership) => ({
                        value: membership.payment_status, // Actual value (payment_status)
                        label: membership.payment_status, // Display value (membership.payment_status)
                      }))}
                      value={editingMembership.payment_status}
                      onChange={handleInputChange}
                      editable={true} // Allows typing and selection from dropdown
                      // error={errors.payment_status}
                      placeholder="Select Payment Status"
                      id="payment_status"
                    />
                  ) : (
                    membership.payment_status
                  )}
                </td>

                {/* <td className="px-4 py-2 whitespace-nowrap">
                  {editingMembership &&
                  editingMembership.membership_id ===
                    membership.membership_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="payment_status"
                        value={editingMembership.payment_status || ""}
                        onChange={handleInputChange}
                        placeholder="Payment Status"
                      />
                    </div>
                  ) : (
                    membership.payment_status
                  )}
                </td> */}
                <td className="px-4 py-2 whitespace-nowrap">
                  {editingMembership &&
                  editingMembership.membership_id ===
                    membership.membership_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="remark"
                        value={editingMembership.remark || ""}
                        onChange={handleInputChange}
                        placeholder="Remark"
                      />
                    </div>
                  ) : (
                    membership.remark
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap sticky right-0 tableHeadEditDelete">
                  {editingMembership &&
                  editingMembership.membership_id ===
                    membership.membership_id ? (
                    <>
                      <button
                        className="bg-green-500 text-white px-4 py-1 mx-5 rounded"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-500 text-white px-3 py-1 rounded"
                        onClick={handleUndo}
                      >
                        Undo
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="bg-blue-500 text-white px-5 py-1 mx-5 rounded"
                        onClick={() => handleEdit(membership)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 my-1 rounded"
                        onClick={() => handleDelete(membership.membership_id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center mt-12 z-30 ">
          <div className="registerCard px-6 py-1 rounded-lg shadow-lg w-full max-w-6xl  ">
            <h2 className="text-2xl font-semibold mb-4">
              Register New Membership
            </h2>
            <form className="grid grid-cols-5 gap-4">
            <EditableSelectInput
            label="Membership Type"
                      name="membership_type"
                      options={memberships.map((membership) => ({
                        value: membership.membership_type, // Actual value (membership_type)
                        label: membership.membership_type, // Display value (membership.membership_type)
                      }))}
                      value={newMembership.membership_type}
                      onChange={handleInputChange}
                      editable={true} // Allows typing and selection from dropdown
                      error={errors.membership_type}
                      showRequired={true}
                      placeholder="Select Membership Type"
                      id="membership_type"
                    />
              {/* <div className="input-group">
                <label htmlFor="membership_type">
                  Membership Type <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="membership_type"
                  value={newMembership.membership_type || ""}
                  onChange={handleInputChange}
                  placeholder="Membership Type"
                  className="w-full p-2 mb-4 border rounded"
                />
                {errors.membership_type && (
                  <p className="text-red-500">{errors.name}</p>
                )}
              </div> */}

              <div className="input-group">
                <label htmlFor="start_date">
                  Start Date <span className="error-message">*</span>
                </label>
                <input
                  type="date"
                  name="start_date"
                  value={newMembership.start_date || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-4 border rounded"
                />
                {errors.start_date && (
                  <p className="error-message text-sm">{errors.start_date}</p>
                )}
              </div>
              <div className="input-group">
                <label htmlFor="end_date">
                  End Date <span className="error-message">*</span>
                </label>
                <input
                  type="date"
                  name="end_date"
                  value={newMembership.end_date || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-4 border rounded"
                />
                {errors.end_date && (
                  <p className="error-message text-sm">{errors.end_date}</p>
                )}
              </div>

              <EditableSelectInput
              label="Payment Status"
                      name="payment_status"
                      options={memberships.map((membership) => ({
                        value: membership.payment_status, // Actual value (payment_status)
                        label: membership.payment_status, // Display value (membership.payment_status)
                      }))}
                      value={newMembership.payment_status}
                      onChange={handleInputChange}
                      editable={true} // Allows typing and selection from dropdown
                      error={errors.payment_status}
                      placeholder="Select Payment Status"
                      id="payment_status"
                    />
              
              {/* <div className="input-group">
                <label htmlFor="payment_status">Payment Status</label>
                <input
                  type="text"
                  name="payment_status"
                  value={newMembership.payment_status || ""}
                  onChange={handleInputChange}
                  placeholder="Payment Status"
                  className="w-full p-2 mb-4 border rounded"
                />
              </div> */}
            
              <div className="input-group row-span-3">
                <label htmlFor="remark">Remark</label>
                <textarea
                  name="remark"
                  value={newMembership.remark || ""}
                  onChange={handleInputChange}
                  placeholder="Remark"
                  className="w-full p-2 mb-4 border rounded"
                />
              </div>
              <div className="col-span-5 flex justify-center">
                <button
                  type="button"
                  className="bg-green-500 text-white px-5 py-2 rounded mr-2"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={toggleModal}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipList;

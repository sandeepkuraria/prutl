// prutl-frontend-npm6node14/src/components/teamManagement/FamilyMemberList.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllFamilyMembers,
  createNewFamilyMember,
  updateFamilyMember,
  deleteFamilyMember,
} from "../../redux/slices/familyMemberSlice.js";
import { getAllUsers } from "../../redux/slices/userSlice.js";
import ErrorModal from "../common/ErrorModal.jsx";
import { getAllFamilies } from "../../redux/slices/familySlice.js";
import EditableSelectInput from "../common/EditableSelectInput .jsx";

const FamilyMemberList = () => {
  const dispatch = useDispatch();
  const { familyMembers, loading, error } = useSelector(
    (state) => state.familyMembers
  );
  const { users, loadingUsers, errorUsers } = useSelector(
    (state) => state.users
  );
  const { families, loadingFamily, errorFamily } = useSelector(
    (state) => state.families
  );
  const [editingFamilyMember, setEditingFamilyMember] = useState(null);
  const [newFamilyMember, setNewFamilyMember] = useState({
    family_id: "",
    user_id: "",
    relationship: "",
    remark: "",
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    dispatch(getAllFamilyMembers());
    dispatch(getAllUsers());
    dispatch(getAllFamilies());
  }, [dispatch]);

  const handleDelete = (familyMemberId) => {
    dispatch(deleteFamilyMember(familyMemberId));
  };

  const handleEdit = (familyMember) => {
    setEditingFamilyMember({ ...familyMember });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingFamilyMember) {
      setEditingFamilyMember({ ...editingFamilyMember, [name]: value });
    } else {
      setNewFamilyMember({ ...newFamilyMember, [name]: value });
    }
  };

  const validateForm = (formData) => {
    let newErrors = {};
    if (!formData.family_id) newErrors.family_id = "Family Name is required";
    if (!formData.user_id) newErrors.user_id = "User Name is required";
    if (!formData.relationship)
      newErrors.relationship = "Relationship is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (editingFamilyMember) {
      if (editingFamilyMember.family_member_id && editingFamilyMember) {
        dispatch(
          updateFamilyMember({
            familyMemberId: editingFamilyMember.family_member_id,
            data: editingFamilyMember,
          })
        );
      } else {
        console.error(
          "Error: familyMemberId or editingFamilyMember is undefined"
        );
      }
      setEditingFamilyMember(null);
    } else {
      if (validateForm(newFamilyMember)) {
        dispatch(createNewFamilyMember(newFamilyMember));
        setNewFamilyMember({
          family_id: "",
          user_id: "",
          relationship: "",
          remark: "",
        });
        setShowModal(false);
      }
    }
  };

  const handleUndo = () => {
    setEditingFamilyMember(null);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  const handleCloseModal = () => {
    setShowError(false);
  };

  useEffect(() => {
    if (loading) {
      console.log("Loading family members...");
    }
    if (error) {
      console.error("Error fetching family members:", error);
    }
    if (familyMembers.length > 0) {
      console.log("Fetched family members:", familyMembers);
    }
    if (loadingUsers) {
      console.log("Loading users...");
    }
    if (errorUsers) {
      console.error("Error fetching users:", errorUsers);
    }
    if (users.length > 0) {
      console.log("Fetched users:", users);
    }
    if (loadingFamily) {
      console.log("Loading families...");
    }
    if (errorFamily) {
      console.error("Error fetching families:", errorUsers);
    }
    if (families.length > 0) {
      console.log("Fetched families:", families);
    }
  }, [
    loading,
    error,
    familyMembers,
    users,
    loadingUsers,
    errorUsers,
    families,
    loadingFamily,
    errorFamily,
  ]);

  if (loading) return <p>Loading...</p>;
  // if (error) return <p className="error-message">{error}</p>;
  if (loadingUsers) return <p>Loading...</p>;
  if (errorUsers) return <p className="error-message">{errorUsers}</p>;
  return (
    <div className="family-member-list overflow-auto">
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
        Create New Family Member
      </button>
      <div className="table-wrapper max-h-80 overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="whitespace-nowrap sticky top-0 z-30 tableHeadEditDelete">
            <tr>
              {/* <th className="px-4 py-2 whitespace-nowrap sticky top-0 left-0 z-20 tableHeadEditDelete">
                Family Member ID
              </th> */}
              <th className="px-4 py-2 whitespace-nowrap">Family Name</th>
              <th className="px-4 py-2 whitespace-nowrap">User Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Relationship</th>
              <th className="px-4 py-2 whitespace-nowrap">Remark</th>
              <th className="px-4 py-2 whitespace-nowrap sticky top-0 right-0 z-20 tableHeadEditDelete">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {familyMembers.map((familyMember) => (
              <tr key={familyMember.family_member_id}>
                {/* <td className="px-4 py-2 whitespace-nowrap sticky left-0 tableHeadEditDelete">
                  {familyMember.family_member_id}
                </td> */}

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingFamilyMember &&
                  editingFamilyMember.family_member_id ===
                    familyMember.family_member_id ? (
                    <EditableSelectInput
                      name="family_id"
                      options={families.map((family) => ({
                        value: family.family_id, // Actual value (family_id)
                        label: family.family_name, // Display value (family.family_name)
                      }))}
                      value={editingFamilyMember.family_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errors.family_id}
                      placeholder="Select Family Name"
                      id="family_id"
                    />
                  ) : (
                    // familyMember.family_id
                    // Display family name based on family id when not in edit mode
                    families.find(
                      (family) => family.family_id === familyMember.family_id
                    )?.family_name || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingFamilyMember &&
                  editingFamilyMember.family_member_id ===
                    familyMember.family_member_id ? (
                    <EditableSelectInput
                      name="user_id"
                      options={users.map((user) => ({
                        value: user.user_id, // Actual value (user_id)
                        label: user.name, // Display value (user.name)
                      }))}
                      value={editingFamilyMember.user_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errors.user_id}
                      placeholder="Select User Name"
                      id="user_id"
                    />
                  ) : (
                    // familyMember.user_id
                    // Display user name based on user id when not in edit mode
                    users.find((user) => user.user_id === familyMember.user_id)
                      ?.name || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingFamilyMember &&
                  editingFamilyMember.family_member_id ===
                    familyMember.family_member_id ? (
                    <EditableSelectInput
                      name="relationship"
                      options={familyMembers.map((familyMember) => ({
                        value: familyMember.relationship, // Actual value (relationship)
                        label: familyMember.relationship, // Display value (familyMember.relationship)
                      }))}
                      value={editingFamilyMember.relationship}
                      onChange={handleInputChange}
                      editable={true} // Allows selection from dropdown
                      // error={errors.relationship}
                      placeholder="Select Relationship"
                      id="relationship"
                    />
                  ) : (
                    familyMember.relationship
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingFamilyMember &&
                  editingFamilyMember.family_member_id ===
                    familyMember.family_member_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="remark"
                        value={editingFamilyMember.remark || ""}
                        onChange={handleInputChange}
                        placeholder="Remark"
                      />
                    </div>
                  ) : (
                    familyMember.remark
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap sticky right-0 tableHeadEditDelete">
                  {editingFamilyMember &&
                  editingFamilyMember.family_member_id ===
                    familyMember.family_member_id ? (
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
                        onClick={() => handleEdit(familyMember)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-1 rounded"
                        onClick={() =>
                          handleDelete(familyMember.family_member_id)
                        }
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
      {/* Modal for Creating a New Family Member */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center mt-12 z-30">
          <div className="registerCard px-6 py-1 rounded-lg shadow-lg w-full max-w-6xl">
            <h2 className="text-2xl font-semibold mb-4">
              Create New Family Member
            </h2>
            <form className="grid grid-cols-4 gap-4">
              <EditableSelectInput
                label="Family Name"
                name="family_id"
                options={families.map((family) => ({
                  value: family.family_id, // Actual value (family_id)
                  label: family.family_name, // Display value (family.family_name)
                }))}
                value={newFamilyMember.family_id}
                onChange={handleInputChange}
                editable={false} // Allows selection from dropdown
                error={errors.family_id}
                showRequired={true}
                placeholder="Select Family Name"
                id="family_id"
              />

              <EditableSelectInput
                label="User Name"
                name="user_id"
                options={users.map((user) => ({
                  value: user.user_id, // Actual value (user_id)
                  label: user.name, // Display value (user.name)
                }))}
                value={newFamilyMember.user_id}
                onChange={handleInputChange}
                editable={false} // Allows selection from dropdown
                error={errors.user_id}
                showRequired={true}
                placeholder="Select User Name"
                id="user_id"
              />

              <EditableSelectInput
                label="Relationship"
                name="relationship"
                options={familyMembers.map((familyMember) => ({
                  value: familyMember.relationship, // Actual value (relationship)
                  label: familyMember.relationship, // Display value (familyMember.relationship)
                }))}
                value={newFamilyMember.relationship}
                onChange={handleInputChange}
                editable={true} // Allows selection from dropdown
                error={errors.relationship}
                showRequired={true}
                placeholder="Select Relationship"
                id="relationship"
              />

              <div className="input-group row-span-3">
                <label htmlFor="remark">Remark</label>
                <textarea
                  name="remark"
                  value={newFamilyMember.remark || ""}
                  onChange={handleInputChange}
                  placeholder="Remark"
                  className="w-full p-2 mb-4 border rounded"
                />
              </div>
            </form>
            <div className="col-span-4 text-center">
              <button
                className="bg-green-500 text-white px-4 py-2 mr-2 rounded"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={toggleModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyMemberList;

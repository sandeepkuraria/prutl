import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllHalls,
  createNewHall,
  updateHall,
  deleteHall,
} from "../../redux/slices/hallSlice.js";
import ErrorModal from "../common/ErrorModal.jsx";
import EditableSelectInput from "../common/EditableSelectInput .jsx";
import { getAllVenues } from "../../redux/slices/venueSlice.js";

const HallList = () => {
  const dispatch = useDispatch();
  const { halls, loading, error } = useSelector((state) => state.halls);
  const { venues, loadingVenues, errorVenues } = useSelector(
    (state) => state.venues
  );
  const [editingHall, setEditingHall] = useState(null);
  const [newHall, setNewHall] = useState({
    // hall_code: "",
    hall_name: "",
    venue_id: "",
    seating_capacity: "",
    remark: "",
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    dispatch(getAllHalls());
    dispatch(getAllVenues());
  }, [dispatch]);

  const handleDelete = (hallId) => {
    dispatch(deleteHall(hallId));
  };

  const handleEdit = (hall) => {
    setEditingHall({ ...hall });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingHall) {
      setEditingHall({ ...editingHall, [name]: value });
    } else {
      setNewHall({ ...newHall, [name]: value });
    }
  };

  const validateForm = (formData) => {
    let newErrors = {};
    // if (!formData.hall_code) newErrors.hall_code = "Hall Code is required";
    if (!formData.hall_name) newErrors.hall_name = "Hall Name is required";
    if (!formData.venue_id) newErrors.venue_id = "Venue ID is required";
    if (!formData.seating_capacity)
      newErrors.seating_capacity = "Seating Capacity is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (editingHall) {
      if (editingHall.hall_id && editingHall) {
        dispatch(
          updateHall({
            hallId: editingHall.hall_id,
            data: editingHall,
          })
        );
      } else {
        console.error("Error: hallId or editingHall is undefined");
      }
      setEditingHall(null);
    } else {
      if (validateForm(newHall)) {
        dispatch(createNewHall(newHall));
        setNewHall({
          // hall_code: "",
          hall_name: "",
          venue_id: "",
          seating_capacity: "",
          remark: "",
        });
        setShowModal(false);
      }
    }
  };

  const handleUndo = () => {
    setEditingHall(null);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setNewHall({
      // hall_code: "",
      hall_name: "",
      venue_id: "",
      seating_capacity: "",
      remark: "",
    });
  };

  const handleCloseModal = () => {
    setShowError(false);
  };

  useEffect(() => {
    if (loading) {
      console.log("Loading halls...");
    }
    if (error) {
      console.error("Error fetching halls:", error);
    }
    if (halls.length > 0) {
      console.log("Fetched halls:", halls);
    }
    if (loadingVenues) {
      console.log("Loading venues...");
    }
    if (errorVenues) {
      console.error("Error fetching venues:", errorVenues);
    }
    if (venues.length > 0) {
      console.log("Fetched venues:", venues);
    }
  }, [loading, error, halls, loadingVenues, errorVenues, venues]);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p className="error-message">{error}</p>;
  if (loadingVenues) return <p>Loading venues...</p>;
  if (errorVenues) return <p className="error-message">{errorVenues}</p>;

  return (
    <div className="hall-list overflow-auto">
      {loading && <p> Loading</p>}
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
        Create New Hall
      </button>
      <div className="table-wrapper max-h-80 overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="whitespace-nowrap sticky top-0 z-30 tableHeadEditDelete">
            <tr>
              {/* <th className="px-4 py-2 whitespace-nowrap sticky top-0 left-0 z-20 tableHeadEditDelete">
                Hall ID
              </th> */}
              {/* <th className="px-4 py-2 whitespace-nowrap">Hall Code</th> */}
              <th className="px-4 py-2 whitespace-nowrap">Hall Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Venue Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Seating Capacity</th>
              <th className="px-4 py-2 whitespace-nowrap">Remark</th>
              <th className="px-4 py-2 whitespace-nowrap sticky top-0 right-0 z-20 tableHeadEditDelete">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {halls.map((hall) => (
              <tr key={hall.hall_id}>
                {/* <td className="px-4 py-2 whitespace-nowrap sticky left-0 tableHeadEditDelete">
                  {hall.hall_id}
                </td> */}
                {/* <td className="px-4 py-2 whitespace-nowrap">
                  {editingHall && editingHall.hall_id === hall.hall_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="hall_code"
                        value={editingHall.hall_code || ""}
                        onChange={handleInputChange}
                        placeholder="Hall Code"
                      />
                    </div>
                  ) : (
                    hall.hall_code
                  )}
                </td> */}
                <td className="px-4 py-2 whitespace-nowrap">
                  {editingHall && editingHall.hall_id === hall.hall_id ? (
                    <EditableSelectInput
                      name="hall_name"
                      options={halls.map((hall) => ({
                        value: hall.hall_name, // Actual value (hall_name)
                        label: hall.hall_name, // Display value (hall.hall_name)
                      }))}
                      value={editingHall.hall_name}
                      onChange={handleInputChange}
                      editable={true} // Allows typing and selection from dropdown
                      // error={errors.hall_name}
                      placeholder="Select or Enter Hall Name"
                      id="hall_name"
                    />
                  ) : (
                    hall.hall_name
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingHall && editingHall.hall_id === hall.hall_id ? (
                    <EditableSelectInput
                      name="venue_id"
                      options={venues.map((venue) => ({
                        value: venue.venue_id, // Actual value (venue_id)
                        label: venue.venue_name, // Display value (hall.venue_name)
                      }))}
                      value={editingHall.venue_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errors.venue_id}
                      placeholder="Select Venue Name"
                      id="venue_id"
                    />
                  ) : (
                    // venue.venue_id
                    // Display venue name based on venue_id when not in edit mode
                    venues.find((venue) => venue.venue_id === hall.venue_id)
                      ?.venue_name || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingHall && editingHall.hall_id === hall.hall_id ? (
                    <EditableSelectInput
                      name="seating_capacity"
                      options={halls.map((hall) => ({
                        value: hall.seating_capacity, // Actual value (seating_capacity)
                        label: hall.seating_capacity.toString(), // Display value as string
                      }))}
                      value={editingHall.seating_capacity}
                      onChange={handleInputChange}
                      editable={true} // Allows typing and selection from dropdown
                      // error={errors.seating_capacity} // Display error if any
                      placeholder="Select or Enter Seating Capacity"
                      id="seating_capacity"
                      isNumeric={true}
                    />
                  ) : (
                    hall.seating_capacity
                  )}
                </td>

                {/* <td className="px-4 py-2 whitespace-nowrap">
                  {editingHall && editingHall.hall_id === hall.hall_id ? (
                    <div className="input-group">
                      <input
                        type="number"
                        name="seating_capacity"
                        value={editingHall.seating_capacity || ""}
                        onChange={handleInputChange}
                        placeholder="Seating Capacity"
                      />
                    </div>
                  ) : (
                    hall.seating_capacity
                  )}
                </td> */}
                <td className="px-4 py-2 whitespace-nowrap">
                  {editingHall && editingHall.hall_id === hall.hall_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="remark"
                        value={editingHall.remark || ""}
                        onChange={handleInputChange}
                        placeholder="Remark"
                      />
                    </div>
                  ) : (
                    hall.remark
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap sticky right-0 tableHeadEditDelete">
                  {editingHall && editingHall.hall_id === hall.hall_id ? (
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
                        onClick={() => handleEdit(hall)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-1 rounded"
                        onClick={() => handleDelete(hall.hall_id)}
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
      {/* Modal for Creating a New Hall */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center mt-12 z-30">
          <div className="registerCard px-6 py-1 rounded-lg shadow-lg w-full max-w-6xl">
            <h2 className="text-2xl font-semibold mb-4">Create New Hall</h2>
            <form className="grid grid-cols-4 gap-4">
              {/* <div className="input-group row-span-3">
                <label htmlFor="hall_code">Hall Code</label>
                <input
                  type="text"
                  id="hall_code"
                  name="hall_code"
                  value={newHall.hall_code}
                  onChange={handleInputChange}
                  placeholder="Hall Code"
                />
                {errors.hall_code && (
                  <span className="text-red-500">{errors.hall_code}</span>
                )}
              </div> */}
              <EditableSelectInput
              label="Hall Name"
                      name="hall_name"
                      options={halls.map((hall) => ({
                        value: hall.hall_name, // Actual value (hall_name)
                        label: hall.hall_name, // Display value (hall.hall_name)
                      }))}
                      value={newHall.hall_name}
                      onChange={handleInputChange}
                      editable={true} // Allows typing and selection from dropdown
                      error={errors.hall_name}
                      showRequired={true}
                      placeholder="Select or Enter Hall Name"
                      id="hall_name"
                    />
            <EditableSelectInput
                          label="Venue Name"
                      name="venue_id"
                      options={venues.map((venue) => ({
                        value: venue.venue_id, // Actual value (venue_id)
                        label: venue.venue_name, // Display value (hall.venue_name)
                      }))}
                      value={newHall.venue_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      error={errors.venue_id}
                      showRequired={true}
                      placeholder="Select Venue Name"
                      id="venue_id"
                    />
            <EditableSelectInput
            label="Seating Capacity"
                      name="seating_capacity"
                      options={halls.map((hall) => ({
                        value: hall.seating_capacity, // Actual value (seating_capacity)
                        label: hall.seating_capacity.toString(), // Display value as string
                      }))}
                      value={newHall.seating_capacity}
                      onChange={handleInputChange}
                      editable={true} // Allows typing and selection from dropdown
                      error={errors.seating_capacity} // Display error if any
                      showRequired={true}
                      placeholder="Select or Enter Seating Capacity"
                      id="seating_capacity"
                      isNumeric={true}
                    />
              <div className="input-group row-span-3">
                <label htmlFor="remark">Remark</label>
                <textarea
                  name="remark"
                  value={newHall.remark || ""}
                  onChange={handleInputChange}
                  placeholder="Remark"
                  className="w-full p-2 mb-4 border rounded"
                />
              </div>
              <div className="col-span-4 text-center">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded mr-4"
                  type="button"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  type="button"
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

export default HallList;

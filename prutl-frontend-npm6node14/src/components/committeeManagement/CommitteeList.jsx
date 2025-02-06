// prutl-frontend-npm6node14/src/components/committeeManagement/CommitteeList.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCommittees,
  createNewCommittee,
  updateCommittee,
  deleteCommittee,
} from "../../redux/slices/committeeSlice.js";
import { getAllEvents } from "../../redux/slices/eventSlice.js";
import ErrorModal from "../common/ErrorModal.jsx";
import EditableSelectInput from "../common/EditableSelectInput .jsx";

const CommitteeList = () => {
  const dispatch = useDispatch();
  const { committees, loading, error } = useSelector(
    (state) => state.committees
  );
  const { events, loadingEvents, errorEvents } = useSelector(
    (state) => state.events
  );
  const [editingCommittee, setEditingCommittee] = useState(null);
  const [newCommittee, setNewCommittee] = useState({
    event_id: "",
    committee_name: "",
    committee_type: "",
    remark: "",
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    dispatch(getAllCommittees());
    dispatch(getAllEvents());
  }, [dispatch]);

  const handleDelete = (committeeId) => {
    dispatch(deleteCommittee(committeeId));
  };

  const handleEdit = (committee) => {
    setEditingCommittee({ ...committee });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingCommittee) {
      setEditingCommittee({ ...editingCommittee, [name]: value });
    } else {
      setNewCommittee({ ...newCommittee, [name]: value });
    }
  };

  const validateForm = (formData) => {
    let newErrors = {};
    if (!formData.event_id) newErrors.event_id = "Event ID is required";
    if (!formData.committee_name)
      newErrors.committee_name = "Committee name is required";
    if (!formData.committee_type)
      newErrors.committee_type = "Committee type is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (editingCommittee) {
      if (editingCommittee.committee_id && editingCommittee) {
        dispatch(
          updateCommittee({
            committeeId: editingCommittee.committee_id,
            data: editingCommittee,
          })
        );
      } else {
        console.error("Error: committeeId or editingCommittee is undefined");
      }
      setEditingCommittee(null);
    } else {
      if (validateForm(newCommittee)) {
        dispatch(createNewCommittee(newCommittee));
        setNewCommittee({
          event_id: "",
          committee_name: "",
          committee_type: "",
          remark: "",
        });
        setShowModal(false);
      }
    }
  };

  const handleUndo = () => {
    setEditingCommittee(null);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Check for specific error
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
      console.log("Loading committees...");
    }
    if (error) {
      console.error("Error fetching committees:", error);
    }
    if (committees.length > 0) {
      console.log("Fetched committees:", committees);
    }
    if (loadingEvents) {
      console.log("Loading events...");
    }
    if (errorEvents) {
      console.log("Error fetching events:", errorEvents);
    }
    if (events.length > 0) {
      console.log("Fetched events:", events);
    }
  }, [loading, error, committees, loadingEvents, errorEvents, events]);

  if (loading) return <p>Loading...</p>;
  // if (error) return <p className="error-message">{error}</p>;
  if (loadingEvents) return <p>Loading Events...</p>;
  if (errorEvents) return <p className="error-message">{errorEvents}</p>;

  return (
    <div className="committee-list overflow-auto">
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
        Create New Committee
      </button>
      <div className="table-wrapper max-h-80 overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="whitespace-nowrap sticky top-0 z-30 tableHeadEditDelete  ">
            <tr>
              {/* <th className="px-4 py-2 whitespace-nowrap sticky top-0 left-0 z-20 tableHeadEditDelete">
                Committee ID
              </th> */}
              <th className="px-4 py-2 whitespace-nowrap">Committee Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Event Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Committee Type</th>
              <th className="px-4 py-2 whitespace-nowrap">Remark</th>
              <th className="px-4 py-2 whitespace-nowrap sticky top-0 right-0 z-20 tableHeadEditDelete">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {committees.map((committee) => (
              <tr key={committee.committee_id}>
                {/* <td className="px-4 py-2 whitespace-nowrap sticky left-0 tableHeadEditDelete">
                  {committee.committee_id}
                </td> */}
                <td className="px-4 py-2 whitespace-nowrap">
                  {editingCommittee &&
                  editingCommittee.committee_id === committee.committee_id ? (
                    <EditableSelectInput
                      name="committee_name"
                      options={committees.map((committee) => ({
                        value: committee.committee_name, // Actual value (committee_name)
                        label: committee.committee_name, // Display value (committee.committee_name)
                      }))}
                      value={editingCommittee.committee_name}
                      onChange={handleInputChange}
                      editable={true} // Allows both typing and selection from dropdown
                      // error={errors.committee_name}
                      placeholder="Select or Enter Committee Name"
                      id="committee_name"
                    />
                  ) : (
                    committee.committee_name
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingCommittee &&
                  editingCommittee.committee_id === committee.committee_id ? (
                    <EditableSelectInput
                      name="event_id"
                      options={events.map((event) => ({
                        value: event.event_id, // Actual value (event_id)
                        label: event.event_name, // Display value (event.event_name)
                      }))}
                      value={editingCommittee.event_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errors.event_name}
                      placeholder="Select Event Name"
                      id="event_id"
                    />
                  ) : (
                    // event.event_id
                    // Display event name based on event_id when not in edit mode
                    events.find(
                      (event) => event.event_id === committee.event_id
                    )?.event_name || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingCommittee &&
                  editingCommittee.committee_id === committee.committee_id ? (
                    <EditableSelectInput
                      name="committee_type"
                      options={committees.map((committee) => ({
                        value: committee.committee_type, // Actual value (committee_type)
                        label: committee.committee_type, // Display value (committee.committee_type)
                      }))}
                      value={editingCommittee.committee_type}
                      onChange={handleInputChange}
                      editable={true} // Allows both typing and selection from dropdown
                      // error={errors.committee_type}
                      placeholder="Select Committee Type"
                      id="committee_type"
                    />
                  ) : (
                    committee.committee_type
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingCommittee &&
                  editingCommittee.committee_id === committee.committee_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="remark"
                        value={editingCommittee.remark || ""}
                        onChange={handleInputChange}
                        placeholder="Remark"
                      />
                    </div>
                  ) : (
                    committee.remark
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap sticky right-0 tableHeadEditDelete">
                  {editingCommittee &&
                  editingCommittee.committee_id === committee.committee_id ? (
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
                        onClick={() => handleEdit(committee)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 my-1 rounded"
                        onClick={() => handleDelete(committee.committee_id)}
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
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center mt-12 z-30">
          <div className="registerCard px-6 py-1 rounded-lg shadow-lg w-full max-w-6xl">
            <h2 className="text-2xl font-semibold mb-4">
              Register New Committee
            </h2>
            <form className="grid grid-cols-4 gap-4">
              <EditableSelectInput
                label="Committee Name"
                name="committee_name"
                options={committees.map((committee) => ({
                  value: committee.committee_name, // Actual value (committee_name)
                  label: committee.committee_name, // Display value (committee.committee_name)
                }))}
                value={newCommittee.committee_name}
                onChange={handleInputChange}
                editable={true} // Allows both typing and selection from dropdown
                error={errors.committee_name}
                showRequired={true}
                placeholder="Select or Enter Committee Name"
                id="committee_name"
              />

              <EditableSelectInput
                label="Event Name"
                name="event_id"
                options={events.map((event) => ({
                  value: event.event_id, // Actual value (event_id)
                  label: event.event_name, // Display value (event.event_name)
                }))}
                value={newCommittee.event_id}
                onChange={handleInputChange}
                editable={false} // Allows selection from dropdown
                error={errors.event_name}
                showRequired={true}
                placeholder="Select Event Name"
                id="event_id"
              />
               <EditableSelectInput
                label="Committee Type"
                name="committee_type"
                options={committees.map((committee) => ({
                  value: committee.committee_type, // Actual value (committee_type)
                  label: committee.committee_type, // Display value (committee.committee_type)
                }))}
                value={newCommittee.committee_type}
                onChange={handleInputChange}
                editable={true} // Allows both typing and selection from dropdown
                error={errors.committee_type}
                showRequired={true}
                placeholder="Select or Enter Committee Type"
                id="committee_type"
              />

              

              <div className="input-group row-span-3">
                <label htmlFor="remark">Remark</label>
                <textarea
                  name="remark"
                  value={newCommittee.remark || ""}
                  onChange={handleInputChange}
                  placeholder="Remark"
                  className="w-full p-2 mb-4 border rounded"
                />
              </div>

              <div className="col-span-4 text-center">
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 mt-4 rounded"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="bg-gray-500 text-white px-4 py-2 mt-4 rounded ml-2"
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

export default CommitteeList;

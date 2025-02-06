// prutl-frontend-npm6node14/src/components/eventScheduleManagement/EventScheduleList.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllEventSchedules,
  createNewEventSchedule,
  updateEventSchedule,
  deleteEventSchedule,
} from "../../redux/slices/eventScheduleSlice.js";
import { getAllCompetitions } from "../../redux/slices/competitionSlice.js";
import ErrorModal from "../common/ErrorModal.jsx";
import EditableSelectInput from "../common/EditableSelectInput .jsx";

const EventScheduleList = () => {
  const dispatch = useDispatch();
  const { eventSchedules, loading, error } = useSelector(
    (state) => state.eventSchedules
  );
  const { competitions, loadingCompetitions, errorCompetitions } = useSelector(
    (state) => state.competitions
  );
  const [editingEventSchedule, setEditingEventSchedule] = useState(null);
  const [newEventSchedule, setNewEventSchedule] = useState({
    competition_id: "",
    start_time: "",
    end_time: "",
    remark: "",
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    dispatch(getAllEventSchedules());
    dispatch(getAllCompetitions());
  }, [dispatch]);

  const handleDelete = (scheduleId) => {
    dispatch(deleteEventSchedule(scheduleId));
  };

  const handleEdit = (eventSchedule) => {
    setEditingEventSchedule({ ...eventSchedule });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingEventSchedule) {
      setEditingEventSchedule({ ...editingEventSchedule, [name]: value });
    } else {
      setNewEventSchedule({ ...newEventSchedule, [name]: value });
    }
  };

  const validateForm = (formData) => {
    let newErrors = {};
    if (!formData.competition_id)
      newErrors.competition_id = "Competition Name is required";
    if (!formData.start_time) newErrors.start_time = "Start time is required";
    if (!formData.end_time) newErrors.end_time = "End time is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (editingEventSchedule) {
      if (editingEventSchedule.schedule_id && editingEventSchedule) {
        dispatch(
          updateEventSchedule({
            scheduleId: editingEventSchedule.schedule_id,
            data: editingEventSchedule,
          })
        );
      } else {
        console.error("Error: scheduleId or editingEventSchedule is undefined");
      }
      setEditingEventSchedule(null);
    } else {
      if (validateForm(newEventSchedule)) {
        dispatch(createNewEventSchedule(newEventSchedule));
        setNewEventSchedule({
          competition_id: "",
          start_time: "",
          end_time: "",
          remark: "",
        });
        setShowModal(false);
      }
    }
  };

  const handleUndo = () => {
    setEditingEventSchedule(null);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setNewEventSchedule({
      competition_id: "",
      start_time: "",
      end_time: "",
      remark: "",
    });
  };

  const handleCloseModal = () => {
    setShowError(false);
  };

  useEffect(() => {
    if (loading) {
      console.log("Loading event schedules...");
    }
    if (error) {
      console.error("Error fetching event schedules:", error);
    }
    if (eventSchedules.length > 0) {
      console.log("Fetched event schedules:", eventSchedules);
    }
    if (loadingCompetitions) {
      console.log("Loading competitions...");
    }
    if (errorCompetitions) {
      console.error("Error fetching competitions:", errorCompetitions);
    }
    if (competitions.length > 0) {
      console.log("Fetched competitions:", competitions);
    }
  }, [
    loading,
    error,
    eventSchedules,
    competitions,
    loadingCompetitions,
    errorCompetitions,
  ]);

  if (loading) return <p>Loading...</p>;
  // if (error) return <p className="error-message">{error}</p>;
  if (loadingCompetitions) return <p>Loading...</p>;
  if (errorCompetitions)
    return <p className="error-message">{errorCompetitions}</p>;

  return (
    <div className="event-schedule-list overflow-auto">
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
        Create New Event Schedule
      </button>
      <div className="table-wrapper max-h-80 overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="whitespace-nowrap sticky top-0 z-30 tableHeadEditDelete  ">
            <tr>
              {/* <th className="px-4 py-2 whitespace-nowrap sticky top-0 left-0 z-20 tableHeadEditDelete">
                Schedule ID
              </th> */}
              <th className="px-4 py-2 whitespace-nowrap">Competition Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Start Time</th>
              <th className="px-4 py-2 whitespace-nowrap">End Time</th>
              <th className="px-4 py-2 whitespace-nowrap">Remark</th>
              <th className="px-4 py-2 whitespace-nowrap sticky top-0 right-0 z-20 tableHeadEditDelete">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {eventSchedules.map((eventSchedule) => (
              <tr key={eventSchedule.schedule_id}>
                {/* <td className="px-4 py-2 whitespace-nowrap sticky left-0 tableHeadEditDelete">
                  {eventSchedule.schedule_id}
                </td> */}
                <td className="px-4 py-2 whitespace-nowrap">
                  {editingEventSchedule &&
                  editingEventSchedule.schedule_id ===
                    eventSchedule.schedule_id ? (
                    <EditableSelectInput
                      name="competition_id"
                      options={competitions.map((competition) => ({
                        value: competition.competition_id, // Actual value (competition_id)
                        label: competition.competition_name, // Display value (competition.competition_name)
                      }))}
                      value={editingEventSchedule.competition_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errors.competition_id}
                      placeholder="Select Competition Name"
                      id="competition_id"
                    />
                  ) : (
                    // eventSchedule.competition_id
                    // Display competition name based on competition_id when not in edit mode
                    competitions.find(
                      (competition) =>
                        competition.competition_id ===
                        eventSchedule.competition_id
                    )?.competition_name || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingEventSchedule &&
                  editingEventSchedule.schedule_id ===
                    eventSchedule.schedule_id ? (
                    <div className="input-group">
                      <input
                        type="datetime-local"
                        name="start_time"
                        value={editingEventSchedule.start_time || ""}
                        onChange={handleInputChange}
                        placeholder="Start Time"
                      />
                    </div>
                  ) : (
                    new Date(eventSchedule.start_time).toLocaleString()
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingEventSchedule &&
                  editingEventSchedule.schedule_id ===
                    eventSchedule.schedule_id ? (
                    <div className="input-group">
                      <input
                        type="datetime-local"
                        name="end_time"
                        value={editingEventSchedule.end_time || ""}
                        onChange={handleInputChange}
                        placeholder="End Time"
                      />
                    </div>
                  ) : (
                    new Date(eventSchedule.end_time).toLocaleString()
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {editingEventSchedule &&
                  editingEventSchedule.schedule_id ===
                    eventSchedule.schedule_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="remark"
                        value={editingEventSchedule.remark || ""}
                        onChange={handleInputChange}
                        placeholder="Remark"
                      />
                    </div>
                  ) : (
                    eventSchedule.remark
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap sticky right-0 tableHeadEditDelete">
                  {editingEventSchedule &&
                  editingEventSchedule.schedule_id ===
                    eventSchedule.schedule_id ? (
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
                        onClick={() => handleEdit(eventSchedule)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 my-1 rounded"
                        onClick={() => handleDelete(eventSchedule.schedule_id)}
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
        <div className="fixed inset-0 bg-gray-600 bg-opacity-0 flex items-center justify-center mt-12 z-30">
          <div className="registerCard px-6 py-1 rounded-lg shadow-lg w-full max-w-6xl">
            <h2 className="text-2xl font-semibold mb-4">
              Register New Event Schedule
            </h2>
            <form className="grid grid-cols-4 gap-4">
              <EditableSelectInput
                label="Competition Name"
                name="competition_id"
                options={competitions.map((competition) => ({
                  value: competition.competition_id, // Actual value (competition_id)
                  label: competition.competition_name, // Display value (competition.competition_name)
                }))}
                value={newEventSchedule.competition_id}
                onChange={handleInputChange}
                editable={false} // Allows selection from dropdown
                error={errors.competition_id}
                showRequired={true}
                placeholder="Select Competition Name"
                id="competition_id"
              />

              <div className="input-group row-span-3">
                <label htmlFor="start_time">
                  Start Time <span className="error-message ">*</span>
                </label>
                <input
                  type="datetime-local"
                  name="start_time"
                  value={newEventSchedule.start_time || ""}
                  onChange={handleInputChange}
                  placeholder="Start Time"
                  className="w-full p-2 mb-4 border rounded"
                />
                {errors.start_time && (
                  <p className="error-message text-sm">{errors.start_time}</p>
                )}
              </div>
              <div className="input-group row-span-3">
                <label htmlFor="end_time">
                  End Time <span className="error-message ">*</span>
                </label>
                <input
                  type="datetime-local"
                  name="end_time"
                  value={newEventSchedule.end_time || ""}
                  onChange={handleInputChange}
                  placeholder="End Time"
                  className="w-full p-2 mb-4 border rounded"
                />
                {errors.end_time && (
                  <p className="error-message text-sm">{errors.end_time}</p>
                )}
              </div>
              <div className="input-group row-span-3">
                <label htmlFor="remark">Remark</label>
                <textarea
                  name="remark"
                  value={newEventSchedule.remark || ""}
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

export default EventScheduleList;

// prutl-frontend-npm6node14/src/components/eventManagement/EventList.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllEvents,
  createNewEvent,
  updateEvent,
  deleteEvent,
} from "../../redux/slices/eventSlice.js";
import { getAllOrganizations } from "../../redux/slices/organizationSlice.js";
import ErrorModal from "../common/ErrorModal.jsx";
import EditableSelectInput from "../common/EditableSelectInput .jsx";

const EventList = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.events);
  const { organizations, loadingOrganizations, errorOrganizations } =
    useSelector((state) => state.organizations);
  const [editingEvent, setEditingEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    // event_code: "",
    event_name: "",
    org_id: "",
    start_date: "",
    end_date: "",
    location: "",
    description: "",
    remark: "",
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    dispatch(getAllEvents());
    dispatch(getAllOrganizations());
  }, [dispatch]);

  const handleDelete = (eventId) => {
    dispatch(deleteEvent(eventId));
  };

  const handleEdit = (event) => {
    setEditingEvent({ ...event });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingEvent) {
      setEditingEvent({ ...editingEvent, [name]: value });
    } else {
      setNewEvent({ ...newEvent, [name]: value });
    }
  };

  const validateForm = (formData) => {
    let newErrors = {};
    // if (!formData.event_code) newErrors.event_code = "Event code is required";
    if (!formData.event_name) newErrors.event_name = "Event name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (editingEvent) {
      if (editingEvent.event_id && editingEvent) {
        dispatch(
          updateEvent({ eventId: editingEvent.event_id, data: editingEvent })
        );
      } else {
        console.error("Error: eventId or editingEvent is undefined");
      }
      setEditingEvent(null);
    } else {
      if (validateForm(newEvent)) {
        dispatch(createNewEvent(newEvent));
        setNewEvent({
          // event_code: "",
          event_name: "",
          org_id: "",
          start_date: "",
          end_date: "",
          location: "",
          description: "",
          remark: "",
        });
        setShowModal(false);
      }
    }
  };

  const handleUndo = () => {
    setEditingEvent(null);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setNewEvent({
      // event_code: "",
      event_name: "",
      org_id: "",
      start_date: "",
      end_date: "",
      location: "",
      description: "",
      remark: "",
    });
  };

  const handleCloseModal = () => {
    setShowError(false);
  };

  useEffect(() => {
    if (loading) {
      console.log("Loading events...");
    }
    if (error) {
      console.error("Error fetching events:", error);
    }
    if (events.length > 0) {
      console.log("Fetched events:", events);
    }
    if (loadingOrganizations) {
      console.log("Loading organizations...");
    }
    if (errorOrganizations) {
      console.error("Error fetching organizations:", errorOrganizations);
    }
    if (organizations.length > 0) {
      console.log("Fetched organizations:", organizations);
    }
  }, [
    loading,
    error,
    events,
    organizations,
    loadingOrganizations,
    errorOrganizations,
  ]);

  if (loading) return <p>Loading...</p>;
  // if (error) return <p className="error-message">{error}</p>;
  if (loadingOrganizations) return <p>Loading...</p>;
  if (errorOrganizations)
    return <p className="error-message">{errorOrganizations}</p>;

  return (
    <div className="event-list overflow-auto">
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
        Create New Event
      </button>
      <div className="table-wrapper max-h-80 overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="whitespace-nowrap sticky top-0 z-30 tableHeadEditDelete  ">
            <tr>
              {/* <th className="px-4 py-2 whitespace-nowrap sticky top-0 left-0 z-20 tableHeadEditDelete">
                Event ID
              </th> */}
              {/* <th className="px-4 py-2 whitespace-nowrap">Event Code</th> */}
              <th className="px-4 py-2 whitespace-nowrap">Event Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Organization Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Start Date</th>
              <th className="px-4 py-2 whitespace-nowrap">End Date</th>
              <th className="px-4 py-2 whitespace-nowrap">Location</th>
              <th className="px-4 py-2 whitespace-nowrap">Description</th>
              <th className="px-4 py-2 whitespace-nowrap">Remark</th>
              <th className="px-4 py-2 whitespace-nowrap sticky top-0 right-0 z-20 tableHeadEditDelete">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.event_id}>
                {/* <td className="px-4 py-2 whitespace-nowrap sticky left-0 tableHeadEditDelete">
                  {event.event_id}
                </td> */}
                {/* <td className="px-4 py-2 whitespace-nowrap">
                  {editingEvent && editingEvent.event_id === event.event_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="event_code"
                        value={editingEvent.event_code || ""}
                        onChange={handleInputChange}
                        placeholder="Event Code"
                      />
                    </div>
                  ) : (
                    event.event_code
                  )}
                </td> */}

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingEvent && editingEvent.event_id === event.event_id ? (
                    <EditableSelectInput
                      name="event_name"
                      options={events.map((event) => ({
                        value: event.event_name, // Actual value (event_name)
                        label: event.event_name, // Display value (event.event_name)
                      }))}
                      value={editingEvent.event_name}
                      onChange={handleInputChange}
                      editable={true} // Allows typing and selection from dropdown
                      // error={errors.event_name}
                      placeholder="Select or Enter Event Name"
                      id="event_name"
                    />
                  ) : (
                    event.event_name
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingEvent && editingEvent.event_id === event.event_id ? (
                    <EditableSelectInput
                      name="org_id"
                      options={organizations.map((organization) => ({
                        value: organization.org_id, // Actual value (org_id)
                        label: organization.org_name, // Display value (event.org_name)
                      }))}
                      value={editingEvent.org_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errors.org_id}
                      placeholder="Select Organization ID"
                      id="org_id"
                    />
                  ) : (
                    // event.org_id
                    // Display organization name based on org_id when not in edit mode
                    organizations.find(
                      (organization) => organization.org_id === event.org_id
                    )?.org_name || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingEvent && editingEvent.event_id === event.event_id ? (
                    <div className="input-group">
                      <input
                        type="date"
                        name="start_date"
                        value={editingEvent.start_date.split("T")[0] || ""}
                        onChange={handleInputChange}
                        placeholder="Start Date"
                      />
                    </div>
                  ) : (
                    new Date(event.start_date).toLocaleDateString()
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingEvent && editingEvent.event_id === event.event_id ? (
                    <div className="input-group">
                      <input
                        type="date"
                        name="end_date"
                        value={editingEvent.end_date.split("T")[0] || ""}
                        onChange={handleInputChange}
                        placeholder="End Date"
                      />
                    </div>
                  ) : (
                    new Date(event.end_date).toLocaleDateString()
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingEvent && editingEvent.event_id === event.event_id ? (
                    <EditableSelectInput
                      name="location"
                      options={events.map((event) => ({
                        value: event.location, // Actual value (location)
                        label: event.location, // Display value (event.location)
                      }))}
                      value={editingEvent.location}
                      onChange={handleInputChange}
                      editable={true} // Allows typing and selection from dropdown
                      // error={errors.location}
                      placeholder="Select or Enter Location"
                      id="location"
                    />
                  ) : (
                    event.location
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingEvent && editingEvent.event_id === event.event_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="description"
                        value={editingEvent.description || ""}
                        onChange={handleInputChange}
                        placeholder="Description"
                      />
                    </div>
                  ) : (
                    event.description
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingEvent && editingEvent.event_id === event.event_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="remark"
                        value={editingEvent.remark || ""}
                        onChange={handleInputChange}
                        placeholder="Remark"
                      />
                    </div>
                  ) : (
                    event.remark
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap sticky right-0 tableHeadEditDelete">
                  {editingEvent && editingEvent.event_id === event.event_id ? (
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
                        onClick={() => handleEdit(event)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 my-1 rounded"
                        onClick={() => handleDelete(event.event_id)}
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
            <h2 className="text-2xl font-semibold mb-4">Register New Event</h2>
            <form className="grid grid-cols-4 gap-4">
              {/* <div className="input-group row-span-3">
                <label htmlFor="event_code">
                  Event Code <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="event_code"
                  value={
                    (editingEvent
                      ? editingEvent.event_code
                      : newEvent.event_code) || ""
                  }
                  onChange={handleInputChange}
                  placeholder="Event Code"
                  className="w-full p-2 mb-4 border rounded"
                />
                {errors.event_code && (
                  <p className="text-red-500">{errors.event_code}</p>
                )}
              </div> */}

              <EditableSelectInput
                label="Event Name"
                name="event_name"
                options={events.map((event) => ({
                  value: event.event_name, // Actual value (event_name)
                  label: event.event_name, // Display value (event.event_name)
                }))}
                value={newEvent.event_name}
                onChange={handleInputChange}
                editable={true} // Allows typing and selection from dropdown
                error={errors.event_name}
                showRequired={true}
                placeholder="Select or Enter Event Name"
                id="event_name"
              />

              <EditableSelectInput
              label="Organization Name"
                name="org_id"
                options={organizations.map((organization) => ({
                  value: organization.org_id, // Actual value (org_id)
                  label: organization.org_name, // Display value (event.org_name)
                }))}
                value={newEvent.org_id}
                onChange={handleInputChange}
                editable={false} // Allows selection from dropdown
                error={errors.org_id}
                showRequired={false}
                placeholder="Select Organization Name"
                id="org_id"
              />

              <div className="input-group row-span-3">
                <label htmlFor="start_date">
                  Start Date <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="date"
                  name="start_date"
                  value={newEvent.start_date || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-4 border rounded"
                />
                {errors.start_date && (
                  <p className="text-red-500">{errors.name}</p>
                )}
              </div>
              <div className="input-group row-span-3">
                <label htmlFor="end_date">
                  End Date <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="date"
                  name="end_date"
                  value={newEvent.end_date || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-4 border rounded"
                />
                {errors.end_date && (
                  <p className="text-red-500">{errors.name}</p>
                )}
              </div>

              <EditableSelectInput
              label="Location"
                      name="location"
                      options={events.map((event) => ({
                        value: event.location, // Actual value (location)
                        label: event.location, // Display value (event.location)
                      }))}
                      value={newEvent.location}
                      onChange={handleInputChange}
                      editable={true} // Allows typing and selection from dropdown
                      error={errors.location}
                      showRequired={false}
                      placeholder="Select or Enter Location"
                      id="location"
                    />

              <div className="input-group row-span-3">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  value={
                    (editingEvent
                      ? editingEvent.description
                      : newEvent.description) || ""
                  }
                  onChange={handleInputChange}
                  placeholder="Description"
                  className="w-full p-2 mb-4 border rounded"
                />
              </div>

              <div className="input-group row-span-3">
                <label htmlFor="remark">Remark</label>
                <textarea
                  name="remark"
                  value={
                    (editingEvent ? editingEvent.remark : newEvent.remark) || ""
                  }
                  onChange={handleInputChange}
                  placeholder="Remark"
                  className="w-full p-2 mb-4 border rounded"
                />
              </div>
              <div className="col-span-4 text-center">
                <button
                  type="button"
                  className="bg-green-500 text-white px-5 py-2 rounded mr-2"
                  onClick={handleSave}
                >
                  {editingEvent ? "Update Event" : "Save"}
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

export default EventList;

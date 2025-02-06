// prutl-frontend-npm6node14/src/components/eventBookingManagement/EventBookingList.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllEventBookings,
  createNewEventBooking,
  updateEventBooking,
  deleteEventBooking,
} from "../../redux/slices/eventBookingSlice.js";
import { getAllEvents } from "../../redux/slices/eventSlice.js";
import { getAllVenues } from "../../redux/slices/venueSlice.js";
import ErrorModal from "../common/ErrorModal.jsx";
import { getAllUsers } from "../../redux/slices/userSlice.js";
import { getAllHalls } from "../../redux/slices/hallSlice.js";
import EditableSelectInput from "../common/EditableSelectInput .jsx";

const EventBookingList = () => {
  const dispatch = useDispatch();
  const { eventBookings, loading, error } = useSelector(
    (state) => state.eventBookings
  );
  const { events, loadingEvents, errorEvents } = useSelector(
    (state) => state.events
  );
  const { halls, loadingHalls, errorHalls } = useSelector(
    (state) => state.halls
  );
  const { venues, loadingVenues, errorVenues } = useSelector(
    (state) => state.venues
  );
  const { users, loadingUsers, errorUsers } = useSelector(
    (state) => state.users
  );
  const [editingEventBooking, setEditingEventBooking] = useState(null);
  const [newEventBooking, setNewEventBooking] = useState({
    // booking_code:null,
    event_id:null,
    hall_id:null,
    venue_id:null,
    user_id:null,
    booking_start_date:null,
    booking_end_date:null,
    num_of_seats:null,
    total_cost:null,
    remark:null,
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    dispatch(getAllEventBookings());
    dispatch(getAllEvents());
    dispatch(getAllHalls());
    dispatch(getAllVenues());
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDelete = (bookingId) => {
    dispatch(deleteEventBooking(bookingId));
  };

  const handleEdit = (eventBooking) => {
    setEditingEventBooking({ ...eventBooking });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if(name === "booking_start_date"){
      if(editingEventBooking){
        setEditingEventBooking({
          ...editingEventBooking,
          booking_start_date:value,
          booking_end_date:value
        })
       
      }else{
        setNewEventBooking({ 
          ...newEventBooking,
          booking_start_date:value,
          booking_end_date:value
        })
      }
     
    }
    else{ 
      if(editingEventBooking) {
      setEditingEventBooking({ ...editingEventBooking, [name]: value });
    } else {
      setNewEventBooking({ ...newEventBooking, [name]: value });
    }
  }
  };

  const validateForm = (formData) => {
    let newErrors = {};
    // if (!formData.booking_code)
    //   newErrors.booking_code = "Booking Code is required";
    if (!formData.event_id) newErrors.event_id = "Event Name is required";
    // if (!formData.hall_id) newErrors.hall_id = "Hall Name is required";
    // if (!formData.venue_id) newErrors.venue_id = "Venue Name is required";
    // if (!formData.user_id) newErrors.user_id = "User Name is required";
    if (!formData.booking_start_date)
      newErrors.booking_start_date = "Booking Start Date is required";
    if (!formData.booking_end_date)
      newErrors.booking_end_date = "Booking End Date is required";
    // if (!formData.num_of_seats)
    //   newErrors.num_of_seats = "Number of Seats is required";
    // if (!formData.total_cost) newErrors.total_cost = "Total Cost is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (editingEventBooking) {
      if (editingEventBooking.booking_id && editingEventBooking) {
        dispatch(
          updateEventBooking({
            bookingId: editingEventBooking.booking_id,
            data: editingEventBooking,
          })
        );
      } else {
        console.error("Error: bookingId or editingEventBooking is undefined");
      }
      setEditingEventBooking(null);
    } else {
      if (validateForm(newEventBooking)) {
        dispatch(createNewEventBooking(newEventBooking));
        setNewEventBooking({
          // booking_code:null,
          event_id:null,
          hall_id:null,
          venue_id:null,
          user_id:null,
          booking_start_date:null,
          booking_end_date:null,
          num_of_seats:null,
          total_cost:null,
          remark:null,
        });
        setShowModal(false);
      }
    }
  };

  const handleUndo = () => {
    setEditingEventBooking(null);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setNewEventBooking({
      // booking_code:null,
      event_id:null,
      hall_id:null,
      venue_id:null,
      user_id:null,
      booking_start_date:null,
      booking_end_date:null,
      num_of_seats:null,
      total_cost:null,
      remark:null,
    });
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
      console.log("Loading event bookings...");
    }
    if (error) {
      console.error("Error fetching event bookings:", error);
    }
    if (eventBookings.length > 0) {
      console.log("Fetched event bookings:", eventBookings);
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
    if (loadingHalls) {
      console.log("Loading halls...");
    }
    if (errorHalls) {
      console.log("Error fetching errorHalls:", errorHalls);
    }
    if (halls.length > 0) {
      console.log("Fetched halls:", halls);
    }
    if (loadingVenues) {
      console.log("Loading venues...");
    }
    if (errorVenues) {
      console.log("Error fetching errorVenues:", errorVenues);
    }
    if (venues.length > 0) {
      console.log("Fetched venues:", venues);
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
  }, [
    loading,
    error,
    eventBookings,
    loadingEvents,
    errorEvents,
    events,
    venues,
    loadingVenues,
    errorVenues,
    users,
    loadingUsers,
    errorUsers,
    halls,
    loadingHalls,
    errorHalls,
  ]);

  if (loading) return <p>Loading...</p>;
  // if (error) return <p className="error-message">{error}</p>;
  if (loadingEvents) return <p>Loading Events...</p>;
  if (errorEvents) return <p className="error-message">{errorEvents}</p>;
  if (loadingHalls) return <p>Loading Halls...</p>;
  if (errorHalls) return <p className="error-message">{errorHalls}</p>;
  if (loadingVenues) return <p>Loading venues...</p>;
  if (errorVenues) return <p className="error-message">{errorVenues}</p>;
  if (loadingUsers) return <p>Loading users...</p>;
  if (errorUsers) return <p className="error-message">{errorUsers}</p>;

  return (
    <div className="event-booking-list overflow-auto">
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
        Create New Event Booking
      </button>
      <div className="table-wrapper max-h-80 overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="whitespace-nowrap sticky top-0 z-30 tableHeadEditDelete">
            <tr>
              {/* <th className="px-4 py-2 whitespace-nowrap sticky top-0 left-0 z-20 tableHeadEditDelete">
                Booking ID
              </th> */}
              {/* <th className="px-4 py-2 whitespace-nowrap">Booking Code</th> */}
              <th className="px-28 py-2 mx-28 whitespace-nowrap">Event Name</th>
              <th className="px-28 py-2 mx-28 whitespace-nowrap">Hall Name</th>
              <th className="px-28 py-2 mx-28 whitespace-nowrap">Venue Name</th>
              <th className="px-28 py-2 mx-28 whitespace-nowrap">User Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Booking Start Date</th>
              <th className="px-4 py-2 whitespace-nowrap">Booking End Date</th>
              <th className="px-4 py-2 whitespace-nowrap">Number of Seats</th>
              <th className="px-4 py-2 whitespace-nowrap">Total Cost</th>
              <th className="px-4 py-2 whitespace-nowrap">Remark</th>
              <th className="px-4 py-2 whitespace-nowrap sticky top-0 right-0 z-20 tableHeadEditDelete">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {eventBookings.map((eventBooking) => (
              <tr key={eventBooking.booking_id}>
                {/* <td className="px-4 py-2 whitespace-nowrap sticky left-0 tableHeadEditDelete">
                  {eventBooking.booking_id}
                </td> */}
                {/* <td className="px-4 py-2 whitespace-nowrap">
                  {editingEventBooking &&
                  editingEventBooking.booking_id === eventBooking.booking_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="booking_code"
                        value={editingEventBooking.booking_code || ""}
                        onChange={handleInputChange}
                        placeholder="Booking Code"
                      />
                    </div>
                  ) : (
                    eventBooking.booking_code
                  )}
                </td> */}
                <td className="px-4 py-2 whitespace-nowrap">
                  {editingEventBooking &&
                  editingEventBooking.booking_id === eventBooking.booking_id ? (
                    <EditableSelectInput
                      name="event_id"
                      options={events.map((event) => ({
                        value: event.event_id, // Actual value (event_id)
                        label: event.event_name, // Display value (event.event_name)
                      }))}
                      value={editingEventBooking.event_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errors.event_id}
                      placeholder="Select Event Name"
                      id="event_id"
                    />
                  ) : (
                    // eventBooking.event_id
                    // Display event name based on event_id when not in edit mode
                    events.find(
                      (event) => event.event_id === eventBooking.event_id
                    )?.event_name || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingEventBooking &&
                  editingEventBooking.booking_id === eventBooking.booking_id ? (
                    <EditableSelectInput
                      name="hall_id"
                      options={halls.map((hall) => ({
                        value: hall.hall_id, // Actual value (hall_id)
                        label: hall.hall_name, // Display value (hall.hall_name)
                      }))}
                      value={editingEventBooking.hall_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errors.hall_id}
                      placeholder="Select Hall Name"
                      id="hall_id"
                    />
                  ) : (
                    // eventBooking.hall_id
                    // Display hall name based on hall_id when not in edit mode
                    halls.find((hall) => hall.hall_id === eventBooking.hall_id)
                      ?.hall_name || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingEventBooking &&
                  editingEventBooking.booking_id === eventBooking.booking_id ? (
                    <EditableSelectInput
                      name="venue_id"
                      options={venues.map((venue) => ({
                        value: venue.venue_id, // Actual value (venue_id)
                        label: venue.venue_name, // Display value (venue.venue_name)
                      }))}
                      value={editingEventBooking.venue_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errors.venue_id}
                      placeholder="Select Venue Name"
                      id="venue_id"
                    />
                  ) : (
                    // eventBooking.venue_id
                    // Display venue name based on venue_id when not in edit mode
                    venues.find(
                      (venue) => venue.venue_id === eventBooking.venue_id
                    )?.venue_name || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingEventBooking &&
                  editingEventBooking.booking_id === eventBooking.booking_id ? (
                    <EditableSelectInput
                      name="user_id"
                      options={users.map((user) => ({
                        value: user.user_id, // Actual value (user_id)
                        label: user.name, // Display value (user.name)
                      }))}
                      value={editingEventBooking.user_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errors.user_id}
                      placeholder="Select User Name"
                      id="user_id"
                    />
                  ) : (
                    // eventBooking.user_id
                    // Display user name based on user_id when not in edit mode
                    users.find((user) => user.user_id === eventBooking.user_id)
                      ?.name || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingEventBooking &&
                  editingEventBooking.booking_id === eventBooking.booking_id ? (
                    <div className="input-group">
                      <input
                        type="date"
                        name="booking_start_date"
                        value={editingEventBooking.booking_start_date || ""}
                        onChange={handleInputChange}
                        placeholder="Booking Start Date"
                      />
                    </div>
                  ) : (
                    new Date(eventBooking.booking_start_date).toLocaleDateString()
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {editingEventBooking &&
                  editingEventBooking.booking_id === eventBooking.booking_id ? (
                    <div className="input-group">
                      <input
                        type="date"
                        name="booking_end_date"
                        value={editingEventBooking.booking_end_date || ""}
                        onChange={handleInputChange}
                        placeholder="Booking End Date"
                      />
                    </div>
                  ) : (
                    new Date(eventBooking.booking_end_date).toLocaleDateString()
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingEventBooking &&
                  editingEventBooking.booking_id === eventBooking.booking_id ? (
                    <EditableSelectInput
                      name="num_of_seats"
                      options={eventBookings.map((eventBooking) => ({
                        value: eventBooking.num_of_seats, // Actual value (num_of_seats)
                        label: eventBooking.num_of_seats, // Display value (score.num_of_seats)
                      }))}
                      value={editingEventBooking.num_of_seats}
                      onChange={handleInputChange}
                      editable={true} // Allows and typing selection from dropdown
                      // error={errors.num_of_seats}
                      isNumeric="true"
                      placeholder="Select or Enter No of Seats"
                      id="num_of_seats"
                    />
                  ) : (
                    eventBooking.num_of_seats
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingEventBooking &&
                  editingEventBooking.booking_id === eventBooking.booking_id ? (
                    <EditableSelectInput
                      name="total_cost"
                      options={eventBookings.map((eventBooking) => ({
                        value: eventBooking.total_cost, // Actual value (total_cost)
                        label: eventBooking.total_cost, // Display value (score.total_cost)
                      }))}
                      value={editingEventBooking.total_cost}
                      onChange={handleInputChange}
                      editable={true} // Allows typing and selection from dropdown
                      // error={errors.total_cost}
                      isNumeric="true"
                      placeholder="Select or Enter total_cost"
                      id="total_cost"
                    />
                  ) : (
                    eventBooking.total_cost
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingEventBooking &&
                  editingEventBooking.booking_id === eventBooking.booking_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="remark"
                        value={editingEventBooking.remark || ""}
                        onChange={handleInputChange}
                        placeholder="Remark"
                      />
                    </div>
                  ) : (
                    eventBooking.remark
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap sticky right-0 tableHeadEditDelete">
                  {editingEventBooking &&
                  editingEventBooking.booking_id === eventBooking.booking_id ? (
                    <div className="button-group">
                      <button
                        className="bg-green-500 text-white px-4 py-2 m-2 rounded"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 m-2 rounded"
                        onClick={handleUndo}
                      >
                        Undo
                      </button>
                    </div>
                  ) : (
                    <div className="button-group">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 m-2 rounded"
                        onClick={() => handleEdit(eventBooking)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 m-2 rounded"
                        onClick={() => handleDelete(eventBooking.booking_id)}
                      >
                        Delete
                      </button>
                    </div>
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
              Create New Event Booking
            </h2>
            <form className="grid grid-cols-4 gap-4">
              {/* <div className="input-group row-span-3">
                <label>Booking Code</label>
                <input
                  type="text"
                  id="booking_code"
                  name="booking_code"
                  value={newEventBooking.booking_code}
                  onChange={handleInputChange}
                  placeholder="Booking Code"
                />
                {errors.booking_code && (
                  <span className="text-red-500">{errors.booking_code}</span>
                )}
              </div> */}
              <EditableSelectInput
                label="Event Name"
                name="event_id"
                options={events.map((event) => ({
                  value: event.event_id, // Actual value (event_id)
                  label: event.event_name, // Display value (event.event_name)
                }))}
                value={newEventBooking.event_id}
                onChange={handleInputChange}
                editable={false} // Allows selection from dropdown
                error={errors.event_id}
                showRequired={true}
                placeholder="Select Event Name"
                id="event_id"
              />
              <EditableSelectInput
                label="Hall Name"
                name="hall_id"
                options={halls.map((hall) => ({
                  value: hall.hall_id, // Actual value (hall_id)
                  label: hall.hall_name, // Display value (hall.hall_name)
                }))}
                value={newEventBooking.hall_id}
                onChange={handleInputChange}
                editable={false} // Allows selection from dropdown
                error={errors.hall_name}
                // showRequired={true}
                placeholder="Select Hall Name"
                id="hall_id"
              />

              <EditableSelectInput
                label="Venue Name"
                name="venue_id"
                options={venues.map((venue) => ({
                  value: venue.venue_id, // Actual value (venue_id)
                  label: venue.venue_name, // Display value (venue.venue_name)
                }))}
                value={newEventBooking.venue_id}
                onChange={handleInputChange}
                editable={false} // Allows selection from dropdown
                error={errors.venue_id}
                // showRequired={true}
                placeholder="Select Venue Name"
                id="venue_id"
              />

              <EditableSelectInput
                label="User Name"
                name="user_id"
                options={users.map((user) => ({
                  value: user.user_id, // Actual value (user_id)
                  label: user.name, // Display value (user.name)
                }))}
                value={newEventBooking.user_id}
                onChange={handleInputChange}
                editable={false} // Allows selection from dropdown
                error={errors.user_id}
                // showRequired={true}
                placeholder="Select User Name"
                id="user_id"
              />

              <div className="input-group row-span-3">
                <label>
                  Booking Start Date
                  {/* <span className="error-message">*</span> */}
                </label>
                <input
                  type="date"
                  id="booking_start_date"
                  name="booking_start_date"
                  value={newEventBooking.booking_start_date}
                  onChange={handleInputChange}
                  placeholder="Booking Date"
                />
                {errors.booking_start_date && (
                  <span className="error-message text-sm">
                    {errors.booking_start_date}
                  </span>
                )}
              </div>
              <div className="input-group row-span-3">
                <label>
                  Booking End Date
                  {/* <span className="error-message">*</span> */}
                </label>
                <input
                  type="date"
                  id="booking_end_date"
                  name="booking_end_date"
                  value={newEventBooking.booking_end_date}
                  onChange={handleInputChange}
                  placeholder="Booking Date"
                />
                {errors.booking_end_date && (
                  <span className="error-message text-sm">
                    {errors.booking_end_date}
                  </span>
                )}
              </div>
              <EditableSelectInput
                label="Number of Seats"
                name="num_of_seats"
                options={eventBookings.map((eventBooking) => ({
                  value: eventBooking.num_of_seats, // Actual value (num_of_seats)
                  label: eventBooking.num_of_seats, // Display value (score.num_of_seats)
                }))}
                value={newEventBooking.num_of_seats}
                onChange={handleInputChange}
                editable={true} // Allows and typing selection from dropdown
                error={errors.num_of_seats}
                // showRequired={true}
                isNumeric="true"
                placeholder="Select or Enter No of Seats"
                id="num_of_seats"
              />

              <EditableSelectInput
                label="Total Cost"
                name="total_cost"
                options={eventBookings.map((eventBooking) => ({
                  value: eventBooking.total_cost, // Actual value (total_cost)
                  label: eventBooking.total_cost, // Display value (score.total_cost)
                }))}
                value={newEventBooking.total_cost}
                onChange={handleInputChange}
                editable={true} // Allows typing and selection from dropdown
                error={errors.total_cost}
                // showRequired={true}
                isNumeric="true"
                placeholder="Select or Enter total_cost"
                id="total_cost"
              />

              <div className="input-group row-span-3">
                <label>Remark</label>
                <textarea
                  name="remark"
                  value={newEventBooking.remark || ""}
                  onChange={handleInputChange}
                  placeholder="Remark"
                  className="w-full p-2 mb-4 border rounded"
                />
              </div>
            </form>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default EventBookingList;

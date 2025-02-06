import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBookingServices,
  createNewBookingService,
  updateBookingService,
  deleteBookingService,
} from "../../redux/slices/bookingServiceSlice.js";
import { getAllEventBookings } from "../../redux/slices/eventBookingSlice.js";
import ErrorModal from "../common/ErrorModal.jsx";
import EditableSelectInput from "../common/EditableSelectInput .jsx";
import { getAllEvents } from "../../redux/slices/eventSlice.js";
import { getAllGuestServices } from "../../redux/slices/guestServiceSlice.js";
import { getAllUsers } from "../../redux/slices/userSlice.js";
import { getAllHalls } from "../../redux/slices/hallSlice.js";
import { getAllVenues } from "../../redux/slices/venueSlice.js";

const BookingServiceList = () => {
  const dispatch = useDispatch();
  const { bookingServices, loading, error } = useSelector(
    (state) => state.bookingServices
  );
  const { eventBookings, loadingEventBookings, errorEventBookings } =
    useSelector((state) => state.eventBookings);
  const { guestServices, loadingGuestServices, errorGuestServices } =
    useSelector((state) => state.guestServices);
  const { events, loadingEvents, errorEvents } = useSelector(
    (state) => state.events
  );
  const { users, loadingUsers, errorUsers } = useSelector(
    (state) => state.users
  );
  const { halls, loadingHalls, errorHalls } = useSelector(
    (state) => state.halls
  );
  const { venues, loadingVenues, errorVenues } = useSelector(
    (state) => state.venues
  );
  const [editingBookingService, setEditingBookingService] = useState(null);
  const [newBookingService, setNewBookingService] = useState({
    booking_id: null,
    service_id: null,
    quantity: null,
    total_cost: null,
    remark: null,
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [hoveredEventBookingId, setHoveredEventBookingId] = useState(null);
  const [hoveredGuestServiceId, setHoveredGuestServiceId] = useState(null);

  const handleMouseEnter = (eventBooking) => {
    setHoveredEventBookingId(eventBooking.value); // Update the hovered eventBooking ID (booking_id)
  };
  const handleGuestServiceIdMouseEnter = (guestService) => {
    setHoveredGuestServiceId(guestService.value); // Update the hovered guestService ID (service_id)
  };

  const getEventName = (bookingId) => {
    const eventBooking = eventBookings.find((e) => e.booking_id === bookingId);
    if (eventBooking) {
      const event = events.find((e) => e.event_id === eventBooking.event_id);
      return event ? event.event_name : "";
    }
    return "";
  };

  const getUserName = (bookingId) => {
    const eventBooking = eventBookings.find((e) => e.booking_id === bookingId);
    if (eventBooking) {
      const user = users.find((e) => e.user_id === eventBooking.user_id);
      return user ? user.name : "";
    }
    return "";
  };

  const getHallName = (bookingId) => {
    const eventBooking = eventBookings.find((e) => e.booking_id === bookingId);
    if (eventBooking) {
      const hall = halls.find((e) => e.hall_id === eventBooking.hall_id);
      return hall ? hall.hall_name : "";
    }
    return "";
  };

  const getVenueName = (bookingId) => {
    const eventBooking = eventBookings.find((e) => e.booking_id === bookingId);
    if (eventBooking) {
      const venue = venues.find((e) => e.venue_id === eventBooking.venue_id);
      return venue ? venue.venue_name : "";
    }
    return "";
  };

  const getBookingStartDate = (bookingId) => {
    const eventBooking = eventBookings.find((e) => e.booking_id === bookingId);
    if (eventBooking) {
      return eventBooking ? eventBooking.booking_start_date : "";
    }
    return "";
  };
  const getBookingEndDate = (bookingId) => {
    const eventBooking = eventBookings.find((e) => e.booking_id === bookingId);
    if (eventBooking) {
      return eventBooking ? eventBooking.booking_end_date : "";
    }
    return "";
  };

  const getServiceCostPerUnit = (serviceId) => {
    const guestService = guestServices.find((e) => e.service_id === serviceId);
    if (guestService) {
      return guestService ? guestService.cost_per_unit : "";
    }
    return "";
  };

  // const getServiceTotalCost = (serviceId, bookingId) => {
  //   const guestService = guestServices.find((e) => e.service_id === serviceId);
  //   if (guestService) {
  //     const bookingService = bookingServices.find(
  //       (e) => e.booking_id === bookingId
  //     );
  //     if (bookingService) {
  //       return guestService
  //         ? guestService.cost_per_unit * bookingService.quantity
  //         : "";
  //     }
  //   }
  //   return "";
  // };

  useEffect(() => {
    dispatch(getAllBookingServices());
    dispatch(getAllEventBookings());
    dispatch(getAllGuestServices());
    dispatch(getAllEvents());
    dispatch(getAllUsers());
    dispatch(getAllHalls());
    dispatch(getAllVenues());
  }, [dispatch]);

  const handleDelete = (bookingServiceId) => {
    dispatch(deleteBookingService(bookingServiceId));
  };

  // const handleEdit = (bookingServiceId) => {
  //   setEditingBookingService({ ...bookingServiceId });
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Handle the service_id and quantity fields
    // Check if the input is either service_id or quantity
    if (name === "service_id" || name === "quantity") {
      // Update the service_id or quantity in the state
      const updatedBookingService = {
        ...editingBookingService || newBookingService ,
        [name]: value, // Dynamically update either service_id or quantity
      };

      // Calculate the total cost if both service_id and quantity are present
      const selectedServiceId = updatedBookingService.service_id;
      const selectedQuantity = updatedBookingService.quantity;

      if (selectedServiceId && selectedQuantity) {
        const selectedService = guestServices.find(
          (service) => service.service_id === parseInt(selectedServiceId)
        );

        if (selectedService) {
          const costPerUnit = selectedService.cost_per_unit;
          const totalCost = costPerUnit * parseInt(selectedQuantity);

          updatedBookingService.total_cost = totalCost; // Update total cost
        }
      }

      // Update the state for newBookingService
      setNewBookingService(updatedBookingService);
    } else {
      // Handle other field updates
      if (editingBookingService) {
        setEditingBookingService({ ...editingBookingService, [name]: value });
      } else {
        setNewBookingService({ ...newBookingService, [name]: value });
      }
    }
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   if (editingBookingService) {
  //     setEditingBookingService({ ...editingBookingService, [name]: value });
  //   } else {
  //     setNewBookingService({ ...newBookingService, [name]: value });
  //   }
  // };

  const validateForm = (formData) => {
    let newErrors = {};
    if (!formData.booking_id) newErrors.booking_id = "Booking Id is required";
    if (!formData.service_id) newErrors.service_id = "Service Name is required";
    if (!formData.quantity) newErrors.quantity = "Quantity is required";
    if (!formData.total_cost) newErrors.total_cost = "Total Cost is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (editingBookingService) {
      if (editingBookingService.booking_service_id && editingBookingService) {
        dispatch(
          updateBookingService({
            bookingServiceId: editingBookingService.booking_service_id,
            data: editingBookingService,
          })
        );
      } else {
        console.error(
          "Error: bookingServiceId or editingBookingService is undefined"
        );
      }
      setEditingBookingService(null);
    } else {
      if (validateForm(newBookingService)) {
        dispatch(createNewBookingService(newBookingService));
        setNewBookingService({
          booking_id: null,
          service_id: null,
          quantity: null,
          total_cost: null,
          remark: null,
        });
        setShowModal(false);
        setHoveredGuestServiceId(null);
        setHoveredEventBookingId(null);
      }
    }
  };

  const handleUndo = () => {
    setEditingBookingService(null);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setNewBookingService({
      booking_id: null,
      service_id: null,
      quantity: null,
      total_cost: null,
      remark: null,
    });
    setHoveredGuestServiceId(null);
        setHoveredEventBookingId(null);
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
      console.log("Loading booking services...");
    }
    // if (error) {
    //   console.error("Error fetching booking services:", error);
    // }
    if (bookingServices.length > 0) {
      console.log("Fetched booking services:", bookingServices);
    }
    if (loadingEventBookings) {
      console.log("Loading Event bookings ...");
    }
    if (errorEventBookings) {
      console.error("Error fetching Event bookings:", errorEventBookings);
    }
    if (eventBookings.length > 0) {
      console.log("Fetched Event bookings:", eventBookings);
    }
    if (loadingGuestServices) {
      console.log("Loading Guest services ...");
    }
    if (errorGuestServices) {
      console.error("Error fetching Guest services:", errorGuestServices);
    }
    if (guestServices.length > 0) {
      console.log("Fetched Guest services:", guestServices);
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
    if (loadingUsers) {
      console.log("Loading users...");
    }
    if (errorUsers) {
      console.error("Error fetching users:", errorUsers);
    }
    if (users.length > 0) {
      console.log("Fetched users:", users);
    }
    if (loadingHalls) {
      console.log("Loading halls...");
    }
    if (errorHalls) {
      console.error("Error fetching halls:", errorHalls);
    }
    if (halls.length > 0) {
      console.log("Fetched halls:", halls);
    }
    if (loadingVenues) {
      console.log("Loading venues...");
    }
    if (errorHalls) {
      console.error("Error fetching venues:", errorVenues);
    }
    if (venues.length > 0) {
      console.log("Fetched venues:", venues);
    }
  }, [
    loading,
    error,
    bookingServices,
    eventBookings,
    loadingEventBookings,
    errorEventBookings,
    guestServices,
    loadingGuestServices,
    errorGuestServices,
    loadingEvents,
    errorEvents,
    events,
    users,
    loadingUsers,
    errorUsers,
    halls,
    loadingHalls,
    errorHalls,
    venues,
    loadingVenues,
    errorVenues,
  ]);

  if (loading) return <p>Loading...</p>;
  // if (error) return <p className="error-message">{error}</p>;
  if (loadingEventBookings) return <p>Loading...</p>;
  if (errorEventBookings)
    return <p className="error-message">{errorEventBookings}</p>;
  if (loadingGuestServices) return <p>Loading...</p>;
  if (errorGuestServices)
    return <p className="error-message">{errorGuestServices}</p>;
  if (loadingEvents) return <p>Loading Events...</p>;
  if (errorEvents) return <p className="error-message">{errorEvents}</p>;
  if (loadingUsers) return <p>Loading users...</p>;
  if (errorUsers) return <p className="error-message">{errorUsers}</p>;
  if (loadingHalls) return <p>Loading halls...</p>;
  if (errorHalls) return <p className="error-message">{errorHalls}</p>;
  if (loadingVenues) return <p>Loading halls...</p>;
  if (errorVenues) return <p className="error-message">{errorVenues}</p>;

  return (
    <div className="booking-service-list overflow-auto">
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
        Create New Booking Service
      </button>
      <div className="table-wrapper max-h-80 overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="whitespace-nowrap sticky top-0 z-30 tableHeadEditDelete">
            <tr>
              {/* <th className="px-4 py-2 whitespace-nowrap sticky top-0 left-0 z-20 tableHeadEditDelete">
                Booking Service ID
              </th> */}
              <th className="px-4 py-2 whitespace-nowrap">Booking Id</th>
              <th className="px-4 py-2 whitespace-nowrap">User Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Event Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Hall Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Venue Name</th>
              <th className="px-4 py-2 whitespace-nowrap">
                Booking Start Date
              </th>
              <th className="px-4 py-2 whitespace-nowrap">Booking End Date</th>
              <th className="px-4 py-2 whitespace-nowrap">Service Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Cost/Unit</th>
              <th className="px-4 py-2 whitespace-nowrap">Quantity</th>
              <th className="px-4 py-2 whitespace-nowrap">Total Cost</th>
              <th className="px-4 py-2 whitespace-nowrap">Remark</th>
              <th className="px-4 py-2 whitespace-nowrap sticky top-0 right-0 z-20 tableHeadEditDelete">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {bookingServices.map((bookingService) => (
              <tr key={bookingService.booking_service_id}>
                {/* <td className="px-4 py-2 whitespace-nowrap sticky left-0 tableHeadEditDelete">
                  {bookingService.booking_service_id}
                </td> */}
                <td className="px-4 py-2 whitespace-nowrap">
                  {editingBookingService &&
                  editingBookingService.booking_service_id ===
                    bookingService.booking_service_id ? (
                    <EditableSelectInput
                      name="booking_id"
                      options={eventBookings.map((eventBooking) => ({
                        value: eventBooking.booking_id, // Actual value (booking_id)
                        // label: getUserName(bookingService.booking_id), // Display value (eventBooking.booking_date)
                        label: eventBooking.booking_id, // Display value (eventBooking.booking_date)
                        // label: getUserName(bookingService.booking_id), // Display value (eventBooking.booking_date)
                      }))}
                      value={editingBookingService.booking_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errors.booking_id}
                      placeholder="Select User"
                      id="booking_id"
                      renderOption={handleMouseEnter} // Pass the mouse enter handler
                    />
                  ) : (
                    bookingService.booking_id
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {
                    // Display event name based on hovered booking only if in editing mode
                    editingBookingService &&
                    editingBookingService.booking_id ===
                      bookingService.booking_id
                      ? getUserName(
                          hoveredEventBookingId || bookingService.booking_id
                        )
                      : getUserName(bookingService.booking_id) // Static user name when not editing
                  }
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {
                    // Display event name based on hovered booking only if in editing mode
                    editingBookingService &&
                    editingBookingService.booking_id ===
                      bookingService.booking_id
                      ? getEventName(
                          hoveredEventBookingId || bookingService.booking_id
                        )
                      : getEventName(bookingService.booking_id) // Static user name when not editing
                  }
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {
                    // Display event name based on hovered booking only if in editing mode
                    editingBookingService &&
                    editingBookingService.booking_id ===
                      bookingService.booking_id
                      ? getHallName(
                          hoveredEventBookingId || bookingService.booking_id
                        )
                      : getHallName(bookingService.booking_id) // Static hall name when not editing
                  }
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {
                    // Display event name based on hovered booking only if in editing mode
                    editingBookingService &&
                    editingBookingService.booking_id ===
                      bookingService.booking_id
                      ? getVenueName(
                          hoveredEventBookingId || bookingService.booking_id
                        )
                      : getVenueName(bookingService.booking_id) // Static hall name when not editing
                  }
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {
                    // Display event name based on hovered booking only if in editing mode
                    editingBookingService &&
                    editingBookingService.booking_id ===
                      bookingService.booking_id
                      ? new Date(
                          getBookingStartDate(
                            hoveredEventBookingId || bookingService.booking_id
                          )
                        ).toLocaleDateString()
                      : new Date(
                          getBookingStartDate(bookingService.booking_id)
                        ).toLocaleDateString()
                    // Static hall name when not editing
                  }
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {
                    // Display event name based on hovered booking only if in editing mode
                    editingBookingService &&
                    editingBookingService.booking_id ===
                      bookingService.booking_id
                      ? new Date(
                          getBookingEndDate(
                            hoveredEventBookingId || bookingService.booking_id
                          )
                        ).toLocaleDateString()
                      : new Date(
                          getBookingEndDate(bookingService.booking_id)
                        ).toLocaleDateString()
                    // Static hall name when not editing
                  }
                </td>
                {/* <td className="px-4 py-2 whitespace-nowrap">
                  {editingBookingService &&
                  editingBookingService.booking_service_id ===
                    bookingService.booking_service_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="booking_id"
                        value={editingBookingService.booking_id || ""}
                        onChange={handleInputChange}
                        placeholder="Booking ID"
                      />
                    </div>
                  ) : (
                    bookingService.booking_id
                  )}
                </td> */}

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingBookingService &&
                  editingBookingService.booking_service_id ===
                    bookingService.booking_service_id ? (
                    <EditableSelectInput
                      name="service_id"
                      options={guestServices.map((guestService) => ({
                        value: guestService.service_id, // Actual value (service_id)
                        label: guestService.service_name, // Display value (guestService.service_name)
                      }))}
                      value={editingBookingService.service_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errors.service_id}
                      placeholder="Select Service"
                      id="service_id"
                      renderOption={handleGuestServiceIdMouseEnter} // Pass the mouse enter handler
                    />
                  ) : (
                    // bookingService.service_id
                    //Display service name based on service_id when not in edit mode
                    guestServices.find(
                      (e) => e.service_id === bookingService.service_id
                    )?.service_name || ""
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {
                    // Display event name based on hovered booking only if in editing mode
                    editingBookingService &&
                    editingBookingService.booking_id ===
                      bookingService.booking_id
                      ? getServiceCostPerUnit(
                           bookingService.service_id
                        )
                      : getServiceCostPerUnit(
                         bookingService.service_id
                        )
                    // Static hall name when not editing
                  }
                </td>

                {/* <td className="px-4 py-2 whitespace-nowrap">
                  {editingBookingService &&
                  editingBookingService.booking_service_id ===
                    bookingService.booking_service_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="service_id"
                        value={editingBookingService.service_id || ""}
                        onChange={handleInputChange}
                        placeholder="Service Name"
                      />
                    </div>
                  ) : (
                    bookingService.service_id
                  )}
                </td> */}

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingBookingService &&
                  editingBookingService.booking_service_id ===
                    bookingService.booking_service_id ? (
                    <EditableSelectInput
                      name="quantity"
                      options={bookingServices.map((bookingService) => ({
                        value: bookingService.quantity, // Actual value (quantity)
                        label: bookingService.quantity, // Display value (guestService.quantity)
                      }))}
                      value={editingBookingService.quantity}
                      onChange={handleInputChange}
                      editable={true} // Allows selection from dropdown
                      // error={errors.quantity}
                      placeholder="Select or Enter Quantity"
                      id="quantity"
                      // renderOption={handleMouseEnter} // Pass the mouse enter handler
                    />
                  ) : (
                    bookingService.quantity
                  )}
                </td>

                {/* <td className="px-4 py-2 whitespace-nowrap">
                  {editingBookingService &&
                  editingBookingService.booking_service_id ===
                    bookingService.booking_service_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="quantity"
                        value={editingBookingService.quantity || ""}
                        onChange={handleInputChange}
                        placeholder="Quantity"
                      />
                    </div>
                  ) : (
                    bookingService.quantity
                  )}
                </td> */}
                {/* <td className="px-4 py-2 whitespace-nowrap">
                  {
                    // Display event name based on hovered booking only if in editing mode
                    editingBookingService &&
                    editingBookingService.booking_id ===
                      bookingService.booking_id
                      ? bookingService.quantity *
                        getServiceCostPerUnit(
                          hoveredEventBookingId || bookingService.service_id
                        )
                      : bookingService.quantity *
                        getServiceCostPerUnit(
                          hoveredEventBookingId || bookingService.service_id
                        )
                    // Static hall name when not editing
                  }
                </td> */}
                <td className="px-4 py-2 whitespace-nowrap">
                  {editingBookingService &&
                  editingBookingService.booking_service_id ===
                    bookingService.booking_service_id ? (
                    <EditableSelectInput
                      name="total_cost"
                      options={bookingServices.map((bookingService) => ({
                        value: bookingService.total_cost, // Actual value (total_cost)
                        label: bookingService.total_cost, // Display value (guestService.total_cost)
                      }))}
                      value={editingBookingService.total_cost}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errors.total_cost}
                      placeholder="Select Total Cost"
                      id="total_cost"
                      // renderOption={handleMouseEnter} // Pass the mouse enter handler
                    />
                  ) : (
                    bookingService.total_cost
                  )}
                </td>
                {/* <td className="px-4 py-2 whitespace-nowrap">
                  {editingBookingService &&
                  editingBookingService.booking_service_id ===
                    bookingService.booking_service_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="total_cost"
                        value={editingBookingService.total_cost || ""}
                        onChange={handleInputChange}
                        placeholder="Total Cost"
                      />
                    </div>
                  ) : (
                    bookingService.total_cost
                  )}
                </td> */}
                <td className="px-4 py-2 whitespace-nowrap">
                  {editingBookingService &&
                  editingBookingService.booking_service_id ===
                    bookingService.booking_service_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="remark"
                        value={editingBookingService.remark || ""}
                        onChange={handleInputChange}
                        placeholder="Remark"
                      />
                    </div>
                  ) : (
                    bookingService.remark
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap sticky right-0 tableHeadEditDelete">
                  {editingBookingService &&
                  editingBookingService.booking_service_id ===
                    bookingService.booking_service_id ? (
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
                      {/* <button
                        className="bg-blue-500 text-white px-5 py-1 mx-5 rounded"
                        onClick={() => handleEdit(bookingService)}
                      >
                        Edit
                      </button> */}
                      <button
                        className="bg-red-500 text-white px-4 py-1 rounded"
                        onClick={() =>
                          handleDelete(bookingService.booking_service_id)
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
      {/* Modal for Creating a New Booking Service */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center mt-12 z-30">
          <div className="registerCard px-6 py-1 rounded-lg shadow-lg w-full max-w-6xl">
            <h2 className="text-2xl font-semibold mb-4">
              Create New Booking Service
            </h2>
            <form className="grid grid-cols-4 gap-4">
              <EditableSelectInput
                label="Booking Id"
                name="booking_id"
                options={eventBookings.map((eventBooking) => ({
                  value: eventBooking.booking_id, // Actual value (booking_id)
                  label: eventBooking.booking_id, // Display value (eventBooking.booking_date)
                }))}
                value={newBookingService.booking_id}
                onChange={handleInputChange}
                editable={false} // Allows selection from dropdown
                error={errors.booking_id}
                showRequired={true}
                placeholder="Select User"
                id="booking_id"
                renderOption={handleMouseEnter} // Pass the mouse enter handler
              />

              <div className="input-group row-span-3">
                <label htmlFor="booking_id">Event Name</label>
                <div
                  style={{
                    width: "100%",
                    padding: "0.64rem",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                    outline: "none", // Add this for focus state
                    borderColor: hoveredEventBookingId ? "#d1644d" : "#ccc", // Change border color on hover
                    boxShadow: hoveredEventBookingId
                      ? "0 0 5px rgba(145, 64, 47, 0.5)"
                      : "none", // Change box-shadow on hover
                  }}
                >
                  {getEventName(hoveredEventBookingId)}
                </div>
              </div>
              <div className="input-group row-span-3">
                <label htmlFor="booking_id">User Name</label>
                <div
                  style={{
                    width: "100%",
                    padding: "0.64rem",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                    outline: "none", // Add this for focus state
                    borderColor: hoveredEventBookingId ? "#d1644d" : "#ccc", // Change border color on hover
                    boxShadow: hoveredEventBookingId
                      ? "0 0 5px rgba(145, 64, 47, 0.5)"
                      : "none", // Change box-shadow on hover
                  }}
                >
                  {getUserName(hoveredEventBookingId)}
                </div>
              </div>
              <div className="input-group row-span-3">
                <label htmlFor="booking_id">Hall Name</label>
                <div
                  style={{
                    width: "100%",
                    padding: "0.64rem",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                    outline: "none", // Add this for focus state
                    borderColor: hoveredEventBookingId ? "#d1644d" : "#ccc", // Change border color on hover
                    boxShadow: hoveredEventBookingId
                      ? "0 0 5px rgba(145, 64, 47, 0.5)"
                      : "none", // Change box-shadow on hover
                  }}
                >
                  {getHallName(hoveredEventBookingId)}
                </div>
              </div>
              <div className="input-group row-span-3">
                <label htmlFor="booking_id">Venue Name</label>
                <div
                  style={{
                    width: "100%",
                    padding: "0.64rem",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                    outline: "none", // Add this for focus state
                    borderColor: hoveredEventBookingId ? "#d1644d" : "#ccc", // Change border color on hover
                    boxShadow: hoveredEventBookingId
                      ? "0 0 5px rgba(145, 64, 47, 0.5)"
                      : "none", // Change box-shadow on hover
                  }}
                >
                  {getVenueName(hoveredEventBookingId)}
                </div>
              </div>
              <div className="input-group row-span-3">
                <label htmlFor="booking_id">Booking Start Date</label>
                <div
                  style={{
                    width: "100%",
                    padding: "0.64rem",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                    outline: "none", // Add this for focus state
                    borderColor: hoveredEventBookingId ? "#d1644d" : "#ccc", // Change border color on hover
                    boxShadow: hoveredEventBookingId
                      ? "0 0 5px rgba(145, 64, 47, 0.5)"
                      : "none", // Change box-shadow on hover
                  }}
                >
                  {getBookingStartDate(hoveredEventBookingId).split("T")[0]}
                </div>
              </div>
              <div className="input-group row-span-3">
                <label htmlFor="booking_id">Booking End Date</label>
                <div
                  style={{
                    width: "100%",
                    padding: "0.64rem",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                    outline: "none", // Add this for focus state
                    borderColor: hoveredEventBookingId ? "#d1644d" : "#ccc", // Change border color on hover
                    boxShadow: hoveredEventBookingId
                      ? "0 0 5px rgba(145, 64, 47, 0.5)"
                      : "none", // Change box-shadow on hover
                  }}
                >
                  {getBookingEndDate(hoveredEventBookingId).split("T")[0]}
                </div>
              </div>

              <EditableSelectInput
                label="Service Name"
                name="service_id"
                options={guestServices.map((guestService) => ({
                  value: guestService.service_id, // Actual value (service_id)
                  label: guestService.service_name, // Display value (guestService.service_name)
                }))}
                value={newBookingService.service_id}
                onChange={handleInputChange}
                editable={false} // Allows selection from dropdown
                error={errors.service_id}
                showRequired={true}
                placeholder="Select Service"
                id="service_id"
                renderOption={handleGuestServiceIdMouseEnter} // Pass the mouse enter handler
              />
              {/* <div className="input-group row-span-3">
                <label htmlFor="service_id">Service ID</label>
                <input
                  type="text"
                  name="service_id"
                  value={newBookingService.service_id}
                  onChange={handleInputChange}
                  placeholder="Service ID"
                />
                {errors.service_id && (
                  <span className="error-message">{errors.service_id}</span>
                )}
              </div> */}
              <div className="input-group row-span-3">
                <label htmlFor="booking_id">Cost/Unit</label>
                <div
                  style={{
                    width: "100%",
                    padding: "0.64rem",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                    outline: "none", // Add this for focus state
                    borderColor: hoveredGuestServiceId ? "#d1644d" : "#ccc", // Change border color on hover
                    boxShadow: hoveredGuestServiceId
                      ? "0 0 5px rgba(145, 64, 47, 0.5)"
                      : "none", // Change box-shadow on hover
                  }}
                >
                  {getServiceCostPerUnit(hoveredGuestServiceId)}
                </div>
              </div>
              <EditableSelectInput
                label="Quantity"
                name="quantity"
                options={bookingServices.map((bookingService) => ({
                  value: bookingService.quantity, // Actual value (quantity)
                  label: bookingService.quantity, // Display value (guestService.quantity)
                }))}
                value={newBookingService.quantity}
                onChange={handleInputChange}
                editable={true} // Allows typing and selection from dropdown
                error={errors.quantity}
                showRequired={true}
                placeholder="Select or Enter Quantity"
                id="quantity"
                isNumeric={true}
                // renderOption={handleMouseEnter} // Pass the mouse enter handler
              />

              <div className="input-group row-span-3">
                <label htmlFor="booking_id">Total Cost</label>
                <div
                  style={{
                    width: "100%",
                    padding: "0.64rem",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                    outline: "none", // Add this for focus state
                    // borderColor: hoveredGuestServiceId ? "#d1644d" : "#ccc", // Change border color on hover
                    // boxShadow: hoveredGuestServiceId
                    //   ? "0 0 5px rgba(145, 64, 47, 0.5)"
                    //   : "none", // Change box-shadow on hover
                  }}
                >
                  {newBookingService.total_cost}
                </div>
              </div>
              {/* <div className="input-group row-span-3">
                <label htmlFor="total_cost">Total Cost</label>
                <input
                  type="text"
                  name="total_cost"
                  value={newBookingService.total_cost}
                  onChange={handleInputChange}
                  placeholder="Total Cost"
                />
                {errors.total_cost && (
                  <span className="error-message">{errors.total_cost}</span>
                )}
              </div> */}
              <div className="input-group row-span-3">
                <label htmlFor="remark">Remark</label>
                <textarea
                  name="remark"
                  value={newBookingService.remark}
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

export default BookingServiceList;

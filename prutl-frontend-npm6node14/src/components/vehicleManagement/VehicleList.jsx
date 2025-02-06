import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllVehicles,
  createNewVehicle,
  updateVehicle,
  deleteVehicle,
} from "../../redux/slices/vehicleSlice.js";
import ErrorModal from "../common/ErrorModal.jsx";
import EditableSelectInput from "../common/EditableSelectInput .jsx";
import { getAllCompetitions } from "../../redux/slices/competitionSlice.js";
import { getAllEvents } from "../../redux/slices/eventSlice.js";
import { getAllVenues } from "../../redux/slices/venueSlice.js";
import EditablePhoneInput from "../common/EditablePhoneInput.jsx";

const VehicleList = () => {
  const dispatch = useDispatch();
  const { vehicles, loading, error } = useSelector((state) => state.vehicles);
  const { competitions, loadingCompetitions, errorCompetitions } = useSelector(
    (state) => state.competitions
  );
  const { events, loadingEvents, errorEvents } = useSelector(
    (state) => state.events
  );
  const { venues, loadingVenues, errorVenues } = useSelector(
    (state) => state.venues
  );
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [newVehicle, setNewVehicle] = useState({
    vehicle_number: "",
    ticket_number: "",
    entry_time: "",
    exit_time: "",
    numberofperson_entry_male: "",
    numberofperson_entry_female: "",
    numberofkids_entry_male: "",
    numberofkids_entry_female: "",
    driver_name: "",
    driver_phone_number: "",
    vehicle_owner_name: "",
    vehicle_license: "",
    driver_alcohol_influence_entry_time: "",
    driver_alcohol_influence_exit_time: "",
    vehicle_number: "",
    parking_area: "",
    parking_code: "",
    competition_id: "",
    remark: "",
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [hoveredCompetitionId, setHoveredCompetitionId] = useState(null);

  const handleMouseEnter = (competition) => {
    setHoveredCompetitionId(competition.value); // Update the hovered competition ID
  };

  const getEventName = (competitionId) => {
    const competition = competitions.find(
      (c) => c.competition_id === competitionId
    );
    if (competition) {
      const event = events.find((e) => e.event_id === competition.event_id);
      return event ? event.event_name : "";
    }
    return "";
  };

  const getVenueName = (competitionId) => {
    const competition = competitions.find(
      (c) => c.competition_id === competitionId
    );
    if (competition) {
      const venue = venues.find((v) => v.venue_id === competition.venue_id);
      return venue ? venue.venue_name : "";
    }
    return "";
  };

  useEffect(() => {
    dispatch(getAllVehicles());
    dispatch(getAllCompetitions());
    // Dispatch the action to fetch events when the component mounts
    dispatch(getAllEvents());
    dispatch(getAllVenues());
  }, [dispatch]);

  const handleDelete = (vehicleId) => {
    dispatch(deleteVehicle(vehicleId));
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle({ ...vehicle });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingVehicle) {
      setEditingVehicle({ ...editingVehicle, [name]: value });
    } else {
      setNewVehicle({ ...newVehicle, [name]: value });
    }
  };

  const validateForm = (formData) => {
    let newErrors = {};
    if (!formData.vehicle_number) {
      newErrors.vehicle_number = "Vehicle number is required";
    }
    if (!formData.driver_name) {
      newErrors.driver_name = "Driver name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (editingVehicle) {
      if (editingVehicle.vehicle_id) {
        dispatch(
          updateVehicle({
            vehicleId: editingVehicle.vehicle_id,
            data: editingVehicle,
          })
        );
      } else {
        console.error("Error: vehicle_id or editingVehicle is undefined");
      }
      setEditingVehicle(null);
    } else {
      if (validateForm(newVehicle)) {
        dispatch(createNewVehicle(newVehicle));
        setNewVehicle({
          vehicle_number: "",
          ticket_number: "",
          entry_time: "",
          exit_time: "",
          numberofperson_entry_male: "",
          numberofperson_entry_female: "",
          numberofkids_entry_male: "",
          numberofkids_entry_female: "",
          driver_name: "",
          driver_phone_number: "",
          vehicle_owner_name: "",
          vehicle_license: "",
          driver_alcohol_influence_entry_time: "",
          driver_alcohol_influence_exit_time: "",
          vehicle_number: "",
          parking_area: "",
          parking_code: "",
          competition_id: "",
          remark: "",
        });
        setShowModal(false);
      }
    }
  };

  const handleUndo = () => {
    setEditingVehicle(null);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setNewVehicle({
      vehicle_number: "",
      ticket_number: "",
      entry_time: "",
      exit_time: "",
      numberofperson_entry_male: "",
      numberofperson_entry_female: "",
      numberofkids_entry_male: "",
      numberofkids_entry_female: "",
      driver_name: "",
      driver_phone_number: "",
      vehicle_owner_name: "",
      vehicle_license: "",
      driver_alcohol_influence_entry_time: "",
      driver_alcohol_influence_exit_time: "",
      vehicle_number: "",
      parking_area: "",
      parking_code: "",
      competition_id: "",
      remark: "",
    });
  };

  useEffect(() => {
    if (loading) {
      console.log("Loading vehicles...");
    }
    if (error) {
      console.error("Error fetching vehicles:", error);
    }
    if (vehicles.length > 0) {
      console.log("Fetched vehicles:", vehicles);
    }
    if (loadingCompetitions) {
      console.log("Loading competitions...");
    }
    if (errorCompetitions) {
      console.log("Error fetching users:", errorCompetitions);
    }
    if (competitions.length > 0) {
      console.log("Fetched competitions:", competitions);
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
  }, [
    loading,
    error,
    vehicles,
    competitions,
    loadingCompetitions,
    errorCompetitions,
    venues,
    loadingVenues,
    errorVenues,
  ]);

  // Check for specific error
  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  const handleCloseModal = () => {
    setShowError(false);
  };

  if (loading) return <p>Loading Vehicles...</p>;
  if (loadingCompetitions) return <p>Loading Competitions...</p>;
  if (errorCompetitions)
    return <p className="error-message">{errorCompetitions}</p>;
  if (loadingVenues) return <p>Loading venues...</p>;
  if (errorVenues) return <p className="error-message">{errorVenues}</p>;

  return (
    <div className="vehicle-list overflow-auto">
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
        Create New Vehicle
      </button>
      <div className="table-wrapper max-h-80 overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="whitespace-nowrap sticky top-0 z-30 tableHeadEditDelete">
            <tr>
              <th className="px-4 py-2 whitespace-nowrap">Vehicle Number</th>
              <th className="px-4 py-2 whitespace-nowrap">Ticket Number</th>
              <th className="px-4 py-2 whitespace-nowrap">Entry Time</th>
              <th className="px-4 py-2 whitespace-nowrap">Exit Time</th>
              <th className="px-4 py-2 whitespace-nowrap">No. of Male-Entry</th>
              <th className="px-4 py-2 whitespace-nowrap">
                No. of Female-Entry
              </th>
              <th className="px-4 py-2 whitespace-nowrap">
                No. of Male-Kids-Entry
              </th>
              <th className="px-4 py-2 whitespace-nowrap">
                No. of Female-Kids-Entry
              </th>
              <th className="px-4 py-2 whitespace-nowrap">Driver Name</th>
              <th className="px-4 py-2 whitespace-nowrap">
                Driver's Phone Number
              </th>
              <th className="px-4 py-2 whitespace-nowrap">
                Vehicle Owner Name
              </th>
              <th className="px-4 py-2 whitespace-nowrap">Vehicle License</th>
              <th className="px-4 py-2 whitespace-nowrap">
                Driver Alcohol Influence Entry Time
              </th>
              <th className="px-4 py-2 whitespace-nowrap">
                Driver Alcohol Influence Exit Time
              </th>
              <th className="px-4 py-2 whitespace-nowrap">Parking Area</th>
              <th className="px-4 py-2 whitespace-nowrap">Parking Code</th>
              <th className="px-4 py-2 whitespace-nowrap">Competition Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Event Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Venue Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Remark</th>
              <th className="px-4 py-2 whitespace-nowrap sticky top-0 right-0 z-20 tableHeadEditDelete">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.vehicle_id}>
                <td className="px-4 py-2 whitespace-nowrap">
                  {editingVehicle &&
                  editingVehicle.vehicle_id === vehicle.vehicle_id ? (
                    <EditableSelectInput
                      // label="Vehicle Number"
                      name="vehicle_number"
                      options={vehicles.map((vehicle) => ({
                        value: vehicle.vehicle_number, // Actual value (vehicle_number)
                        label: vehicle.vehicle_number, // Display value (vehicle.vehicle_number)
                      }))}
                      value={editingVehicle.vehicle_number}
                      onChange={handleInputChange}
                      editable={true} // Allows selection from dropdown
                      error={errors.vehicle_number}
                      // showRequired={true}
                      placeholder="Select Vehicle Number"
                      id="vehicle_number"
                    />
                  ) : (
                    vehicle.vehicle_number
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingVehicle &&
                  editingVehicle.vehicle_id === vehicle.vehicle_id ? (
                    <EditableSelectInput
                      // label="Ticket Number"
                      name="ticket_number"
                      options={vehicles.map((vehicle) => ({
                        value: vehicle.ticket_number, // Actual value (ticket_number)
                        label: vehicle.ticket_number, // Display value (vehicle.ticket_number)
                      }))}
                      value={editingVehicle.ticket_number}
                      onChange={handleInputChange}
                      editable={true} // Allows selection from dropdown
                      error={errors.ticket_number}
                      // showRequired={true}
                      placeholder="Select Ticket Number"
                      id="ticket_number"
                    />
                  ) : (
                    vehicle.ticket_number
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingVehicle &&
                  editingVehicle.vehicle_id === vehicle.vehicle_id ? (
                    <div className="input-group">
                      <input
                        type="datetime-local"
                        name="entry_time"
                        value={editingVehicle.entry_time || ""}
                        onChange={handleInputChange}
                        placeholder="Select Entry Time"
                      />
                    </div>
                  ) : (
                    new Date(vehicle.entry_time).toLocaleString()
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingVehicle &&
                  editingVehicle.vehicle_id === vehicle.vehicle_id ? (
                    <div className="input-group">
                      <input
                        type="datetime-local"
                        name="exit_time"
                        value={editingVehicle.exit_time || ""}
                        onChange={handleInputChange}
                        placeholder="Select Entry Time"
                      />
                    </div>
                  ) : (
                    new Date(vehicle.exit_time).toLocaleString()
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingVehicle &&
                  editingVehicle.vehicle_id === vehicle.vehicle_id ? (
                    <EditableSelectInput
                      // label="No. Male-Entry"
                      name="numberofperson_entry_male"
                      options={vehicles.map((vehicle) => ({
                        value: vehicle.numberofperson_entry_male, // Actual value (numberofperson_entry_male)
                        label: vehicle.numberofperson_entry_male, // Display value (vehicle.numberofperson_entry_male)
                      }))}
                      value={editingVehicle.numberofperson_entry_male}
                      onChange={handleInputChange}
                      editable={true} // Allows selection from dropdown
                      error={errors.numberofperson_entry_male}
                      // showRequired={true}
                      placeholder="Select No. Male-Entry"
                      id="numberofperson_entry_male"
                      isNumeric="true"
                    />
                  ) : (
                    vehicle.numberofperson_entry_male
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingVehicle &&
                  editingVehicle.vehicle_id === vehicle.vehicle_id ? (
                    <EditableSelectInput
                      // label="No. Female-Entry"
                      name="numberofperson_entry_female"
                      options={vehicles.map((vehicle) => ({
                        value: vehicle.numberofperson_entry_female, // Actual value (numberofperson_entry_female)
                        label: vehicle.numberofperson_entry_female, // Display value (vehicle.numberofperson_entry_female)
                      }))}
                      value={editingVehicle.numberofperson_entry_female}
                      onChange={handleInputChange}
                      editable={true} // Allows selection from dropdown
                      error={errors.numberofperson_entry_female}
                      // showRequired={true}
                      placeholder="Select No. Female-Entry"
                      id="numberofperson_entry_female"
                      isNumeric="true"
                    />
                  ) : (
                    vehicle.numberofperson_entry_female
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingVehicle &&
                  editingVehicle.vehicle_id === vehicle.vehicle_id ? (
                    <EditableSelectInput
                      // label="No. Male-Kids-Entry"
                      name="numberofkids_entry_male"
                      options={vehicles.map((vehicle) => ({
                        value: vehicle.numberofkids_entry_male, // Actual value (numberofkids_entry_male)
                        label: vehicle.numberofkids_entry_male, // Display value (vehicle.numberofkids_entry_male)
                      }))}
                      value={editingVehicle.numberofkids_entry_male}
                      onChange={handleInputChange}
                      editable={true} // Allows selection from dropdown
                      error={errors.numberofkids_entry_male}
                      // showRequired={true}
                      placeholder="Select No. Male-Kids-Entry"
                      id="numberofkids_entry_male"
                      isNumeric="true"
                    />
                  ) : (
                    vehicle.numberofkids_entry_male
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingVehicle &&
                  editingVehicle.vehicle_id === vehicle.vehicle_id ? (
                    <EditableSelectInput
                      // label="No. Female-Kids-Entry"
                      name="numberofkids_entry_female"
                      options={vehicles.map((vehicle) => ({
                        value: vehicle.numberofkids_entry_female, // Actual value (numberofkids_entry_female)
                        label: vehicle.numberofkids_entry_female, // Display value (vehicle.numberofkids_entry_female)
                      }))}
                      value={editingVehicle.numberofkids_entry_female}
                      onChange={handleInputChange}
                      editable={true} // Allows selection from dropdown
                      error={errors.numberofkids_entry_female}
                      // showRequired={true}
                      placeholder="Select No. Female-Kids-Entry"
                      id="numberofkids_entry_female"
                      isNumeric="true"
                    />
                  ) : (
                    vehicle.numberofkids_entry_female
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingVehicle &&
                  editingVehicle.vehicle_id === vehicle.vehicle_id ? (
                    <EditableSelectInput
                      // label="Driver Name"
                      name="driver_name"
                      options={vehicles.map((vehicle) => ({
                        value: vehicle.driver_name, // Actual value (driver_name)
                        label: vehicle.driver_name, // Display value (vehicle.driver_name)
                      }))}
                      value={editingVehicle.driver_name}
                      onChange={handleInputChange}
                      editable={true} // Allows selection from dropdown
                      error={errors.driver_name}
                      // showRequired={true}
                      placeholder="Select Driver Name"
                      id="driver_name"
                    />
                  ) : (
                    vehicle.driver_name
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingVehicle &&
                  editingVehicle.vehicle_id === vehicle.vehicle_id ? (
                    <EditablePhoneInput
                      // label="Driver Phone Number"
                      name="driver_phone_number"
                      value={editingVehicle.driver_phone_number}
                      onChange={handleInputChange}
                      editable={true} // Allows editing
                      placeholder="Enter Phone Number"
                      // error={errors.driver_phone_number} // Pass any error message if needed
                      country="in" // Set country to 'in' (India) or any other country code
                    />
                  ) : (
                    vehicle.driver_phone_number || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingVehicle &&
                  editingVehicle.vehicle_id === vehicle.vehicle_id ? (
                    <EditableSelectInput
                      // label="Vehicle Owner Name"
                      name="vehicle_owner_name"
                      options={vehicles.map((vehicle) => ({
                        value: vehicle.vehicle_owner_name, // Actual value (vehicle_owner_name)
                        label: vehicle.vehicle_owner_name, // Display value (vehicle.vehicle_owner_name)
                      }))}
                      value={editingVehicle.vehicle_owner_name}
                      onChange={handleInputChange}
                      editable={true} // Allows selection from dropdown
                      error={errors.vehicle_owner_name}
                      // showRequired={true}
                      placeholder="Select Vehicle Owner Name"
                      id="vehicle_owner_name"
                    />
                  ) : (
                    vehicle.vehicle_owner_name
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingVehicle &&
                  editingVehicle.vehicle_id === vehicle.vehicle_id ? (
                    <EditableSelectInput
                      // label="Vehicle License"
                      name="vehicle_license"
                      options={vehicles.map((vehicle) => ({
                        value: vehicle.vehicle_license, // Actual value (vehicle_license)
                        label: vehicle.vehicle_license, // Display value (vehicle.vehicle_license)
                      }))}
                      value={editingVehicle.vehicle_license}
                      onChange={handleInputChange}
                      editable={true} // Allows selection from dropdown
                      error={errors.vehicle_license}
                      // showRequired={true}
                      placeholder="Select Vehicle License"
                      id="vehicle_license"
                    />
                  ) : (
                    vehicle.vehicle_license
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingVehicle &&
                  editingVehicle.vehicle_id === vehicle.vehicle_id ? (
                    <div className="input-group">
                      <input
                        type="datetime-local"
                        name="driver_alcohol_influence_entry_time"
                        value={
                          editingVehicle.driver_alcohol_influence_entry_time ||
                          ""
                        }
                        onChange={handleInputChange}
                        placeholder="Select Driver Alcohol Influence Entry Time"
                      />
                    </div>
                  ) : (
                    new Date(
                      vehicle.driver_alcohol_influence_entry_time
                    ).toLocaleString()
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingVehicle &&
                  editingVehicle.vehicle_id === vehicle.vehicle_id ? (
                    <div className="input-group">
                      <input
                        type="datetime-local"
                        name="driver_alcohol_influence_exit_time"
                        value={
                          editingVehicle.driver_alcohol_influence_exit_time ||
                          ""
                        }
                        onChange={handleInputChange}
                        placeholder="Select Driver Alcohol Influence Exit Time"
                      />
                    </div>
                  ) : (
                    new Date(
                      vehicle.driver_alcohol_influence_exit_time
                    ).toLocaleString()
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingVehicle &&
                  editingVehicle.vehicle_id === vehicle.vehicle_id ? (
                    <EditableSelectInput
                      // label="Parking Area"
                      name="parking_area"
                      options={vehicles.map((vehicle) => ({
                        value: vehicle.parking_area, // Actual value (parking_area)
                        label: vehicle.parking_area, // Display value (vehicle.parking_area)
                      }))}
                      value={editingVehicle.parking_area}
                      onChange={handleInputChange}
                      editable={true} // Allows selection from dropdown
                      error={errors.parking_area}
                      // showRequired={true}
                      placeholder="Select Parking Area"
                      id="parking_area"
                    />
                  ) : (
                    vehicle.parking_area
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingVehicle &&
                  editingVehicle.vehicle_id === vehicle.vehicle_id ? (
                    <EditableSelectInput
                      // label="Parking Code"
                      name="parking_code"
                      options={vehicles.map((vehicle) => ({
                        value: vehicle.parking_code, // Actual value (parking_code)
                        label: vehicle.parking_code, // Display value (vehicle.parking_code)
                      }))}
                      value={editingVehicle.parking_code}
                      onChange={handleInputChange}
                      editable={true} // Allows selection from dropdown
                      error={errors.parking_code}
                      // showRequired={true}
                      placeholder="Select Parking Code"
                      id="parking_code"
                    />
                  ) : (
                    vehicle.parking_code
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingVehicle &&
                  editingVehicle.vehicle_id === vehicle.vehicle_id ? (
                    <EditableSelectInput
                      // label="Competition Name"
                      name="competition_id"
                      options={competitions.map((competition) => ({
                        value: competition.competition_id, // Actual value (competition_id)
                        label: competition.competition_name, // Display value (competition.competition_name)
                      }))}
                      value={editingVehicle.competition_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      error={errors.competition_id}
                      // showRequired={true}
                      placeholder="Select Competition Name"
                      id="competition_id"
                      renderOption={handleMouseEnter} // Pass the mouse enter handler
                    />
                  ) : (
                    // vehicle.competition_id
                    competitions.find(
                      (competition) =>
                        competition.competition_id === vehicle.competition_id
                    )?.competition_name || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {
                    // Display event name based on hovered competition only if in editing mode
                    editingVehicle &&
                    editingVehicle.vehicle_id === vehicle.vehicle_id
                      ? getEventName(
                          hoveredCompetitionId || vehicle.competition_id
                        )
                      : getEventName(vehicle.competition_id) // Static event name when not editing
                  }
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {
                    // Display venue name based on hovered competition only if in editing mode
                    editingVehicle &&
                    editingVehicle.vehicle_id === vehicle.vehicle_id
                      ? getVenueName(
                          hoveredCompetitionId || vehicle.competition_id
                        )
                      : getVenueName(vehicle.competition_id) // Static venue name when not editing
                  }
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingVehicle &&
                  editingVehicle.vehicle_id === vehicle.vehicle_id ? (
                    <textarea
                      name="remark"
                      value={editingVehicle.remark || ""}
                      onChange={handleInputChange}
                      placeholder="Remark"
                      className="border rounded p-2 w-full"
                    />
                  ) : (
                    vehicle.remark
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap sticky right-0 tableHeadEditDelete">
                  {editingVehicle &&
                  editingVehicle.vehicle_id === vehicle.vehicle_id ? (
                    <>
                      <button
                        className="bg-green-500 text-white px-4 py-1 mx-2 rounded"
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
                        className="bg-blue-500 text-white px-5 py-1 mx-2 rounded"
                        onClick={() => handleEdit(vehicle)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => handleDelete(vehicle.vehicle_id)}
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
              Register New Vehicle
            </h2>
            <form className="grid grid-cols-6 gap-4">
              <EditableSelectInput
                label="Vehicle Number"
                name="vehicle_number"
                options={vehicles.map((vehicle) => ({
                  value: vehicle.vehicle_number, // Actual value (vehicle_number)
                  label: vehicle.vehicle_number, // Display value (vehicle.vehicle_number)
                }))}
                value={newVehicle.vehicle_number}
                onChange={handleInputChange}
                editable={true} // Allows selection from dropdown
                error={errors.vehicle_number}
                // showRequired={true}
                placeholder="Select Vehicle Number"
                id="vehicle_number"
              />
              <EditableSelectInput
                label="Ticket Number"
                name="ticket_number"
                options={vehicles.map((vehicle) => ({
                  value: vehicle.ticket_number, // Actual value (ticket_number)
                  label: vehicle.ticket_number, // Display value (vehicle.ticket_number)
                }))}
                value={newVehicle.ticket_number}
                onChange={handleInputChange}
                editable={true} // Allows selection from dropdown
                error={errors.ticket_number}
                // showRequired={true}
                placeholder="Select Ticket Number"
                id="ticket_number"
              />
              <div className="input-group row-span-3">
                <label htmlFor="entry_time">
                  Entry Time 
                  {/* <span className="error-message ">*</span> */}
                </label>
                <input
                  type="datetime-local"
                  name="entry_time"
                  value={newVehicle.entry_time || ""}
                  onChange={handleInputChange}
                  placeholder="Entry Time"
                  className="w-full p-2 mb-4 border rounded"
                />
                {errors.entry_time && (
                  <p className="error-message text-sm">{errors.entry_time}</p>
                )}
              </div>
              <div className="input-group row-span-3">
                <label htmlFor="exit_time">
                  Exit Time
                   {/* <span className="error-message ">*</span> */}
                </label>
                <input
                  type="datetime-local"
                  name="exit_time"
                  value={newVehicle.exit_time || ""}
                  onChange={handleInputChange}
                  placeholder="Exit Time"
                  className="w-full p-2 mb-4 border rounded"
                />
                {errors.entry_time && (
                  <p className="error-message text-sm">{errors.exit_time}</p>
                )}
              </div>
              <EditableSelectInput
                label="No. Male-Entry"
                name="numberofperson_entry_male"
                options={vehicles.map((vehicle) => ({
                  value: vehicle.numberofperson_entry_male, // Actual value (numberofperson_entry_male)
                  label: vehicle.numberofperson_entry_male, // Display value (vehicle.numberofperson_entry_male)
                }))}
                value={newVehicle.numberofperson_entry_male}
                onChange={handleInputChange}
                editable={true} // Allows selection from dropdown
                error={errors.numberofperson_entry_male}
                // showRequired={true}
                placeholder="Select No. Male-Entry"
                id="numberofperson_entry_male"
                isNumeric={true}
              />
              <EditableSelectInput
                label="No. Female-Entry"
                name="numberofperson_entry_female"
                options={vehicles.map((vehicle) => ({
                  value: vehicle.numberofperson_entry_female, // Actual value (numberofperson_entry_female)
                  label: vehicle.numberofperson_entry_female, // Display value (vehicle.numberofperson_entry_female)
                }))}
                value={newVehicle.numberofperson_entry_female}
                onChange={handleInputChange}
                editable={true} // Allows selection from dropdown
                error={errors.numberofperson_entry_female}
                // showRequired={true}
                placeholder="Select No. Female-Entry"
                id="numberofperson_entry_female"
                isNumeric={true}
              />
              <EditableSelectInput
                label="No. Male-Kids-Entry"
                name="numberofkids_entry_male"
                options={vehicles.map((vehicle) => ({
                  value: vehicle.numberofkids_entry_male, // Actual value (numberofkids_entry_male)
                  label: vehicle.numberofkids_entry_male, // Display value (vehicle.numberofkids_entry_male)
                }))}
                value={newVehicle.numberofkids_entry_male}
                onChange={handleInputChange}
                editable={true} // Allows selection from dropdown
                error={errors.numberofkids_entry_male}
                // showRequired={true}
                placeholder="Select No. Male-Kids-Entry"
                id="numberofkids_entry_male"
                isNumeric={true}
              />
              <EditableSelectInput
                label="No. Female-Kids-Entry"
                name="numberofkids_entry_female"
                options={vehicles.map((vehicle) => ({
                  value: vehicle.numberofkids_entry_female, // Actual value (numberofkids_entry_female)
                  label: vehicle.numberofkids_entry_female, // Display value (vehicle.numberofkids_entry_female)
                }))}
                value={newVehicle.numberofkids_entry_female}
                onChange={handleInputChange}
                editable={true} // Allows selection from dropdown
                error={errors.numberofkids_entry_female}
                // showRequired={true}
                placeholder="Select No. Female-Kids-Entry"
                id="numberofkids_entry_female"
                isNumeric={true}
              />
              <EditableSelectInput
                label="Driver Name"
                name="driver_name"
                options={vehicles.map((vehicle) => ({
                  value: vehicle.driver_name, // Actual value (driver_name)
                  label: vehicle.driver_name, // Display value (vehicle.driver_name)
                }))}
                value={newVehicle.driver_name}
                onChange={handleInputChange}
                editable={true} // Allows selection from dropdown
                error={errors.driver_name}
                // showRequired={true}
                placeholder="Select Driver Name"
                id="driver_name"
              />

              <EditableSelectInput
                label="Vehicle Owner Name"
                name="vehicle_owner_name"
                options={vehicles.map((vehicle) => ({
                  value: vehicle.vehicle_owner_name, // Actual value (vehicle_owner_name)
                  label: vehicle.vehicle_owner_name, // Display value (vehicle.vehicle_owner_name)
                }))}
                value={newVehicle.vehicle_owner_name}
                onChange={handleInputChange}
                editable={true} // Allows selection from dropdown
                error={errors.vehicle_owner_name}
                // showRequired={true}
                placeholder="Select Vehicle Owner Name"
                id="vehicle_owner_name"
              />
              <EditableSelectInput
                label="Vehicle License"
                name="vehicle_license"
                options={vehicles.map((vehicle) => ({
                  value: vehicle.vehicle_license, // Actual value (vehicle_license)
                  label: vehicle.vehicle_license, // Display value (vehicle.vehicle_license)
                }))}
                value={newVehicle.vehicle_license}
                onChange={handleInputChange}
                editable={true} // Allows selection from dropdown
                error={errors.vehicle_license}
                // showRequired={true}
                placeholder="Select Vehicle License"
                id="vehicle_license"
              />
              <div className="input-group row-span-3">
                <label htmlFor="driver_alcohol_influence_entry_time">
                  Driver Alcohol Influence Entry Time
                  {/* <span className="error-message ">*</span> */}
                </label>
                <input
                  type="datetime-local"
                  name="driver_alcohol_influence_entry_time"
                  value={newVehicle.driver_alcohol_influence_entry_time || ""}
                  onChange={handleInputChange}
                  placeholder="Entry Time"
                  className="w-full p-2 mb-4 border rounded"
                />
                {errors.driver_alcohol_influence_entry_time && (
                  <p className="error-message text-sm">
                    {errors.driver_alcohol_influence_entry_time}
                  </p>
                )}
              </div>
              <div className="input-group row-span-3">
                <label htmlFor="driver_alcohol_influence_exit_time">
                  Driver Alcohol Influence Exit Time
                  {/* <span className="error-message ">*</span> */}
                </label>
                <input
                  type="datetime-local"
                  name="driver_alcohol_influence_exit_time"
                  value={newVehicle.driver_alcohol_influence_exit_time || ""}
                  onChange={handleInputChange}
                  placeholder="Exit Time"
                  className="w-full p-2 mb-4 border rounded"
                />
                {errors.driver_alcohol_influence_exit_time && (
                  <p className="error-message text-sm">
                    {errors.driver_alcohol_influence_exit_time}
                  </p>
                )}
              </div>
              <EditableSelectInput
                label="Parking Area"
                name="parking_area"
                options={vehicles.map((vehicle) => ({
                  value: vehicle.parking_area, // Actual value (parking_area)
                  label: vehicle.parking_area, // Display value (vehicle.parking_area)
                }))}
                value={newVehicle.parking_area}
                onChange={handleInputChange}
                editable={true} // Allows selection from dropdown
                error={errors.parking_area}
                // showRequired={true}
                placeholder="Select Parking Area"
                id="parking_area"
              />
              <EditableSelectInput
                label="Parking Code"
                name="parking_code"
                options={vehicles.map((vehicle) => ({
                  value: vehicle.parking_code, // Actual value (parking_code)
                  label: vehicle.parking_code, // Display value (vehicle.parking_code)
                }))}
                value={newVehicle.parking_code}
                onChange={handleInputChange}
                editable={true} // Allows selection from dropdown
                error={errors.parking_code}
                // showRequired={true}
                placeholder="Select Parking Code"
                id="parking_code"
              />
              <EditableSelectInput
                label="Competition Name"
                name="competition_id"
                options={competitions.map((competition) => ({
                  value: competition.competition_id, // Actual value (competition_id)
                  label: competition.competition_name, // Display value (competition.competition_name)
                }))}
                value={newVehicle.competition_id}
                onChange={handleInputChange}
                editable={false} // Allows selection from dropdown
                error={errors.competition_id}
                // showRequired={true}
                placeholder="Select Competition Name"
                id="competition_id"
                renderOption={handleMouseEnter}
              />
              <div className="input-group row-span-3">
                <label htmlFor="event_id">
                  Event Name
                  {/* <span className="error-message ">*</span> */}
                </label>
                <input
                  type="text"
                  name="event_id"
                  value={getEventName(newVehicle.competition_id) || ""}
                  onChange={handleInputChange}
                  placeholder="Event Name"
                  className="w-full p-2 mb-4 border rounded"
                />
              </div>
              <div className="input-group row-span-3">
                <label htmlFor="venue_id">
                  Venue Name
                  {/* <span className="error-message ">*</span> */}
                </label>
                <input
                  type="text"
                  name="venue_id"
                  value={getVenueName(newVehicle.competition_id) || ""}
                  onChange={handleInputChange}
                  placeholder="Venue Name"
                  className="w-full p-2 mb-4 border rounded"
                />
              </div>
              
              <div className="input-group col-span-1">
                <label htmlFor="remark">Remark</label>
                <textarea
                  name="remark"
                  value={newVehicle.remark}
                  onChange={handleInputChange}
                  placeholder="Remark"
                  className="w-full p-2 mb-4 border rounded"
                />
              </div>
              <EditablePhoneInput
                label="Driver's Phone No."
                name="driver_phone_number"
                value={newVehicle.driver_phone_number}
                onChange={handleInputChange}
                editable={true} // Allows editing
                placeholder="Driver's Phone Number"
                // error={errors.driver_phone_number} // Pass any error message if needed
                country="in" // Set country to 'in' (India) or any other country code
              />
              <div className="col-span-4 text-center">
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

export default VehicleList;

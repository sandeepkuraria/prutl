import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllVenues,
  createNewVenue,
  updateVenue,
  deleteVenue,
} from "../../redux/slices/venueSlice.js";
import EditablePhoneInput from "../common/EditablePhoneInput.jsx";
import EditableCountrySelect from "../common/EditableCountrySelect.jsx";
import EditableCitySelect from "../common/EditableCitySelect.jsx";
import EditableStateSelect from "../common/EditableStateSelect .jsx";
import EditableSelectInput from "../common/EditableSelectInput .jsx";
import ErrorModal from "../common/ErrorModal.jsx";

const VenueList = () => {
  const dispatch = useDispatch();
  const { venues, loading, error } = useSelector((state) => state.venues);
  const [editingVenue, setEditingVenue] = useState(null);
  const [countryId, setCountryId] = useState(0);
  const [stateId, setStateId] = useState(0);
  const [newVenue, setNewVenue] = useState({
    // venue_code: "",
    venue_name: "",
    address: "",
    seating_capacity: "",
    phone_number: "",
    contact_person: "",
    city: "",
    county: "",
    state: "",
    country: "",
    pin_code: "",
    remark: "",
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    dispatch(getAllVenues());
  }, [dispatch]);

  const handleDelete = (venueId) => {
    dispatch(deleteVenue(venueId));
  };

  const handleEdit = (venue) => {
    setEditingVenue({ ...venue });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingVenue) {
      setEditingVenue({ ...editingVenue, [name]: value });
    } else {
      setNewVenue({ ...newVenue, [name]: value });
    }
  };

  const handleCountryChange = (e) => {
    const { value, countryId } = e.target;
    setCountryId(countryId);

    if (editingVenue) {
      setEditingVenue((prev) => ({
        ...prev,
        country: value,
        state: "",
        city: "",
      }));
    } else {
      setNewVenue((prev) => ({
        ...prev,
        country: value,
        state: "",
        city: "",
      }));
    }
  };

  const handleStateChange = (e) => {
    const { value, stateId } = e.target;
    setStateId(stateId);

    if (editingVenue) {
      setEditingVenue((prev) => ({
        ...prev,
        state: value,
        city: "",
      }));
    } else {
      setNewVenue((prev) => ({
        ...prev,
        state: value,
        city: "",
      }));
    }
  };

  const validateForm = (formData) => {
    let newErrors = {};
    // if (!formData.venue_code) newErrors.venue_code = "Venue Code is required";
    if (!formData.venue_name) newErrors.venue_name = "Venue Name is required";
    if (!formData.address) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (editingVenue) {
      if (editingVenue.venue_id && editingVenue) {
        dispatch(
          updateVenue({
            venueId: editingVenue.venue_id,
            data: editingVenue,
          })
        );
      } else {
        console.error("Error: venueId or editingVenue is undefined");
      }
      setEditingVenue(null);
    } else {
      if (validateForm(newVenue)) {
        dispatch(createNewVenue(newVenue));
        setNewVenue({
          // venue_code: "",
          venue_name: "",
          address: "",
          seating_capacity: "",
          phone_number: "",
          contact_person: "",
          city: "",
          county: "",
          state: "",
          country: "",
          pin_code: "",
          remark: "",
        });
        setCountryId(null); // Reset country ID on save
        setStateId(null); // Reset state ID on save
        setShowModal(false);
      }
    }
  };

  const handleUndo = () => {
    setEditingVenue(null);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setNewVenue({
      // venue_code: "",
      venue_name: "",
      address: "",
      seating_capacity: "",
      phone_number: "",
      contact_person: "",
      city: "",
      county: "",
      state: "",
      country: "",
      pin_code: "",
      remark: "",
    });
    setCountryId(null); // Reset country ID on save
    setStateId(null); // Reset state ID on save
  };

  const handleCloseModal = () => {
    setShowError(false);
  };

  useEffect(() => {
    if (loading) {
      console.log("Loading venues...");
    }
    if (error) {
      console.error("Error fetching venues:", error);
    }
    if (venues.length > 0) {
      console.log("Fetched venues:", venues);
    }
  }, [loading, error, venues]);

  if (loading) return <p>Loading...</p>;
  // if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="venue-list overflow-auto">
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
        Create New Venue
      </button>
      <div className="table-wrapper max-h-80 overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="whitespace-nowrap sticky top-0 z-30 tableHeadEditDelete">
            <tr>
              {/* <th className="px-4 py-2 whitespace-nowrap sticky top-0 left-0 z-20 tableHeadEditDelete">
                Venue ID
              </th> */}
              {/* <th className="px-4 py-2 whitespace-nowrap">Venue Code</th> */}
              <th className="px-4 py-2 whitespace-nowrap">Venue Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Address</th>
              <th className="px-4 py-2 whitespace-nowrap">Seating Capacity</th>
              <th className="px-4 py-2 whitespace-nowrap">Phone Number</th>
              <th className="px-28 py-2 mx-28 whitespace-nowrap">
                Contact Person
              </th>
              <th className="px-28 py-2 mx-28 whitespace-nowrap">Country</th>
              <th className="px-28 py-2 mx-28 whitespace-nowrap">State</th>
              <th className="px-28 py-2 mx-28 whitespace-nowrap">City</th>
              <th className="px-28 py-2 mx-28 whitespace-nowrap">County</th>
              <th className="px-10 py-2 mx-10 whitespace-nowrap">Pin Code</th>
              <th className="px-4 py-2 whitespace-nowrap">Remark</th>
              <th className="px-4 py-2 whitespace-nowrap sticky top-0 right-0 z-20 tableHeadEditDelete">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {venues.map((venue) => (
              <tr key={venue.venue_id}>
                {/* <td className="px-4 py-2 whitespace-nowrap sticky left-0 tableHeadEditDelete">
                  {venue.venue_id}
                </td> */}
                {/* <td className="px-4 py-2 whitespace-nowrap">
                  {editingVenue && editingVenue.venue_id === venue.venue_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="venue_code"
                        value={editingVenue.venue_code || ""}
                        onChange={handleInputChange}
                        placeholder="Venue Code"
                      />
                    </div>
                  ) : (
                    venue.venue_code
                  )}
                </td> */}
                <td className="px-4 py-2 whitespace-nowrap">
                  {editingVenue && editingVenue.venue_id === venue.venue_id ? (
                    <EditableSelectInput
                      name="venue_name"
                      options={venues.map((venue) => ({
                        value: venue.venue_name, // Actual value (venue_name)
                        label: venue.venue_name, // Display value (venue.venue_name)
                      }))}
                      value={editingVenue.venue_name}
                      onChange={handleInputChange}
                      editable={true} // Allows typing and selection from dropdown
                      // error={errors.venue_name}
                      placeholder="Select Venue Name"
                      id="venue_name"
                    />
                  ) : (
                    venue.venue_name
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingVenue && editingVenue.venue_id === venue.venue_id ? (
                    <EditableSelectInput
                      name="address"
                      options={venues.map((venue) => ({
                        value: venue.address, // Actual value (address)
                        label: venue.address, // Display value (venue.address)
                      }))}
                      value={editingVenue.address}
                      onChange={handleInputChange}
                      editable={true} // Allows typing and selection from dropdown
                      // error={errors.address}
                      placeholder="Select Address"
                      id="address"
                    />
                  ) : (
                    venue.address
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingVenue && editingVenue.venue_id === venue.venue_id ? (
                    <EditableSelectInput
                      name="seating_capacity"
                      options={venues.map((venue) => ({
                        value: venue.seating_capacity, // Actual value (seating_capacity)
                        label: venue.seating_capacity, // Display value (venue.seating_capacity)
                      }))}
                      value={editingVenue.seating_capacity}
                      onChange={handleInputChange}
                      editable={true} // Allows typing or selection from dropdown
                      // error={errors.seating_capacity}
                      // showRequired={true}
                      placeholder="Select or Enter Seating Capacity"
                      id="seating_capacity"
                      isNumeric="true"
                      // maxDigits={6}
                    />
                  ) : (
                    venue.seating_capacity
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingVenue && editingVenue.venue_id === venue.venue_id ? (
                    <EditablePhoneInput
                      // label="Phone Number"
                      name="phone_number"
                      value={editingVenue.phone_number}
                      onChange={handleInputChange}
                      editable={true} // Allows editing
                      placeholder="Enter Phone Number"
                      // error={errors.phone_number} // Pass any error message if needed
                      country="in" // Set country to 'in' (India) or any other country code
                    />
                  ) : (
                    venue.phone_number || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingVenue && editingVenue.venue_id === venue.venue_id ? (
                    <EditableSelectInput
                      name="contact_person"
                      options={venues.map((venue) => ({
                        value: venue.contact_person, // Actual value (contact_person)
                        label: venue.contact_person, // Display value (venue.contact_person)
                      }))}
                      value={editingVenue.contact_person}
                      onChange={handleInputChange}
                      editable={true} // Allows typing and selection from dropdown
                      // error={errors.contact_person}
                      placeholder="Select Contact Person"
                      id="contact_person"
                    />
                  ) : (
                    venue.contact_person
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingVenue && editingVenue.venue_id === venue.venue_id ? (
                    <EditableCountrySelect
                      // label="Country"
                      name="country"
                      value={editingVenue.country} // The country code
                      onChange={handleCountryChange} // Update function
                      editable={true} // Allows editing
                      placeholder="Select Country"
                      // error={errors.country} // Pass any error message if needed
                    />
                  ) : (
                    venue.country || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingVenue && editingVenue.venue_id === venue.venue_id ? (
                    <EditableStateSelect
                      // label="State"
                      countryId={countryId}
                      name="state"
                      value={editingVenue.state || ""}
                      onChange={handleStateChange}
                      editable={!!countryId} // Enable only if a country is selected
                      placeholder="Select State"
                      // error={errors.state}
                    />
                  ) : (
                    venue.state || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingVenue && editingVenue.venue_id === venue.venue_id ? (
                    <EditableCitySelect
                      // label="City"
                      countryId={countryId}
                      stateId={stateId}
                      name="city"
                      value={editingVenue.city || ""}
                      onChange={handleInputChange}
                      editable={!!stateId} // Enable only if a state is selected
                      placeholder="Select City"
                      // error={errors.city}
                    />
                  ) : (
                    venue.city || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingVenue && editingVenue.venue_id === venue.venue_id ? (
                    <EditableSelectInput
                      name="county"
                      options={venues.map((venue) => ({
                        value: venue.county, // Actual value (county)
                        label: venue.county, // Display value (venue.county)
                      }))}
                      value={editingVenue.county}
                      onChange={handleInputChange}
                      editable={true} // Allows typing and selection from dropdown
                      // error={errors.county}
                      placeholder="Select County Name"
                      id="county"
                    />
                  ) : (
                    venue.county
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingVenue && editingVenue.venue_id === venue.venue_id ? (
                    <EditableSelectInput
                      name="pin_code"
                      options={venues.map((venue) => ({
                        value: venue.pin_code, // Actual value (pin_code)
                        label: venue.pin_code, // Display value (venue.pin_code)
                      }))}
                      value={editingVenue.pin_code}
                      onChange={handleInputChange}
                      editable={true} // Allows typing or selection from dropdown
                      // error={errors.pin_code}
                      // showRequired={true}
                      placeholder="Select or Enter Pin Code"
                      id="pin_code"
                      isNumeric="true"
                      maxDigits={6}
                    />
                  ) : (
                    venue.pin_code
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingVenue && editingVenue.venue_id === venue.venue_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="remark"
                        value={editingVenue.remark || ""}
                        onChange={handleInputChange}
                        placeholder="Remark"
                      />
                    </div>
                  ) : (
                    venue.remark
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap sticky right-0 tableHeadEditDelete">
                  {editingVenue && editingVenue.venue_id === venue.venue_id ? (
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
                        onClick={() => handleEdit(venue)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-1 rounded"
                        onClick={() => handleDelete(venue.venue_id)}
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
            <h2 className="text-2xl font-semibold mb-4">Create New Venue</h2>
            <form className="grid grid-cols-4 gap-4">
              {/* <div className="input-group row-span-3">
                <label htmlFor="venue_code">
                  Venue Code <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="venue_code"
                  name="venue_code"
                  value={newVenue.venue_code}
                  onChange={handleInputChange}
                  placeholder="Venue Code"
                />
                {errors.venue_code && (
                  <p className="text-red-500 text-sm">{errors.venue_code}</p>
                )}
              </div> */}
              <EditableSelectInput
                label="Venue Name"
                name="venue_name"
                options={venues.map((venue) => ({
                  value: venue.venue_name, // Actual value (venue_name)
                  label: venue.venue_name, // Display value (venue.venue_name)
                }))}
                value={newVenue.venue_name}
                onChange={handleInputChange}
                editable={true} // Allows typing and selection from dropdown
                error={errors.venue_name}
                showRequired={true}
                placeholder="Select Venue Name"
                id="venue_name"
              />
              <EditableSelectInput
                label="Address"
                name="address"
                options={venues.map((venue) => ({
                  value: venue.address, // Actual value (address)
                  label: venue.address, // Display value (venue.address)
                }))}
                value={newVenue.address}
                onChange={handleInputChange}
                editable={true} // Allows typing and selection from dropdown
                error={errors.address}
                showRequired={true}
                placeholder="Select Address"
                id="address"
              />

              <EditableSelectInput
                label="Seating Capacity"
                name="seating_capacity"
                options={venues.map((venue) => ({
                  value: venue.seating_capacity, // Actual value (seating_capacity)
                  label: venue.seating_capacity, // Display value (venue.seating_capacity)
                }))}
                value={newVenue.seating_capacity}
                onChange={handleInputChange}
                editable={true} // Allows typing or selection from dropdown
                error={errors.seating_capacity}
                // showRequired={true}
                placeholder="Select or Enter Seating Capacity"
                id="seating_capacity"
                isNumeric="true"
                // maxDigits={6}
              />

              <EditableSelectInput
                label="Contact Person"
                name="contact_person"
                options={venues.map((venue) => ({
                  value: venue.contact_person, // Actual value (contact_person)
                  label: venue.contact_person, // Display value (venue.contact_person)
                }))}
                value={newVenue.contact_person}
                onChange={handleInputChange}
                editable={true} // Allows typing and selection from dropdown
                error={errors.contact_person}
                // showRequired={true}
                placeholder="Select Contact Person"
                id="contact_person"
              />
              <EditableCountrySelect
                label="Country"
                name="country"
                value={newVenue.country} // The country code
                onChange={handleCountryChange} // Update function
                editable={true} // Allows editing
                placeholder="Select Country"
                error={errors.country} // Pass any error message if needed
              />

              <EditableStateSelect
                label="State"
                countryId={countryId}
                name="state"
                value={newVenue.state || ""}
                onChange={handleStateChange}
                editable={!!countryId} // Enable only if a country is selected
                placeholder="Select State"
                error={errors.state}
              />

              <EditableCitySelect
                label="City"
                countryId={countryId}
                stateId={stateId}
                name="city"
                value={newVenue.city || ""}
                onChange={handleInputChange}
                editable={!!stateId} // Enable only if a state is selected
                placeholder="Select City"
                error={errors.city}
                // showRequired={true}
              />

     
              <EditableSelectInput
                label="County"
                name="county"
                options={venues.map((venue) => ({
                  value: venue.county, // Actual value (county)
                  label: venue.county, // Display value (venue.county)
                }))}
                value={newVenue.county}
                onChange={handleInputChange}
                editable={true} // Allows typing and selection from dropdown
                error={errors.county}
                placeholder="Select County Name"
                id="county"
              />
             

              <EditableSelectInput
                label="Pin Code"
                name="pin_code"
                options={venues.map((venue) => ({
                  value: venue.pin_code, // Actual value (pin_code)
                  label: venue.pin_code, // Display value (venue.pin_code)
                }))}
                value={newVenue.pin_code}
                onChange={handleInputChange}
                editable={true} // Allows typing or selection from dropdown
                error={errors.pin_code}
                // showRequired={true}
                placeholder="Select or Enter Pin Code"
                id="pin_code"
                isNumeric="true"
                maxDigits={6}
              />

              <EditablePhoneInput
                label="Phone Number"
                name="phone_number"
                value={newVenue.phone_number}
                onChange={handleInputChange}
                editable={true} // Allows editing
                placeholder="Enter Phone Number"
                error={errors.phone_number} // Pass any error message if needed
                country="in" // Set country to 'in' (India) or any other country code
              />
              <div className="input-group row-span-3 ml-8">
                <label htmlFor="remark">Remark</label>
                <textarea
                  name="remark"
                  value={newVenue.remark || ""}
                  onChange={handleInputChange}
                  placeholder="Remark"
                  className="w-full p-2 mb-4 border rounded"
                />
                {errors.remark && (
                  <p className="text-red-500 text-sm">{errors.remark}</p>
                )}
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

export default VenueList;

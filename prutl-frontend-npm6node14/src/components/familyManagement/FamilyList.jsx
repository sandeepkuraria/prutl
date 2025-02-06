// prutl-frontend-npm6node14/src/components/teamManagement/FamilyList.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllFamilies,
  createNewFamily,
  updateFamily,
  deleteFamily,
} from "../../redux/slices/familySlice.js";
import ErrorModal from "../common/ErrorModal.jsx";
import EditableSelectInput from "../common/EditableSelectInput .jsx";
import EditablePhoneInput from "../common/EditablePhoneInput.jsx";
import EditableCitySelect from "../common/EditableCitySelect.jsx";
import EditableStateSelect from "../common/EditableStateSelect .jsx";
import EditableCountrySelect from "../common/EditableCountrySelect.jsx";

const FamilyList = () => {
  const dispatch = useDispatch();
  const { families, loading, error } = useSelector((state) => state.families);
  const [editingFamily, setEditingFamily] = useState(null);
  const [newFamily, setNewFamily] = useState({
    // family_code: "",
    family_name: "",
    address: "",
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
  const [countryId, setCountryId] = useState(0);
  const [stateId, setStateId] = useState(0);

  useEffect(() => {
    dispatch(getAllFamilies());
  }, [dispatch]);

  const handleDelete = (familyId) => {
    dispatch(deleteFamily(familyId));
  };

  const handleEdit = (family) => {
    setEditingFamily({ ...family });
    setCountryId(family.country); // Set the country based on the current organization
    setStateId(family.state); // Set the state based on the current organization
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingFamily) {
      setEditingFamily({ ...editingFamily, [name]: value });
    } else {
      setNewFamily({ ...newFamily, [name]: value });
    }
  };

  const handleCountryChange = (e) => {
    const { value, countryId } = e.target;
    setCountryId(countryId);

    if (editingFamily) {
      setEditingFamily((prev) => ({
        ...prev,
        country: value,
        state: "",
        city: "",
      }));
    } else {
      setNewFamily((prev) => ({
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

    if (editingFamily) {
      setEditingFamily((prev) => ({
        ...prev,
        state: value,
        city: "",
      }));
    } else {
      setNewFamily((prev) => ({
        ...prev,
        state: value,
        city: "",
      }));
    }
  };

  const validateForm = (formData) => {
    let newErrors = {};
    // if (!formData.family_code)
    //   newErrors.family_code = "Family Code is required";
    if (!formData.family_name)
      newErrors.family_name = "Family Name is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.phone_number)
      newErrors.phone_number = "Phone Number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (editingFamily) {
      if (editingFamily.family_id && editingFamily) {
        dispatch(
          updateFamily({
            familyId: editingFamily.family_id,
            data: editingFamily,
          })
        );
      } else {
        console.error("Error: familyId or editingFamily is undefined");
      }
      setEditingFamily(null);
    } else {
      if (validateForm(newFamily)) {
        dispatch(createNewFamily(newFamily));
        setNewFamily({
          // family_code: "",
          family_name: "",
          address: "",
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
    setEditingFamily(null);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setNewFamily({
      // family_code: "",
      family_name: "",
      address: "",
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
      console.log("Loading families...");
    }
    if (error) {
      console.error("Error fetching families:", error);
    }
    if (families.length > 0) {
      console.log("Fetched families:", families);
    }
  }, [loading, error, families]);

  if (loading) return <p>Loading...</p>;
  // if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="family-list overflow-auto">
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
        Create New Family
      </button>
      <div className="table-wrapper max-h-80 overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="whitespace-nowrap sticky top-0 z-30 tableHeadEditDelete">
            <tr>
              {/* <th className="px-4 py-2 whitespace-nowrap sticky top-0 left-0 z-20 tableHeadEditDelete">
                Family ID
              </th> */}
              {/* <th className="px-4 py-2 whitespace-nowrap">Family Code</th> */}
              <th className="px-28 py-2 mx-28 whitespace-nowrap">
                Family Name
              </th>
              <th className="px-4 py-2 whitespace-nowrap">Address</th>
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
            {families.map((family) => (
              <tr key={family.family_id}>
                {/* <td className="px-4 py-2 whitespace-nowrap sticky left-0 tableHeadEditDelete">
                  {family.family_id}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {editingFamily &&
                  editingFamily.family_id === family.family_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="family_code"
                        value={editingFamily.family_code || ""}
                        onChange={handleInputChange}
                        placeholder="Family Code"
                      />
                    </div>
                  ) : (
                    family.family_code
                  )}
                </td> */}
                <td className="px-4 py-2 whitespace-nowrap">
                  {editingFamily &&
                  editingFamily.family_id === family.family_id ? (
                    <EditableSelectInput
                      name="family_name"
                      options={families.map((family) => ({
                        value: family.family_name, // Actual value (family_name)
                        label: family.family_name, // Display value (family.family_name)
                      }))}
                      value={editingFamily.family_name}
                      onChange={handleInputChange}
                      editable={true} // Allows both typing and selection from dropdown
                      // error={errors.family_name}
                      placeholder="Select or Enter Family Name"
                      id="family_name"
                    />
                  ) : (
                    family.family_name
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {editingFamily &&
                  editingFamily.family_id === family.family_id ? (
                    <EditableSelectInput
                      name="address"
                      options={families.map((family) => ({
                        value: family.address, // Actual value (address)
                        label: family.address, // Display value (family.address)
                      }))}
                      value={editingFamily.address}
                      onChange={handleInputChange}
                      editable={true} // Allows both typing and selection from dropdown
                      // error={errors.address}
                      placeholder="Select or Enter Address"
                      id="address"
                    />
                  ) : (
                    family.address
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingFamily &&
                  editingFamily.family_id === family.family_id ? (
                    <EditablePhoneInput
                      // label="Phone Number"
                      name="phone_number"
                      value={editingFamily.phone_number}
                      onChange={handleInputChange}
                      editable={true} // Allows editing
                      placeholder="Enter Phone Number"
                      // error={errors.phone_number} // Pass any error message if needed
                      country="in" // Set country to 'in' (India) or any other country code
                    />
                  ) : (
                    family.phone_number || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingFamily &&
                  editingFamily.family_id === family.family_id ? (
                    <EditableSelectInput
                      name="contact_person"
                      options={families.map((family) => ({
                        value: family.contact_person, // Actual value (contact_person)
                        label: family.contact_person, // Display value (family.contact_person)
                      }))}
                      value={editingFamily.contact_person}
                      onChange={handleInputChange}
                      editable={true} // Allows both typing and selection from dropdown
                      // error={errors.contact_person}
                      placeholder="Select or Enter Contact Person"
                      id="contact_person"
                    />
                  ) : (
                    family.contact_person
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingFamily &&
                  editingFamily.family_id === family.family_id ? (
                    <EditableCountrySelect
                      // label="Country"
                      name="country"
                      value={editingFamily.country} // The country code
                      onChange={handleCountryChange} // Update function
                      editable={true} // Allows editing
                      placeholder="Select Country"
                      // error={errors.country} // Pass any error message if needed
                    />
                  ) : (
                    family.country || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingFamily &&
                  editingFamily.family_id === family.family_id ? (
                    <EditableStateSelect
                      // label="State"
                      countryId={countryId}
                      name="state"
                      value={editingFamily.state || ""}
                      onChange={handleStateChange}
                      editable={!!countryId} // Enable only if a country is selected
                      placeholder="Select State"
                      // error={errors.state}
                    />
                  ) : (
                    family.state || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingFamily &&
                  editingFamily.family_id === family.family_id ? (
                    <EditableCitySelect
                      // label="City"
                      countryId={countryId}
                      stateId={stateId}
                      name="city"
                      value={editingFamily.city || ""}
                      onChange={handleInputChange}
                      editable={!!stateId} // Enable only if a state is selected
                      placeholder="Select City"
                      // error={errors.city}
                    />
                  ) : (
                    family.city || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingFamily &&
                  editingFamily.family_id === family.family_id ? (
                    <EditableSelectInput
                      name="county"
                      options={families.map((family) => ({
                        value: family.county, // Actual value (county)
                        label: family.county, // Display value (family.county)
                      }))}
                      value={editingFamily.county}
                      onChange={handleInputChange}
                      editable={true} // Allows typing and selection from dropdown
                      // error={errors.county}
                      placeholder="Select County Name"
                      id="county"
                    />
                  ) : (
                    family.county
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingFamily &&
                  editingFamily.family_id === family.family_id ? (
                    <EditableSelectInput
                      name="pin_code"
                      options={families.map((family) => ({
                        value: family.pin_code, // Actual value (pin_code)
                        label: family.pin_code, // Display value (family.pin_code)
                      }))}
                      value={editingFamily.pin_code}
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
                    family.pin_code
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingFamily &&
                  editingFamily.family_id === family.family_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="remark"
                        value={editingFamily.remark || ""}
                        onChange={handleInputChange}
                        placeholder="Remark"
                      />
                    </div>
                  ) : (
                    family.remark
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap sticky right-0 tableHeadEditDelete">
                  {editingFamily &&
                  editingFamily.family_id === family.family_id ? (
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
                        onClick={() => handleEdit(family)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-1 rounded"
                        onClick={() => handleDelete(family.family_id)}
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
      {/* Modal for Creating a New Family */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center mt-12 z-30">
          <div className="registerCard px-6 py-1 rounded-lg shadow-lg w-full max-w-6xl">
            <h2 className="text-2xl font-semibold mb-4">Create New Family</h2>
            <form className="grid grid-cols-4 gap-4">
              {/* <div className="input-group row-span-3">
                <label htmlFor="family_code">Family Code</label>
                <input
                  type="text"
                  id="family_code"
                  name="family_code"
                  value={newFamily.family_code}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-4 border rounded"
                  placeholder="Family Code"
                />
                {errors.family_code && (
                  <p className="error-message">{errors.family_code}</p>
                )}
              </div> */}
              <EditableSelectInput
                label="Family Name"
                name="family_name"
                options={families.map((family) => ({
                  value: family.family_name, // Actual value (family_name)
                  label: family.family_name, // Display value (family.family_name)
                }))}
                value={newFamily.family_name}
                onChange={handleInputChange}
                editable={true} // Allows both typing and selection from dropdown
                error={errors.family_name}
                showRequired={true}
                placeholder="Select or Enter Family Name"
                id="family_name"
              />
              <EditableSelectInput
                label="Address"
                name="address"
                options={families.map((family) => ({
                  value: family.address, // Actual value (address)
                  label: family.address, // Display value (family.address)
                }))}
                value={newFamily.address}
                onChange={handleInputChange}
                editable={true} // Allows both typing and selection from dropdown
                error={errors.address}
                showRequired={true}
                placeholder="Select or Enter Address"
                id="address"
              />

              <EditableSelectInput
                label="Contact Person"
                name="contact_person"
                options={families.map((family) => ({
                  value: family.contact_person, // Actual value (contact_person)
                  label: family.contact_person, // Display value (family.contact_person)
                }))}
                value={newFamily.contact_person}
                onChange={handleInputChange}
                editable={true} // Allows both typing and selection from dropdown
                error={errors.contact_person}
                // showRequired={true}
                placeholder="Select or Enter Contact Person"
                id="contact_person"
              />
              <EditableCountrySelect
                label="Country"
                name="country"
                value={newFamily.country} // The country code
                onChange={handleCountryChange} // Update function
                editable={true} // Allows editing
                placeholder="Select Country"
                error={errors.country} // Pass any error message if needed
              />

              <EditableStateSelect
                label="State"
                countryId={countryId}
                name="state"
                value={newFamily.state || ""}
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
                value={newFamily.city || ""}
                onChange={handleInputChange}
                editable={!!stateId} // Enable only if a state is selected
                placeholder="Select City"
                error={errors.city}
              />

              <EditableSelectInput
                label="County"
                name="county"
                options={families.map((family) => ({
                  value: family.county, // Actual value (county)
                  label: family.county, // Display value (family.county)
                }))}
                value={newFamily.county}
                onChange={handleInputChange}
                editable={true} // Allows typing and selection from dropdown
                error={errors.county}
                placeholder="Select County Name"
                id="county"
              />

              <EditableSelectInput
                label="Pin Code"
                name="pin_code"
                options={families.map((family) => ({
                  value: family.pin_code, // Actual value (pin_code)
                  label: family.pin_code, // Display value (family.pin_code)
                }))}
                value={newFamily.pin_code}
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
                value={newFamily.phone_number}
                onChange={handleInputChange}
                editable={true} // Allows editing
                placeholder="Enter Phone Number"
                error={errors.phone_number} // Pass any error message if needed
                showRequired={true}
                country="in" // Set country to 'in' (India) or any other country code
              />

              <div className="input-group row-span-3 ml-8">
                <label htmlFor="remark">Remark</label>
                <textarea
                  name="remark"
                  value={newFamily.remark || ""}
                  onChange={handleInputChange}
                  placeholder="Remark"
                  className="w-full p-2 mb-4 border rounded"
                />
              </div>
              <div className="col-span-4 text-center">
                <button
                  type="button"
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2"
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

export default FamilyList;

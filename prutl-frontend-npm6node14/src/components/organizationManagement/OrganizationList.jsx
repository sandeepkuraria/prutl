// prutl-frontend-npm6node14/src/components/organizationManagement/OrganizationList.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrganizations,
  createNewOrganization,
  updateOrganization,
  deleteOrganization,
} from "../../redux/slices/organizationSlice.js";
import ErrorModal from "../common/ErrorModal.jsx";
import EditableSelectInput from "../common/EditableSelectInput .jsx";
import EditablePhoneInput from "../common/EditablePhoneInput.jsx";
import EditableCountrySelect from "../common/EditableCountrySelect.jsx";
import EditableCitySelect from "../common/EditableCitySelect.jsx";
import EditableStateSelect from "../common/EditableStateSelect .jsx";

const OrganizationList = () => {
  const dispatch = useDispatch();
  const { organizations, loading, error } = useSelector(
    (state) => state.organizations
  );
  const [editingOrg, setEditingOrg] = useState(null);
  const [countryId, setCountryId] = useState(0);
  const [stateId, setStateId] = useState(0);
  const [newOrg, setNewOrg] = useState({
    // org_code: '',
    org_name: "",
    org_type: "",
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

  useEffect(() => {
    dispatch(getAllOrganizations());
  }, [dispatch]);

  const handleDelete = (orgId) => {
    dispatch(deleteOrganization(orgId));
  };

  const handleEdit = (organization) => {
    setEditingOrg({ ...organization });
    // setShowModal(true);
    setCountryId(organization.country); // Set the country based on the current organization
    setStateId(organization.state); // Set the state based on the current organization
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(`Changing ${name} to ${value}`);

    if (editingOrg) {
      setEditingOrg({ ...editingOrg, [name]: value });
    } else {
      setNewOrg({ ...newOrg, [name]: value });
    }
  };

  const handleCountryChange = (e) => {
    const { value, countryId } = e.target;
    setCountryId(countryId);

    if (editingOrg) {
      setEditingOrg((prev) => ({
        ...prev,
        country: value,
        state: "",
        city: "",
      }));
    } else {
      setNewOrg((prev) => ({
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

    if (editingOrg) {
      setEditingOrg((prev) => ({
        ...prev,
        state: value,
        city: "",
      }));
    } else {
      setNewOrg((prev) => ({
        ...prev,
        state: value,
        city: "",
      }));
    }
  };

  const validateForm = (formData) => {
    let newErrors = {};
    // if (!formData.org_code) newErrors.org_code = 'Organization code is required';
    if (!formData.org_name)
      newErrors.org_name = "Organization name is required";
    if (formData.pin_code && formData.pin_code.length !== 6) {
      newErrors.pin_code = "Pin Code must be exactly 6 digits";
    }
    // if (formData.phone_number && !/^\+?[0-9\- ]+$/.test(formData.phone_number)) newErrors.phone_number = 'Invalid phone number format';
    // if (formData.pin_code && !/^\d{5}(-\d{4})?$/.test(formData.pin_code)) newErrors.pin_code = 'Invalid postal code format';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (editingOrg) {
      if (editingOrg.org_id && editingOrg) {
        dispatch(
          updateOrganization({ orgId: editingOrg.org_id, data: editingOrg })
        );
      } else {
        console.error("Error: orgId or editingOrg is undefined");
      }
      setEditingOrg(null);
    } else {
      if (validateForm(newOrg)) {
        dispatch(createNewOrganization(newOrg));
        setNewOrg({
          // org_code: '',
          org_name: "",
          org_type: "",
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
    setEditingOrg(null);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setNewOrg({
      // org_code: '',
      org_name: "",
      org_type: "",
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

  const handleCloseModal = () => {
    setShowError(false);
  };

  useEffect(() => {
    if (loading) {
      console.log("Loading organizations...");
    }
    if (error) {
      console.error("Error fetching organizations:", error);
    }
    if (organizations.length > 0) {
      console.log("Fetched organizations:", organizations);
    }
  }, [loading, error, organizations]);

  if (loading) return <p>Loading...</p>;
  // if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="organization-list overflow-auto">
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
        Create New Organization
      </button>
      <div className="table-wrapper max-h-80 overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="whitespace-nowrap sticky top-0 z-30 tableHeadEditDelete  ">
            <tr>
              {/* <th className="px-4 py-2 whitespace-nowrap sticky top-0 left-0 z-20 tableHeadEditDelete">
      Organization ID</th> */}
              {/* <th className="px-4 py-2 whitespace-nowrap">Organization Code</th> */}
              <th className="px-28 py-2 mx-28 whitespace-nowrap">
                Organization Name
              </th>
              <th className="px-10 py-2 mx-10 whitespace-nowrap">
                Organization Type
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
            {organizations.map((organization) => (
              <tr key={organization.org_id}>
                {/* <td className="px-4 py-2 whitespace-nowrap sticky left-0 tableHeadEditDelete">
{organization.org_id}</td> */}
                {/* <td className="px-4 py-2 whitespace-nowrap">
        {editingOrg && editingOrg.org_id === organization.org_id ? (
          <div className="input-group">
            <input
              type="text"
              name="org_code"
              value={editingOrg.org_code || ""}
              onChange={handleInputChange}
              placeholder="Organization Code"
            />
          </div>
        ) : (
          organization.org_code
        )}
      </td> */}

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingOrg && editingOrg.org_id === organization.org_id ? (
                    <EditableSelectInput
                      name="org_name"
                      options={organizations.map((organization) => ({
                        value: organization.org_name, // Actual value (org_name)
                        label: organization.org_name, // Display value (organization.org_name)
                      }))}
                      value={editingOrg.org_name}
                      onChange={handleInputChange}
                      editable={true} // Allows typing and selection from dropdown
                      // error={errors.org_name}
                      placeholder="Select Organization Name"
                      id="org_name"
                    />
                  ) : (
                    organization.org_name
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingOrg && editingOrg.org_id === organization.org_id ? (
                    <EditableSelectInput
                      name="org_type"
                      options={organizations.map((organization) => ({
                        value: organization.org_type, // Actual value (org_type)
                        label: organization.org_type, // Display value (organization.org_type)
                      }))}
                      value={editingOrg.org_type}
                      onChange={handleInputChange}
                      editable={true} // Allows typing and selection from dropdown
                      // error={errors.org_type}
                      placeholder="Select Organization Type"
                      id="org_type"
                    />
                  ) : (
                    organization.org_type
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingOrg && editingOrg.org_id === organization.org_id ? (
                    <EditableSelectInput
                      name="address"
                      options={organizations.map((organization) => ({
                        value: organization.address, // Actual value (address)
                        label: organization.address, // Display value (organization.address)
                      }))}
                      value={editingOrg.address}
                      onChange={handleInputChange}
                      editable={true} // Allows typing and selection from dropdown
                      // error={errors.address}
                      placeholder="Select Address"
                      id="address"
                    />
                  ) : (
                    organization.address
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingOrg && editingOrg.org_id === organization.org_id ? (
                    <EditablePhoneInput
                      // label="Phone Number"
                      name="phone_number"
                      value={editingOrg.phone_number}
                      onChange={handleInputChange}
                      editable={true} // Allows editing
                      placeholder="Enter Phone Number"
                      // error={errors.phone_number} // Pass any error message if needed
                      country="in" // Set country to 'in' (India) or any other country code
                    />
                  ) : (
                    organization.phone_number || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingOrg && editingOrg.org_id === organization.org_id ? (
                    <EditableSelectInput
                      name="contact_person"
                      options={organizations.map((organization) => ({
                        value: organization.contact_person, // Actual value (contact_person)
                        label: organization.contact_person, // Display value (organization.contact_person)
                      }))}
                      value={editingOrg.contact_person}
                      onChange={handleInputChange}
                      editable={true} // Allows typing and selection from dropdown
                      // error={errors.contact_person}
                      placeholder="Select Address"
                      id="contact_person"
                    />
                  ) : (
                    organization.contact_person
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingOrg && editingOrg.org_id === organization.org_id ? (
                    <EditableCountrySelect
                      // label="Country"
                      name="country"
                      value={editingOrg.country} // The country code
                      onChange={handleCountryChange} // Update function
                      editable={true} // Allows editing
                      placeholder="Select Country"
                      // error={errors.country} // Pass any error message if needed
                    />
                  ) : (
                    organization.country || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingOrg && editingOrg.org_id === organization.org_id ? (
                    <EditableStateSelect
                      // label="State"
                      countryId={countryId}
                      name="state"
                      value={editingOrg.state || ""}
                      onChange={handleStateChange}
                      editable={!!countryId} // Enable only if a country is selected
                      placeholder="Select State"
                      // error={errors.state}
                    />
                  ) : (
                    organization.state || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingOrg && editingOrg.org_id === organization.org_id ? (
                    <EditableCitySelect
                      // label="City"
                      countryId={countryId}
                      stateId={stateId}
                      name="city"
                      value={editingOrg.city || ""}
                      onChange={handleInputChange}
                      editable={!!stateId} // Enable only if a state is selected
                      placeholder="Select City"
                      // error={errors.city}
                    />
                  ) : (
                    organization.city || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingOrg && editingOrg.org_id === organization.org_id ? (
                    <EditableSelectInput
                      name="county"
                      options={organizations.map((organization) => ({
                        value: organization.county, // Actual value (county)
                        label: organization.county, // Display value (organization.county)
                      }))}
                      value={editingOrg.county}
                      onChange={handleInputChange}
                      editable={true} // Allows typing and selection from dropdown
                      // error={errors.county}
                      placeholder="Select County Name"
                      id="county"
                    />
                  ) : (
                    organization.county
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingOrg && editingOrg.org_id === organization.org_id ? (
                    <EditableSelectInput
                      name="pin_code"
                      options={organizations.map((organization) => ({
                        value: organization.pin_code, // Actual value (pin_code)
                        label: organization.pin_code, // Display value (organization.pin_code)
                      }))}
                      value={editingOrg.pin_code}
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
                    organization.pin_code
                  )}
                </td>

                {/* <td className="px-4 py-2 whitespace-nowrap">
                  {editingOrg && editingOrg.org_id === organization.org_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="pin_code"
                        value={editingOrg.pin_code || ""}
                        onChange={handleInputChange}
                        placeholder="Pin Code"
                      />
                    </div>
                  ) : (
                    organization.pin_code
                  )}
                </td> */}

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingOrg && editingOrg.org_id === organization.org_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="remark"
                        value={editingOrg.remark || ""}
                        onChange={handleInputChange}
                        placeholder="Remark"
                      />
                    </div>
                  ) : (
                    organization.remark
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap sticky right-0 tableHeadEditDelete">
                  {editingOrg && editingOrg.org_id === organization.org_id ? (
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
                        onClick={() => handleEdit(organization)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 my-1 rounded"
                        onClick={() => handleDelete(organization.org_id)}
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
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center mt-12 z-30 ">
          <div className="registerCard px-6 py-1 rounded-lg shadow-lg w-full max-w-6xl  ">
            <h2 className="text-2xl font-semibold mb-4 ">
              Register New Organization
            </h2>
            <form className="grid grid-cols-4 gap-2">
              <div className="input-group">
                <EditableSelectInput
                  label="Organization Name"
                  name="org_name"
                  options={organizations.map((organization) => ({
                    value: organization.org_name, // Actual value (org_name)
                    label: organization.org_name, // Display value (organization.org_name)
                  }))}
                  value={newOrg.org_name}
                  onChange={handleInputChange}
                  editable={true} // Allows typing and selection from dropdown
                  error={errors.org_name}
                  showRequired={true}
                  placeholder="Select or Enter Organization Name"
                  id="org_name"
                />
              </div>

              <div className="input-group">
                <EditableSelectInput
                  label="Organization Type"
                  name="org_type"
                  options={organizations.map((organization) => ({
                    value: organization.org_type, // Actual value (org_type)
                    label: organization.org_type, // Display value (organization.org_type)
                  }))}
                  value={newOrg.org_type}
                  onChange={handleInputChange}
                  editable={true} // Allows typing and selection from dropdown
                  error={errors.org_type}
                  // showRequired={true}
                  placeholder="Select or Enter Organization Type"
                  id="org_type"
                />
              </div>

              <div className="input-group">
                <EditableSelectInput
                  label="Address"
                  name="address"
                  options={organizations.map((organization) => ({
                    value: organization.address, // Actual value (address)
                    label: organization.address, // Display value (organization.address)
                  }))}
                  value={newOrg.address}
                  onChange={handleInputChange}
                  editable={true} // Allows typing and selection from dropdown
                  error={errors.address}
                  // showRequired={true}
                  placeholder="Select or Enter Address"
                  id="address"
                />
              </div>

              <div className="input-group">
                <EditableSelectInput
                  label="Contact Person"
                  name="contact_person"
                  options={organizations.map((organization) => ({
                    value: organization.contact_person, // Actual value (contact_person)
                    label: organization.contact_person, // Display value (organization.contact_person)
                  }))}
                  value={newOrg.contact_person}
                  onChange={handleInputChange}
                  editable={true} // Allows typing and selection from dropdown
                  error={errors.contact_person}
                  // showRequired={true}
                  placeholder="Select or Enter contact_person"
                  id="contact_person"
                />
              </div>

              <div className="input-group">
                <label htmlFor="country">Country</label>
                <EditableCountrySelect
                  name="country"
                  value={newOrg.country} // The country code
                  onChange={handleCountryChange} // Update function
                  editable={true} // Always allow editing country
                  placeholder="Select Country"
                  error={errors.country} // Pass any error message if needed
                />
              </div>

              <div className="input-group">
                <label htmlFor="state">State</label>
                <EditableStateSelect
                  countryId={countryId} // Pass country ID for state selection
                  name="state"
                  value={newOrg.state || ""}
                  onChange={handleStateChange}
                  editable={!!countryId} // Enable only if a country is selected
                  placeholder="Select State"
                  error={errors.state}
                />
              </div>

              <div className="input-group">
                <label htmlFor="city">City</label>
                <EditableCitySelect
                  countryId={countryId} // Pass country ID for city selection
                  stateId={stateId} // Pass state ID for city selection
                  name="city"
                  value={newOrg.city || ""}
                  onChange={handleInputChange}
                  editable={!!stateId} // Enable only if a state is selected
                  placeholder="Select City"
                  error={errors.city}
                />
              </div>

              <div className="input-group">
                <EditableSelectInput
                  label="County"
                  name="county"
                  options={organizations.map((organization) => ({
                    value: organization.county, // Actual value (county)
                    label: organization.county, // Display value (organization.county)
                  }))}
                  value={newOrg.county}
                  onChange={handleInputChange}
                  editable={true} // Allows typing and selection from dropdown
                  error={errors.county}
                  // showRequired={true}
                  placeholder="Select or Enter county"
                  id="county"
                />
              </div>

              <div className="input-group">
                <EditableSelectInput
                  label="Pin Code"
                  name="pin_code"
                  options={organizations.map((org) => ({
                    value: org.pin_code,
                    label: org.pin_code,
                  }))}
                  value={newOrg.pin_code}
                  onChange={handleInputChange}
                  editable={true}
                  error={errors.pin_code}
                  showRequired={true}
                  placeholder="Enter Pin Code"
                  id="pin_code"
                  isNumeric={true} // Enable numeric input
                  maxDigits={6} // Allow only 6 digits
                />
              </div>

              <EditablePhoneInput
                label="Phone Number"
                name="phone_number"
                value={newOrg.phone_number}
                onChange={handleInputChange}
                editable={true} // Allows editing
                placeholder="Enter Phone Number"
                // showRequired={true}
                error={errors.phone_number} // Pass any error message if needed
                country="in" // Set country to 'in' (India) or any other country code
              />

              <div className="input-group row-span-3 ml-8">
                <label htmlFor="remark">Remark</label>
                <textarea
                  name="remark"
                  value={ newOrg.remark || ""}
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

export default OrganizationList;

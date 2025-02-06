// prutl-frontend-npm6node14/src/components/sponsorManagement/SponsorList.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSponsors,
  createNewSponsor,
  updateSponsor,
  deleteSponsor,
} from "../../redux/slices/sponsorSlice.js";
import { getAllCompetitions } from "../../redux/slices/competitionSlice.js";
import EditableSelectInput from "../common/EditableSelectInput .jsx";
import EditablePhoneInput from "../common/EditablePhoneInput.jsx";
import ErrorModal from "../common/ErrorModal.jsx";

const SponsorList = () => {
  const dispatch = useDispatch();
  const { sponsors, loading, error } = useSelector((state) => state.sponsors);
  const { competitions, loadingCompetitions, errorCompetitions } = useSelector(
    (state) => state.competitions
  );
  const [editingSponsor, setEditingSponsor] = useState(null);
  const [newSponsor, setNewSponsor] = useState({
    competition_id:"",
    sponsor_name: "",
    contact_info: "",
    phone_number: "",
    sponsorship_amount: "",
    remark: "",
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    dispatch(getAllSponsors());
     // Dispatch the action to fetch events when the component mounts
     dispatch(getAllCompetitions());
  }, [dispatch]);

  const handleDelete = (sponsorId) => {
    dispatch(deleteSponsor(sponsorId));
  };

  const handleEdit = (sponsor) => {
    setEditingSponsor({ ...sponsor });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingSponsor) {
      setEditingSponsor({ ...editingSponsor, [name]: value });
    } else {
      setNewSponsor({ ...newSponsor, [name]: value });
    }
  };

  const validateForm = (formData) => {
    let newErrors = {};
    if (!formData.sponsor_name)
      newErrors.sponsor_name = "Sponsor name is required";
    // if (!formData.contact_info)
    //   newErrors.contact_info = "Contact info is required";
    // if (!formData.phone_number)
    //   newErrors.phone_number = "Phone number is required";
    // if (!formData.sponsorship_amount)
    //   newErrors.sponsorship_amount = "Sponsorship amount is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (editingSponsor) {
      if (editingSponsor.sponsor_id && editingSponsor) {
        dispatch(
          updateSponsor({
            sponsorId: editingSponsor.sponsor_id,
            data: editingSponsor,
          })
        );
      } else {
        console.error("Error: sponsorId or editingSponsor is undefined");
      }
      setEditingSponsor(null);
    } else {
      if (validateForm(newSponsor)) {
        dispatch(createNewSponsor(newSponsor));
        setNewSponsor({
          competition_id:"",
          sponsor_name: "",
          contact_info: "",
          phone_number: "",
          sponsorship_amount: "",
          remark: "",
        });
        setShowModal(false);
      }
    }
  };

  const handleUndo = () => {
    setEditingSponsor(null);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setNewSponsor({
      competition_id:"",
      sponsor_name: "",
      contact_info: "",
      phone_number: "",
      sponsorship_amount: "",
      remark: "",
    });
  };

  const handleCloseModal = () => {
    setShowError(false);
  };

  useEffect(() => {
    if (loading) {
      console.log("Loading sponsors...");
    }
    if (error) {
      console.error("Error fetching sponsors:", error);
    }
    if (sponsors.length > 0) {
      console.log("Fetched sponsors:", sponsors);
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
  }, [loading, error, sponsors,  competitions,
    loadingCompetitions,
    errorCompetitions,]);

  if (loading) return <p>Loading...</p>;
  // if (error) return <p className="error-message">{error}</p>;
  if (loadingCompetitions) return <p>Loading Competitions...</p>;
  if (errorCompetitions)
    return <p className="error-message">{errorCompetitions}</p>;
  return (
    <div className="sponsor-list overflow-auto">
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
        Create New Sponsor
      </button>
      <div className="table-wrapper max-h-80 overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="whitespace-nowrap sticky top-0 z-30 tableHeadEditDelete  ">
            <tr>
              {/* <th className="px-4 py-2 whitespace-nowrap sticky top-0 left-0 z-20 tableHeadEditDelete">
                Sponsor ID
              </th> */}
              <th className="px-4 py-2 whitespace-nowrap">Sponsor Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Competition Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Contact Info</th>
              <th className="px-4 py-2 whitespace-nowrap">Phone Number</th>
              <th className="px-4 py-2 whitespace-nowrap">
                Sponsorship Amount
              </th>
              <th className="px-4 py-2 whitespace-nowrap">Remark</th>
              <th className="px-4 py-2 whitespace-nowrap sticky top-0 right-0 z-20 tableHeadEditDelete">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sponsors.map((sponsor) => (
              <tr key={sponsor.sponsor_id}>
                {/* <td className="px-4 py-2 whitespace-nowrap sticky left-0 tableHeadEditDelete">
                  {sponsor.sponsor_id}
                </td> */}
                 <td className="px-4 py-2 whitespace-nowrap">
                  {editingSponsor &&
                  editingSponsor.sponsor_id ===
                  sponsor.sponsor_id ? (
                    <EditableSelectInput
                      name="sponsor_name"
                      options={sponsors.map((sponsor) => ({
                        value: sponsor.sponsor_name, // Actual value (sponsor_name)
                        label: sponsor.sponsor_name, // Display value (sponsor.sponsor_name)
                      }))}
                      value={editingSponsor.sponsor_name}
                      onChange={handleInputChange}
                      editable={true} // Allows typing or selection from dropdown
                      // error={errors.sponsor_name}
                      placeholder="Select or Enter Sponsor Name"
                      id="sponsor_name"
                    />
                  ) : (
                    // sponsors.sponsor_name
                    // Display user name based on user_id when not in edit mode
                    sponsors.find(
                      (sponsorN) =>
                        sponsorN.sponsor_name ===
                      sponsor.sponsor_name
                    )?.sponsor_name || ""
                  )}
                </td>

                  <td className="px-4 py-2 whitespace-nowrap">
                  {editingSponsor &&
                  editingSponsor.sponsor_id ===
                  sponsor.sponsor_id ? (
                    <EditableSelectInput
                      name="competition_id"
                      options={competitions.map((competition) => ({
                        value: competition.competition_id, // Actual value (competition_id)
                        label: competition.competition_name, // Display value (competition.competition_name)
                      }))}
                      value={editingSponsor.competition_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errors.competition_id}
                      placeholder="Select Competition Name"
                      id="competition_id"
                    />
                  ) : (
                    // sponsor.competition_name
                    // Display user name based on user_id when not in edit mode
                    competitions.find(
                      (competition) =>
                        competition.competition_id ===
                      sponsor.competition_id
                    )?.competition_name || ""
                  )}
                </td>

               

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingSponsor &&
                  editingSponsor.sponsor_id ===
                  sponsor.sponsor_id ? (
                    <EditableSelectInput
                      name="contact_info"
                      options={sponsors.map((sponsor) => ({
                        value: sponsor.contact_info, // Actual value (contact_info)
                        label: sponsor.contact_info, // Display value (sponsor.contact_info)
                      }))}
                      value={editingSponsor.contact_info}
                      onChange={handleInputChange}
                      editable={true} // Allows typing or selection from dropdown
                      error={errors.contact_info}
                      // showRequired={true}
                      placeholder="Select or Enter Contact Information"
                      id="contact_info"
                    />
                  ) : (
                    // sponsors.contact_info
                    // Display user name based on user_id when not in edit mode
                    sponsors.find(
                      (sponsorN) =>
                        sponsorN.contact_info ===
                      sponsor.contact_info
                    )?.contact_info || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingSponsor && editingSponsor.sponsor_id === sponsor.sponsor_id ? (
                    <EditablePhoneInput
                      // label="Phone Number"
                      name="phone_number"
                      value={editingSponsor.phone_number}
                      onChange={handleInputChange}
                      editable={true} // Allows editing
                      placeholder="Enter Phone Number"
                      // error={errors.phone_number} // Pass any error message if needed
                      country="in" // Set country to 'in' (India) or any other country code
                    />
                  ) : (
                    sponsor.phone_number || ""
                  )}
                </td>

                {/* <td className="px-4 py-2 whitespace-nowrap">
                  {editingSponsor &&
                  editingSponsor.sponsor_id ===
                  sponsor.sponsor_id ? (
                     <EditableSelectInput
                      name="phone_number"
                      options={sponsors.map((sponsor) => ({
                        value: sponsor.phone_number, // Actual value (phone_number)
                        label: sponsor.phone_number, // Display value (sponsor.phone_number)
                      }))}
                      value={editingSponsor.phone_number}
                      onChange={handleInputChange}
                      editable={true} // Allows typing or selection from dropdown
                      error={errors.phone_number}
                      // showRequired={true}
                      placeholder="Select or Enter Phone Number"
                      id="phone_number"
                    />
                  ) : (
                    // sponsors.phone_number
                    // Display user name based on user_id when not in edit mode
                    sponsors.find(
                      (sponsorN) =>
                        sponsorN.phone_number ===
                      sponsor.phone_number
                    )?.phone_number || ""
                  )}
                </td> */}
               

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingSponsor &&
                  editingSponsor.sponsor_id ===
                  sponsor.sponsor_id ? (
                    <EditableSelectInput
                      name="sponsorship_amount"
                      options={sponsors.map((sponsor) => ({
                        value: sponsor.sponsorship_amount, // Actual value (sponsorship_amount)
                        label: sponsor.sponsorship_amount, // Display value (sponsor.sponsorship_amount)
                      }))}
                      value={editingSponsor.sponsorship_amount}
                      onChange={handleInputChange}
                      editable={true} // Allows typing or selection from dropdown
                      error={errors.sponsorship_amount}
                      // showRequired={true}
                      placeholder="Select or Enter Sponsorship Amount"
                      id="sponsorship_amount"
                      isNumeric="true"
                    />
                  ) : (
                    // sponsors.sponsorship_amount
                    // Display user name based on user_id when not in edit mode
                    sponsors.find(
                      (sponsorN) =>
                        sponsorN.sponsorship_amount ===
                      sponsor.sponsorship_amount
                    )?.sponsorship_amount || ""
                  )}
                </td>
               
                <td className="px-4 py-2 whitespace-nowrap">
                  {editingSponsor &&
                  editingSponsor.sponsor_id === sponsor.sponsor_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="remark"
                        value={editingSponsor.remark || ""}
                        onChange={handleInputChange}
                        placeholder="Remark"
                      />
                    </div>
                  ) : (
                    sponsor.remark
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap sticky right-0 tableHeadEditDelete">
                  {editingSponsor &&
                  editingSponsor.sponsor_id === sponsor.sponsor_id ? (
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
                        onClick={() => handleEdit(sponsor)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 my-1 rounded"
                        onClick={() => handleDelete(sponsor.sponsor_id)}
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
              Register New Sponsor
            </h2>
            <form className="grid grid-cols-4 gap-4">
            <EditableSelectInput
                     label="Sponsor Name"
                      name="sponsor_name"
                      options={sponsors.map((sponsor) => ({
                        value: sponsor.sponsor_name, // Actual value (sponsor_name)
                        label: sponsor.sponsor_name, // Display value (sponsor.sponsor_name)
                      }))}
                      value={newSponsor.sponsor_name}
                      onChange={handleInputChange}
                      editable={true} // Allows selection from dropdown
                      error={errors.sponsor_name}
                      showRequired={true}
                      placeholder="Select or Enter Sponsor Name"
                      id="sponsor_name"
                    />
            <EditableSelectInput
               label="Competition Name"
                      name="competition_id"
                      options={competitions.map((competition) => ({
                        value: competition.competition_id, // Actual value (competition_id)
                        label: competition.competition_name, // Display value (competition.competition_name)
                      }))}
                      value={newSponsor.competition_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      error={errors.competition_id}
                      placeholder="Select Competition Name"
                      id="competition_id"
                    />
                     
              {/* <div className="input-group row-span-3">
                <label htmlFor="sponsor_name">
                  Sponsor Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="sponsor_name"
                  value={newSponsor.sponsor_name || ""}
                  onChange={handleInputChange}
                  placeholder="Sponsor Name"
                  className="w-full p-2 mb-4 border rounded"
                />
                {errors.sponsor_name && (
                  <p className="text-red-500">{errors.sponsor_name}</p>
                )}
              </div> */}
              
               <EditableSelectInput
                     label="Contact Information"
                      name="contact_info"
                      options={sponsors.map((sponsor) => ({
                        value: sponsor.contact_info, // Actual value (contact_info)
                        label: sponsor.contact_info, // Display value (sponsor.contact_info)
                      }))}
                      value={newSponsor.contact_info}
                      onChange={handleInputChange}
                      editable={true} // Allows selection from dropdown
                      error={errors.contact_info}
                      // showRequired={true}
                      placeholder="Select or Enter Contact Information"
                      id="contact_info"
                    />
          
         

              {/* <EditableSelectInput
                     label="Phone Number"
                      name="phone_number"
                      options={sponsors.map((sponsor) => ({
                        value: sponsor.phone_number, // Actual value (phone_number)
                        label: sponsor.phone_number, // Display value (sponsor.phone_number)
                      }))}
                      value={newSponsor.phone_number}
                      onChange={handleInputChange}
                      editable={true} // Allows selection from dropdown
                      error={errors.phone_number}
                      // showRequired={true}
                      placeholder="Select or Enter Phone Number"
                      id="phone_number"
                    /> */}

              <EditableSelectInput
                     label="Sponsorship_Amount"
                      name="sponsorship_amount"
                      options={sponsors.map((sponsor) => ({
                        value: sponsor.sponsorship_amount, // Actual value (sponsorship_amount)
                        label: sponsor.sponsorship_amount, // Display value (sponsor.sponsorship_amount)
                      }))}
                      value={newSponsor.sponsorship_amount}
                      onChange={handleInputChange}
                      editable={true} // Allows selection from dropdown
                      error={errors.sponsorship_amount}
                      // showRequired={true}
                      placeholder="Select or Enter Sponsorship Amount"
                      id="sponsorship_amount"
                      isNumeric="true"
                    />
 <EditablePhoneInput
                      label="Phone Number"
                      name="phone_number"
                      value={newSponsor.phone_number}
                      onChange={handleInputChange}
                      editable={true} // Allows editing
                      placeholder="Enter Phone Number"
                      // error={errors.phone_number} // Pass any error message if needed
                      country="in" // Set country to 'in' (India) or any other country code
                    />
              <div className="input-group row-span-3 ml-9">
                <label htmlFor="remark">Remark</label>

                <textarea
                  name="remark"
                  value={newSponsor.remark || ""}
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

export default SponsorList;

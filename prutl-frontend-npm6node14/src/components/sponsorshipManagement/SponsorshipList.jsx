// prutl-frontend-npm6node14/src/components/sponsorshipManagement/SponsorshipList.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSponsorships,
  createNewSponsorship,
  updateSponsorship,
  deleteSponsorship,
} from "../../redux/slices/sponsorshipSlice.js";
import { getAllTeams } from "../../redux/slices/teamSlice.js";
import { getAllEvents } from "../../redux/slices/eventSlice.js";
import ErrorModal from "../common/ErrorModal.jsx";
import { getAllSponsors } from "../../redux/slices/sponsorSlice.js";
import EditableSelectInput from "../common/EditableSelectInput .jsx";

const SponsorshipList = () => {
  const dispatch = useDispatch();
  const { sponsorships, loading, error } = useSelector(
    (state) => state.sponsorships
  );
  const { teams, loadingTeams, errorTeams } = useSelector(
    (state) => state.teams
  );
  const { events, loadingEvents, errorEvents } = useSelector(
    (state) => state.events
  );
  const { sponsors, loadingSponsors, errorSponsors } = useSelector(
    (state) => state.sponsors
  );
  const [editingSponsorship, setEditingSponsorship] = useState(null);
  const [newSponsorship, setNewSponsorship] = useState({
    sponsor_id: "",
    team_id: "",
    event_id: "",
    amount: "",
    sponsorship_date: "",
    remark: "",
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    dispatch(getAllSponsorships());
    dispatch(getAllTeams());
    dispatch(getAllEvents());
    dispatch(getAllSponsors());
  }, [dispatch]);

  const handleDelete = (sponsorshipId) => {
    dispatch(deleteSponsorship(sponsorshipId));
  };

  const handleEdit = (sponsorship) => {
    setEditingSponsorship({ ...sponsorship });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingSponsorship) {
      setEditingSponsorship({ ...editingSponsorship, [name]: value });
    } else {
      setNewSponsorship({ ...newSponsorship, [name]: value });
    }
  };

  const validateForm = (formData) => {
    let newErrors = {};
    if (!formData.sponsor_id) newErrors.sponsor_id = "Sponsor Name is required";
    if (!formData.team_id) newErrors.team_id = "Team Name is required";
    if (!formData.event_id) newErrors.event_id = "Event Name is required";
    if (!formData.amount) newErrors.amount = "Amount is required";
    if (!formData.sponsorship_date)
      newErrors.sponsorship_date = "Sponsorship Date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (editingSponsorship) {
      if (editingSponsorship.sponsorship_id && editingSponsorship) {
        dispatch(
          updateSponsorship({
            sponsorshipId: editingSponsorship.sponsorship_id,
            data: editingSponsorship,
          })
        );
      } else {
        console.error(
          "Error: sponsorshipId or editingSponsorship is undefined"
        );
      }
      setEditingSponsorship(null);
    } else {
      if (validateForm(newSponsorship)) {
        dispatch(createNewSponsorship(newSponsorship));
        setNewSponsorship({
          sponsor_id: "",
          team_id: "",
          event_id: "",
          amount: "",
          sponsorship_date: "",
          remark: "",
        });
        setShowModal(false);
      }
    }
  };

  const handleUndo = () => {
    setEditingSponsorship(null);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setNewSponsorship({
      sponsor_id: "",
      team_id: "",
      event_id: "",
      amount: "",
      sponsorship_date: "",
      remark: "",
    });
  };

  const handleCloseModal = () => {
    setShowError(false);
  };

  useEffect(() => {
    if (loading) {
      console.log("Loading sponsorships...");
    }
    if (error) {
      console.error("Error fetching sponsorships:", error);
    }
    if (sponsorships.length > 0) {
      console.log("Fetched sponsorships:", sponsorships);
    }
    if (loadingTeams) {
      console.log("Loading teams...");
    }
    if (errorTeams) {
      console.error("Error fetching teams:", errorTeams);
    }
    if (teams.length > 0) {
      console.log("Fetched users:", teams);
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
    if (loadingSponsors) {
      console.log("Loading sponsors...");
    }
    if (errorSponsors) {
      console.log("Error fetching sponsors:", errorSponsors);
    }
    if (sponsors.length > 0) {
      console.log("Fetched sponsors:", sponsors);
    }
  }, [
    loading,
    error,
    sponsorships,
    teams,
    loadingTeams,
    errorTeams,
    loadingEvents,
    errorEvents,
    events,
    sponsors,
    loadingSponsors,
    errorSponsors,
  ]);

  if (loading) return <p>Loading...</p>;
  // if (error) return <p className="error-message">{error}</p>;
  if (loadingTeams) return <p>Loading teams...</p>;
  if (errorTeams) return <p className="error-message">{errorTeams}</p>;
  if (loadingEvents) return <p>Loading Events...</p>;
  if (errorEvents) return <p className="error-message">{errorEvents}</p>;
  if ( loadingSponsors) return <p>Loading Sponsors...</p>;
  if (errorSponsors) return <p className="error-message">{ errorSponsors}</p>;

  return (
    <div className="sponsorship-list overflow-auto">
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
        Create New Sponsorship
      </button>
      <div className="table-wrapper max-h-80 overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="whitespace-nowrap sticky top-0 z-30 tableHeadEditDelete">
            <tr>
              {/* <th className="px-4 py-2 whitespace-nowrap sticky top-0 left-0 z-20 tableHeadEditDelete">
            Sponsorship ID</th> */}
              <th className="px-4 py-2 whitespace-nowrap">Sponsor Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Team Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Event Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Amount</th>
              <th className="px-4 py-2 whitespace-nowrap">Sponsorship Date</th>
              <th className="px-4 py-2 whitespace-nowrap">Remark</th>
              <th className="px-4 py-2 whitespace-nowrap sticky top-0 right-0 z-20 tableHeadEditDelete">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sponsorships.map((sponsorship) => (
              <tr key={sponsorship.sponsorship_id}>
                {/* <td className="px-4 py-2 whitespace-nowrap sticky left-0 tableHeadEditDelete">
{sponsorship.sponsorship_id}</td> */}
                <td className="px-4 py-2 whitespace-nowrap">
                  {editingSponsorship &&
                  editingSponsorship.sponsorship_id ===
                  sponsorship.sponsorship_id ? (
                    <EditableSelectInput
                      name="sponsor_id"
                      options={sponsors.map((sponsor) => ({
                        value: sponsor.sponsor_id, // Actual value (sponsor_id)
                        label: sponsor.sponsor_name, // Display value (sponsor.sponsor_name)
                      }))}
                      value={editingSponsorship.sponsor_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errors.sponsor_id}
                      placeholder="Select Sponsor Name"
                      id="sponsor_id"
                    />
                  ) : (
                    // sponsor.sponsor_id
                    // Display sponsor name based on sponsor id when not in edit mode
                    sponsors.find(
                      (sponsor) => sponsor.sponsor_id === sponsorship.sponsor_id
                    )?.sponsor_name || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingSponsorship &&
                  editingSponsorship.sponsorship_id ===
                  sponsorship.sponsorship_id ? (
                    <EditableSelectInput
                      name="team_id"
                      options={teams.map((team) => ({
                        value: team.team_id, // Actual value (team_id)
                        label: team.team_name, // Display value (sponsor.team_name)
                      }))}
                      value={editingSponsorship.team_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errors.team_id}
                      placeholder="Select Team Name"
                      id="team_id"
                    />
                  ) : (
                    // sponsorship.team_id
                    // Display team name based on team id when not in edit mode
                    teams.find(
                      (team) => team.team_id === sponsorship.team_id
                    )?.team_name || ""
                  )}
                </td>

                 <td className="px-4 py-2 whitespace-nowrap">
                  {editingSponsorship &&
                  editingSponsorship.sponsorship_id ===
                  sponsorship.sponsorship_id ? (
                    <EditableSelectInput
                      name="event_id"
                      options={events.map((event) => ({
                        value: event.event_id, // Actual value (event_id)
                        label: event.event_name, // Display value (sponsor.event_name)
                      }))}
                      value={editingSponsorship.event_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errors.event_id}
                      placeholder="Select Event Name"
                      id="event_id"
                    />
                  ) : (
                    // sponsorship.event_id
                    // Display event name based on event id when not in edit mode
                    events.find(
                      (event) => event.event_id === sponsorship.event_id
                    )?.event_name || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingSponsorship &&
                  editingSponsorship.sponsorship_id ===
                  sponsorship.sponsorship_id ? (
                    <EditableSelectInput
                      name="amount"
                      options={sponsorships.map((sponsorship) => ({
                        value: sponsorship.amount, // Actual value (amount)
                        label: sponsorship.amount, // Display value (sponsor.amount)
                      }))}
                      value={editingSponsorship.amount}
                      onChange={handleInputChange}
                      editable={true} // Allows selection from dropdown
                      // error={errors.amount}
                      placeholder="Select Amount"
                      id="amount"
                      isNumeric={true}
                    />
                  ) : (
                    sponsorship.amount
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingSponsorship &&
                  editingSponsorship.sponsorship_id ===
                    sponsorship.sponsorship_id ? (
                    <div className="input-group">
                      <input
                        type="date"
                        name="sponsorship_date"
                        value={editingSponsorship.sponsorship_date || ""}
                        onChange={handleInputChange}
                        placeholder="Sponsorship Date"
                      />
                    </div>
                  ) : (
                    new Date(sponsorship.sponsorship_date).toLocaleDateString()
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {editingSponsorship &&
                  editingSponsorship.sponsorship_id ===
                    sponsorship.sponsorship_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="remark"
                        value={editingSponsorship.remark || ""}
                        onChange={handleInputChange}
                        placeholder="Remark"
                      />
                    </div>
                  ) : (
                    sponsorship.remark
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap sticky right-0 tableHeadEditDelete">
                  {editingSponsorship &&
                  editingSponsorship.sponsorship_id ===
                    sponsorship.sponsorship_id ? (
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
                        onClick={() => handleEdit(sponsorship)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-1 rounded"
                        onClick={() => handleDelete(sponsorship.sponsorship_id)}
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

      {/* Modal for Creating a New Sponsorship */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center mt-12 z-30">
          <div className="registerCard px-6 py-1 rounded-lg shadow-lg w-full max-w-6xl">
            <h2 className="text-2xl font-semibold mb-4">
              Create New Sponsorship
            </h2>
            <form className="grid grid-cols-4 gap-4">
            <EditableSelectInput
            label="Sponsor Name"
                      name="sponsor_id"
                      options={sponsors.map((sponsor) => ({
                        value: sponsor.sponsor_id, // Actual value (sponsor_id)
                        label: sponsor.sponsor_name, // Display value (sponsor.sponsor_name)
                      }))}
                      value={newSponsorship.sponsor_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      error={errors.sponsor_id}
                      showRequired={true}
                      placeholder="Select Sponsor Name"
                      id="sponsor_id"
                    />
             
             <EditableSelectInput
             label="Team Name"
                      name="team_id"
                      options={teams.map((team) => ({
                        value: team.team_id, // Actual value (team_id)
                        label: team.team_name, // Display value (sponsor.team_name)
                      }))}
                      value={newSponsorship.team_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      error={errors.team_id}
                      showRequired={true}
                      placeholder="Select Team Name"
                      id="team_id"
                    />

            
               <EditableSelectInput
               label="Event Name"
                      name="event_id"
                      options={events.map((event) => ({
                        value: event.event_id, // Actual value (event_id)
                        label: event.event_name, // Display value (sponsor.event_name)
                      }))}
                      value={newSponsorship.event_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      error={errors.event_id}
                      showRequired={true}
                      placeholder="Select Event Name"
                      id="event_id"
                    />
             
             <EditableSelectInput
             label="Amount"
                      name="amount"
                      options={sponsorships.map((sponsorship) => ({
                        value: sponsorship.amount, // Actual value (amount)
                        label: sponsorship.amount, // Display value (sponsor.amount)
                      }))}
                      value={newSponsorship.amount}
                      onChange={handleInputChange}
                      editable={true} // Allows selection from dropdown
                      error={errors.amount}
                      // showRequired={true}
                      placeholder="Select Amount"
                      id="amount"
                      isNumeric={true}
                    />

              <div className="input-group row-span-3">
                <label htmlFor="sponsorship_date">Sponsorship Date <span className="error-message">*</span></label>
                <input
                  type="date"
                  id="sponsorship_date"
                  name="sponsorship_date"
                  value={newSponsorship.sponsorship_date}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-4 border rounded"
                  placeholder="Sponsorship Date"
                />
                {errors.sponsorship_date && (
                  <span className="error-message text-sm">
                    {errors.sponsorship_date}
                  </span>
                )}
              </div>
              <div className="input-group row-span-3">
                <label htmlFor="remark">Remark</label>

                <textarea
                  name="remark"
                  value={newSponsorship.remark || ""}
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

export default SponsorshipList;

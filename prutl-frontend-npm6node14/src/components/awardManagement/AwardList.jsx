// prutl-frontend-npm6node14/src/components/awardManagement/AwardList.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAwards,
  createNewAward,
  updateAward,
  deleteAward,
} from "../../redux/slices/awardSlice.js";
import ErrorModal from "../common/ErrorModal.jsx";
import EditableSelectInput from "../common/EditableSelectInput .jsx";
import { getAllUsers } from "../../redux/slices/userSlice.js";
import { getAllTeams } from "../../redux/slices/teamSlice.js";
import { getAllCompetitions } from "../../redux/slices/competitionSlice.js";
import { getAllEvents } from "../../redux/slices/eventSlice.js";
import { getAllSponsors } from "../../redux/slices/sponsorSlice.js";

const AwardList = () => {
  const dispatch = useDispatch();
  const { awards, loading, error } = useSelector((state) => state.awards);
  const { users, loadingUsers, errorUsers } = useSelector(
    (state) => state.users
  );
  const { teams, loadingTeams, errorTeams } = useSelector(
    (state) => state.teams
  );
  const { competitions, loadingCompetitions, errorCompetitions } = useSelector(
    (state) => state.competitions
  );
  const { events, loadingEvents, errorEvents } = useSelector(
    (state) => state.events
  );
  const { sponsors, loadingSponsors, errorSponsors } = useSelector(
    (state) => state.sponsors
  );
  const [editingAward, setEditingAward] = useState(null);
  const [newAward, setNewAward] = useState({
    award_name: null,
    award_date: null,
    user_id: null,
    team_id: null,
    year: null,
    month: null,
    remark: null,
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [hoveredTeamId, setHoveredTeamId] = useState(null);

  const handleMouseEnter = (team) => {
    setHoveredTeamId(team.value); // Update the hovered competition ID
  };

  // Function to get event name based on team_id from teams table
  const getEventName = (teamId) => {
    const team = teams.find((t) => t.team_id === teamId);
    if (team) {
      const competition = competitions.find(
        (c) => c.competition_id === team.competition_id
      );
      if (competition) {
        const event = events.find((e) => e.event_id === competition.event_id);
        return event ? event.event_name : "";
      }
    }
    return "No Event Found";
  };

  const getCompetitionName = (teamId) => {
    const team = teams.find((team) => team.team_id === teamId);
    if (team) {
      const competition = competitions.find(
        (comp) => comp.competition_id === team.competition_id
      );
      return competition ? competition.competition_name : ""; // Return competition name or empty if not found
    }
    return "No Competition Name"; // Return No Competition Name string if no team found
  };

  const getSponsorName = (teamId) => {
    const team = teams.find((team) => team.team_id === teamId);
    if (team) {
      const sponsor = sponsors.find(
        (sponsor) => sponsor.sponsor_id === team.sponsor_id
      );
      return sponsor ? sponsor.sponsor_name : ""; // Return sponsor name or empty if not found
    }
    return "No sponsor Name"; // Return No sponsor Name string if no team found
  };

  const getMonthName = (monthNumber) => {
    const months = [
      "", // Index 0 is unused because months start from 1
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[monthNumber] || ""; // Return the month name or an empty string if invalid
  };

  useEffect(() => {
    dispatch(getAllAwards());
    dispatch(getAllUsers());
    dispatch(getAllTeams());
    dispatch(getAllCompetitions());
    dispatch(getAllEvents());
    dispatch(getAllSponsors());
  }, [dispatch]);

  const handleDelete = (awardId) => {
    dispatch(deleteAward(awardId));
  };

  const handleEdit = (award) => {
    setEditingAward({ ...award });
  };

  const handleInputChange = (e, selectedOption) => {
    const { name } = e.target;
    const selectedValue = selectedOption ? selectedOption.value : e.target.value; // Use selectedOption if available
  
    // Check whether the selected option is a team or user based on the label
    const isUser = selectedOption?.label.startsWith("User:");
    const isTeam = selectedOption?.label.startsWith("Team:");
  
    if (isUser || isTeam) {
      const updatedAward = {
        ...editingAward || newAward,
        user_id: isUser ? selectedValue : null, // Set user_id if it's a User
        team_id: isTeam ? selectedValue : null, // Set team_id if it's a Team
      };
  
      if (editingAward) {
        setEditingAward(updatedAward);
      } else {
        setNewAward(updatedAward);
      }
    } else {
      // Handle other input changes (e.g., year, month, etc.)
      const updatedAward = {
        ...editingAward || newAward, 
        [name]: selectedValue,
      };
  
      if (editingAward) {
        setEditingAward(updatedAward);
      } else {
        setNewAward(updatedAward);
      }
    }
  };
  
  const validateForm = (formData) => {
    let newErrors = {};
    if (!formData.award_name) newErrors.award_name = "Award Name is required";
    if (!formData.award_date) newErrors.award_date = "Award Date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (editingAward) {
      if (editingAward.award_id && editingAward) {
        dispatch(
          updateAward({ awardId: editingAward.award_id, data: editingAward })
        );
      } else {
        console.error("Error: awardId or editingAward is undefined");
      }
      setEditingAward(null);
    } else {
      if (validateForm(newAward)) {
        dispatch(createNewAward(newAward));
        setNewAward({
          award_name: null,
          award_date: null,
          user_id: null,
          team_id: null,
          year: null,
          month: null,
          remark: null,
        });
        setShowModal(false);
      }
    }
  };

  const handleUndo = () => {
    setEditingAward(null);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setNewAward({
      award_name: null,
      award_date: null,
      user_id: null,
      team_id: null,
      year: null,
      month: null,
      remark: null,
    });
  };

  const handleCloseModal = () => {
    setShowError(false);
  };

  useEffect(() => {
    if (loading) {
      console.log("Loading awards...");
    }
    if (error) {
      console.error("Error fetching awards:", error);
    }
    if (awards.length > 0) {
      console.log("Fetched awards:", awards);
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
    if (loadingCompetitions) {
      console.log("Loading competitions...");
    }
    if (errorCompetitions) {
      console.log("Error fetching users:", errorCompetitions);
    }
    if (competitions.length > 0) {
      console.log("Fetched competitions:", competitions);
    }
    if (loadingSponsors) {
      console.log("Loading sponsors...");
    }
    if (errorSponsors) {
      console.log("Error fetching sponsors:", errorCompetitions);
    }
    if (sponsors.length > 0) {
      console.log("Fetched sponsors:", sponsors);
    }
  }, [
    loading,
    error,
    awards,
    users,
    loadingUsers,
    errorUsers,
    teams,
    loadingTeams,
    errorTeams,
    loadingEvents,
    errorEvents,
    events,
    competitions,
    loadingCompetitions,
    errorCompetitions,
    sponsors,
    loadingSponsors,
    errorSponsors,
  ]);

  if (loading) return <p>Loading...</p>;
  // if (error) return <p className="error-message">{error}</p>;
  if (loadingUsers) return <p>Loading users...</p>;
  if (errorUsers) return <p className="error-message">{errorUsers}</p>;
  if (loadingTeams) return <p>Loading teams...</p>;
  if (errorTeams) return <p className="error-message">{errorTeams}</p>;
  if (loadingEvents) return <p>Loading Events...</p>;
  if (errorEvents) return <p className="error-message">{errorEvents}</p>;
  if (loadingCompetitions) return <p>Loading Competitions...</p>;
  if (errorCompetitions)
    return <p className="error-message">{errorCompetitions}</p>;
  if (loadingSponsors) return <p>Loading sponsors...</p>;
  if (errorSponsors) return <p className="error-message">{errorSponsors}</p>;

  // Assuming you are fetching committees and users from APIs or redux store

  const combinedOptions = [
    ...teams.map((team) => ({
      value: team.team_id,
      label: `Team: ${team.team_name}`,
    })),
    ...users.map((user) => ({
      value: user.user_id,
      label: `User: ${user.name}`, // Modify based on user table structure
    })),
  ];

  return (
    <div className="award-list overflow-auto">
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
        Create New Award
      </button>
      <div className="table-wrapper max-h-80 overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="whitespace-nowrap sticky top-0 z-30 tableHeadEditDelete  ">
            <tr>
              {/* <th className="px-4 py-2 whitespace-nowrap sticky top-0 left-0 z-20 tableHeadEditDelete">
                Award ID
              </th> */}
              <th className="px-28 py-2 mx-28 whitespace-nowrap">Award Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Award Date</th>
              <th className="px-28 py-2 mx-28 whitespace-nowrap">Recipient</th>
              <th className="px-28 py-2 mx-28 whitespace-nowrap">Event Name</th>
              <th className="px-28 py-2 mx-28 whitespace-nowrap">
                Competition Name
              </th>
              <th className="px-28 py-2 mx-28 whitespace-nowrap">
                Sponsor Name
              </th>
              <th className="px-10 py-2 mx-10 whitespace-nowrap">Year</th>
              <th className="px-10 py-2 mx-10 whitespace-nowrap">Month</th>
              <th className="px-4 py-2 whitespace-nowrap">Remark</th>
              <th className="px-4 py-2 whitespace-nowrap sticky top-0 right-0 z-20 tableHeadEditDelete">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {awards.map((award) => (
              <tr key={award.award_id}>
                {/* <td className="px-4 py-2 whitespace-nowrap sticky left-0 tableHeadEditDelete">
                  {award.award_id}
                </td> */}

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingAward && editingAward.award_id === award.award_id ? (
                    <EditableSelectInput
                      name="award_name"
                      options={awards.map((award) => ({
                        value: award.award_name, // Actual value (award_name)
                        label: award.award_name, // Display value (award.award_name)
                      }))}
                      value={editingAward.award_name}
                      onChange={handleInputChange}
                      editable={true} // Allows typing and selection from dropdown
                      // error={errors.award_name}
                      placeholder="Select or Enter Award Name"
                      id="award_name"
                    />
                  ) : (
                    award.award_name
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingAward && editingAward.award_id === award.award_id ? (
                    <div className="input-group">
                      <input
                        type="date"
                        name="award_date"
                        value={editingAward.award_date || ""}
                        onChange={handleInputChange}
                        placeholder="Award Date"
                      />
                    </div>
                  ) : (
                    new Date(award.award_date).toLocaleDateString()
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingAward && editingAward.award_id === award.award_id ? (
                    <EditableSelectInput
                      // label="Recipient Name"
                      // name={
                      //   users.some(
                      //     (user) => user.user_id === editingAward.user_id
                      //   )
                      //     ? "user_id"
                      //     : "team_id"
                      // }
                      name={editingAward.user_id ? "user_id" : "team_id"} 
                      options={combinedOptions}
                      value={editingAward.user_id || editingAward.team_id} // Set to user_id or team_id
  onChange={(e, selectedOption) => handleInputChange(e, selectedOption)} // Pass selectedOption to handleInputChange
                      editable={false}
                      placeholder="Select Recipient Name"
                      // id={
                      //   users.some(
                      //     (user) => user.user_id === editingAward.user_id
                      //   )
                      //     ? "user_id"
                      //     : "team_id"
                      // }
                      id={editingAward.user_id ? "user_id" : "team_id"} 
                      renderOption={handleMouseEnter}
                    />
                  ) : (
                    (() => {
                      const recipient =
                        users.find((user) => user.user_id === award.user_id) ||
                        teams.find((team) => team.team_id === award.team_id);

                      return recipient
                        ? recipient.name || recipient.team_name // Display user name or team name based on the recipient
                        : "Unknown Recipient"; // Fallback if no match is found
                    })()
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {(() => {
                    // Check if the recipient is a team
                    const team = teams.find(
                      (team) => team.team_id === award.team_id
                    );

                    if (team) {
                      // Display event name based on hovered team only if in editing mode
                      return editingAward &&
                        editingAward.award_id === award.award_id
                        ? getEventName(hoveredTeamId || team.team_id)
                        : getEventName(team.team_id); // Static event name when not editing
                    }
                    return ""; // Return empty string if not a team
                  })()}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {(() => {
                    // Check if the recipient is a team
                    const team = teams.find(
                      (team) => team.team_id === award.team_id
                    );

                    if (team) {
                      // Display competition name based on hovered team only if in editing mode
                      return editingAward &&
                        editingAward.award_id === award.award_id
                        ? getCompetitionName(hoveredTeamId || team.team_id)
                        : getCompetitionName(team.team_id); // Static competition name when not editing
                    }
                    return ""; // Return empty string if not a team
                  })()}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {(() => {
                    // Check if the recipient is a team
                    const team = teams.find(
                      (team) => team.team_id === award.team_id
                    );

                    if (team) {
                      // Display sponsor name based on hovered team only if in editing mode
                      return editingAward &&
                        editingAward.award_id === award.award_id
                        ? getSponsorName(hoveredTeamId || team.team_id)
                        : getSponsorName(team.team_id); // Static sponsor name when not editing
                    }
                    return ""; // Return empty string if not a team
                  })()}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingAward && editingAward.award_id === award.award_id ? (
                    <div className="input-group">
                      <select
                        name="year"
                        value={editingAward.year || ""}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Year</option>
                        {Array.from({ length: 50 }, (_, i) => {
                          const year = new Date().getFullYear() - i;
                          return (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  ) : (
                    award.year
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingAward && editingAward.award_id === award.award_id ? (
                    <div className="input-group">
                      <select
                        name="month"
                        value={editingAward.month || ""}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Month</option>
                        {[
                          { name: "January", value: 1 },
                          { name: "February", value: 2 },
                          { name: "March", value: 3 },
                          { name: "April", value: 4 },
                          { name: "May", value: 5 },
                          { name: "June", value: 6 },
                          { name: "July", value: 7 },
                          { name: "August", value: 8 },
                          { name: "September", value: 9 },
                          { name: "October", value: 10 },
                          { name: "November", value: 11 },
                          { name: "December", value: 12 },
                        ].map((month) => (
                          <option key={month.value} value={month.value}>
                            {month.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    getMonthName(award.month) // Show month name instead of the number
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingAward && editingAward.award_id === award.award_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="remark"
                        value={editingAward.remark || ""}
                        onChange={handleInputChange}
                        placeholder="Remark"
                      />
                    </div>
                  ) : (
                    award.remark
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap sticky right-0  tableHeadEditDelete">
                  {editingAward && editingAward.award_id === award.award_id ? (
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
                        onClick={() => handleEdit(award)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 my-1 rounded"
                        onClick={() => handleDelete(award.award_id)}
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
            <h2 className="text-2xl font-semibold mb-4">Register New Award</h2>
            <form className="grid grid-cols-4 gap-4">
              <EditableSelectInput
                label="Award Name"
                name="award_name"
                options={awards.map((award) => ({
                  value: award.award_name, // Actual value (award_name)
                  label: award.award_name, // Display value (award.award_name)
                }))}
                value={newAward.award_name}
                onChange={handleInputChange}
                editable={true} // Allows typing and selection from dropdown
                error={errors.award_name}
                showRequired={true}
                placeholder="Select or Enter Award Name"
                id="award_name"
              />

              <div className="input-group row-span-3">
                <label htmlFor="award_date">
                  Award Date <span className="error-message">*</span>
                </label>
                <input
                  type="date"
                  name="award_date"
                  value={newAward.award_date || ""}
                  onChange={handleInputChange}
                  placeholder="Award Date"
                  className="w-full p-2 mb-4 border rounded"
                />
                {errors.award_date && (
                  <p className="error-message text-sm">{errors.award_date}</p>
                )}
              </div>

              <EditableSelectInput
                label="Recipient Name"
                name={newAward.user_id ? "user_id" : "team_id"} // Dynamically set to "user_id" or "team_id"
                options={combinedOptions} // Combined team and user options
                value={newAward.user_id || newAward.team_id} // Set to user_id or team_id based on current state
                onChange={(e, selectedOption) =>
                  handleInputChange(e, selectedOption)
                } // Pass selectedOption to handleInputChange
                editable={false}
                placeholder="Select Recipient Name"
                id={newAward.user_id ? "user_id" : "team_id"} // Dynamically set ID based on selected value
                renderOption={handleMouseEnter} // Handle hovering event (optional)
              />

              {/* <EditableSelectInput
                label="Recipient Name"
                name={
                  users.some((user) => user.user_id === newAward.user_id)
                    ? "user_id"
                    : "team_id"
                }
                options={combinedOptions}
                value={newAward.user_id || newAward.team_id} // Set to user_id or team_id
                onChange={(e) => handleInputChange(e)} // Use the updated handleInputChange
                editable={false}
                placeholder="Select Recipient Name"
                id={
                  users.some((user) => user.user_id === newAward.user_id)
                    ? "user_id"
                    : "team_id"
                }
                renderOption={handleMouseEnter}
              /> */}

              <div className="input-group row-span-3">
                <label htmlFor="event_name">Event Name</label>
                <div
                  style={{
                    width: "100%",
                    padding: "0.64rem",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                    outline: "none", // Add this for focus state
                    borderColor: hoveredTeamId ? "#d1644d" : "#ccc", // Change border color on hover
                    boxShadow: hoveredTeamId
                      ? "0 0 5px rgba(145, 64, 47, 0.5)"
                      : "none", // Change box-shadow on hover
                  }}
                  renderOption={handleMouseEnter} // Pass the mouse enter handler

                  // onFocus={() =>
                  //   setHoveredTeamId(newAward.team_id)
                  // } // To handle focus
                  // onBlur={() => setHoveredTeamId(null)} // To clear on blur
                >
                  {
                    // Display event name based on hovered competition only if in create mode
                    newAward && newAward.team_id === teams.team_id
                      ? getEventName(hoveredTeamId || newAward.team_id)
                      : getEventName(newAward.team_id) // Static event name when not editing
                  }
                </div>
              </div>
              <div className="input-group row-span-3">
                <label htmlFor="competition_name">Competition Name</label>
                <div
                  style={{
                    width: "100%",
                    padding: "0.64rem",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                    outline: "none", // Add this for focus state
                    borderColor: hoveredTeamId ? "#d1644d" : "#ccc", // Change border color on hover
                    boxShadow: hoveredTeamId
                      ? "0 0 5px rgba(145, 64, 47, 0.5)"
                      : "none", // Change box-shadow on hover
                  }}
                  renderOption={handleMouseEnter} // Pass the mouse enter handler
                  // onFocus={() =>
                  //   setHoveredTeamId(newAward.team_id)
                  // } // To handle focus
                  // onBlur={() => setHoveredTeamId(null)} // To clear on blur
                >
                  {
                    // Display event name based on hovered competition only if in create mode
                    newAward && newAward.team_id === teams.team_id
                      ? getCompetitionName(hoveredTeamId || newAward.team_id)
                      : getCompetitionName(newAward.team_id) // Static event name when not editing
                  }
                </div>
              </div>
              <div className="input-group row-span-3">
                <label htmlFor="sponsor_name">Sponsor Name</label>
                <div
                  style={{
                    width: "100%",
                    padding: "0.64rem",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                    outline: "none", // Add this for focus state
                    borderColor: hoveredTeamId ? "#d1644d" : "#ccc", // Change border color on hover
                    boxShadow: hoveredTeamId
                      ? "0 0 5px rgba(145, 64, 47, 0.5)"
                      : "none", // Change box-shadow on hover
                  }}
                  renderOption={handleMouseEnter} // Pass the mouse enter handler
                  // onFocus={() =>
                  //   setHoveredTeamId(newAward.team_id)
                  // } // To handle focus
                  // onBlur={() => setHoveredTeamId(null)} // To clear on blur
                >
                  {
                    // Display event name based on hovered competition only if in create mode
                    newAward && newAward.team_id === teams.team_id
                      ? getSponsorName(hoveredTeamId || newAward.team_id)
                      : getSponsorName(newAward.team_id) // Static event name when not editing
                  }
                </div>
              </div>

              <div className="input-group row-span-3">
                <label htmlFor="year">Year</label>
                <select
                  name="year"
                  value={newAward.year || ""}
                  onChange={handleInputChange}
                >
                  <option value="">Select Year</option>
                  {Array.from({ length: 50 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="input-group row-span-3">
                <label htmlFor="month">Month</label>
                <select
                  name="month"
                  value={newAward.month || ""}
                  onChange={handleInputChange}
                >
                  <option value="">Select Month</option>
                  {[
                    { name: "January", value: 1 },
                    { name: "February", value: 2 },
                    { name: "March", value: 3 },
                    { name: "April", value: 4 },
                    { name: "May", value: 5 },
                    { name: "June", value: 6 },
                    { name: "July", value: 7 },
                    { name: "August", value: 8 },
                    { name: "September", value: 9 },
                    { name: "October", value: 10 },
                    { name: "November", value: 11 },
                    { name: "December", value: 12 },
                  ].map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-group row-span-3">
                <label htmlFor="remark">Remark</label>

                <textarea
                  name="remark"
                  value={newAward.remark || ""}
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

export default AwardList;

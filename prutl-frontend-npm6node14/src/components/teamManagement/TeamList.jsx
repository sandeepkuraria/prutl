// prutl-frontend-npm6node14/src/components/teamManagement/TeamList.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTeams,
  createNewTeam,
  updateTeam,
  deleteTeam,
} from "../../redux/slices/teamSlice.js";
import { getAllCompetitions } from "../../redux/slices/competitionSlice.js";
import { getAllRoles } from "../../redux/slices/roleSlice.js";
import ErrorModal from "../common/ErrorModal.jsx";
import EditableSelectInput from "../common/EditableSelectInput .jsx";
import { getAllSponsors } from "../../redux/slices/sponsorSlice.js";
import { getAllEvents } from "../../redux/slices/eventSlice.js";

const TeamList = () => {
  const dispatch = useDispatch();
  const { teams, loading, error } = useSelector((state) => state.teams);
  const { roles, loadingRoles, errorRoles } = useSelector(
    (state) => state.roles
  );
  const { sponsors, loadingSponsors, errorSponsors } = useSelector(
    (state) => state.sponsors
  );
  const { competitions, loadingCompetitions, errorCompetitions } = useSelector(
    (state) => state.competitions
  );
  const { events, loadingEvents, errorEvents } = useSelector(
    (state) => state.events
  );
  const [editingTeam, setEditingTeam] = useState(null);
  const [newTeam, setNewTeam] = useState({
    role_id: null,
    team_name: null,
    sponsor_id: null,
    competition_id: null,
    remark: null,
    team_icon_url: null,
    team_color: null,
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

  useEffect(() => {
    dispatch(getAllTeams());
    // Dispatch the action to fetch events when the component mounts
    dispatch(getAllRoles());
    // Dispatch the action to fetch events when the component mounts
    dispatch(getAllSponsors());
    // Dispatch the action to fetch events when the component mounts
    dispatch(getAllCompetitions());
    // Dispatch the action to fetch events when the component mounts
    dispatch(getAllEvents());
  }, [dispatch]);

  const handleDelete = (teamId) => {
    dispatch(deleteTeam(teamId));
  };

  const handleEdit = (team) => {
    setEditingTeam({ ...team, team_icon_url: team.team_icon_url || null });
    // console.log("team icon url +++++++", team.team_icon_url);
  };

  const handleTeamIconChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file); // Log to ensure the file is selected
    if (file && file instanceof File) {
      if (editingTeam) {
        setEditingTeam({ ...editingTeam, team_icon_url: file });
        console.log("editingTeam with updated Team Icon:", {
          ...editingTeam,
          team_icon_url: file,
        });
      } else {
        setNewTeam({ ...newTeam, team_icon_url: file });
        console.log("New Team with updated Team Icon:", {
          ...newTeam,
          team_icon_url: file,
        });
      }
    } else {
      console.log("Invalid file selection or no file selected");
    }
  };

  const handleTeamColorChange = (event) => {
    const selectedColor = event.target.value; // Get the selected color (HEX)
    if (editingTeam) {
      setEditingTeam({ ...editingTeam, team_color: selectedColor }); // Update the state with the new color
    } else {
      setNewTeam({ ...newTeam, team_color: selectedColor });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingTeam) {
      setEditingTeam({ ...editingTeam, [name]: value });
    } else {
      setNewTeam({ ...newTeam, [name]: value });
    }
  };

  const validateForm = (formData) => {
    let newErrors = {};
    // if (!formData.role_id) newErrors.role_id = "Team Role is required";
    if (!formData.team_name) newErrors.team_name = "Team name is required";
    // if (!formData.sponsor_id) newErrors.sponsor_id = "Sponsor Name is required";
    // if (!formData.competition_id)
    //   newErrors.competition_id = "Competition Name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    const formData = new FormData();

    if (editingTeam) {
      if (editingTeam.team_id && editingTeam) {
        formData.append("role_id", editingTeam.role_id);
        formData.append("team_name", editingTeam.team_name);
        formData.append("sponsor_id", editingTeam.sponsor_id);
        formData.append("competition_id", editingTeam.competition_id);
        formData.append("remark", editingTeam.remark);
        formData.append("team_color", editingTeam.team_color);

        if (editingTeam.team_icon_url instanceof File) {
          formData.append("team_icon_url", editingTeam.team_icon_url || null);
        }

        // Logging FormData content
        for (let [key, value] of formData.entries()) {
          if (key === "team_icon_url") {
            console.log(
              `${key}: ${value.name}, type: ${value.type}, size: ${value.size} bytes`
            );
          } else {
            console.log(`${key}: ${value}`);
          }
        }

        dispatch(updateTeam({ teamId: editingTeam.team_id, data: formData }));
      } else {
        console.error("Error: teamId or editingTeam is undefined");
      }
      setEditingTeam(null);
    } else {
      if (validateForm(newTeam)) {
        formData.append("role_id", newTeam.role_id);
        formData.append("team_name", newTeam.team_name);
        formData.append("sponsor_id", newTeam.sponsor_id);
        formData.append("competition_id", newTeam.competition_id);
        formData.append("remark", newTeam.remark);
        formData.append("team_color", newTeam.team_color);

        if (newTeam.team_icon_url instanceof File) {
          formData.append("team_icon_url", newTeam.team_icon_url || null);
        }

        // Logging FormData content
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }

        dispatch(createNewTeam(formData));
        setNewTeam({
          role_id: null,
          team_name: null,
          sponsor_id: null,
          competition_id: null,
          remark: null,
          team_icon_url: null,
          team_color: null,
        });
        setShowModal(false);
      }
    }
  };

  const handleUndo = () => {
    setEditingTeam(null);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setNewTeam({
      role_id: null,
      team_name: null,
      sponsor_id: null,
      competition_id: null,
      remark: null,
      team_icon_url: null,
      team_color: null,
    });
  };

  useEffect(() => {
    if (loading) {
      console.log("Loading teams...");
    }
    if (error) {
      console.error("Error fetching teams:", error);
    }
    if (teams.length > 0) {
      console.log("Fetched teams:", teams);
    }
    if (loadingRoles) {
      console.log("Loading roles...");
    }
    if (errorRoles) {
      console.error("Error fetching roles:", errorRoles);
    }
    if (roles.length > 0) {
      console.log("Fetched roles:", roles);
    }
    if (loadingSponsors) {
      console.log("Loading sponsors...");
    }
    if (errorSponsors) {
      console.error("Error fetching sponsors:", errorSponsors);
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
    if (loadingEvents) {
      console.log("Loading events...");
    }
    if (errorEvents) {
      console.log("Error fetching events:", errorEvents);
    }
    if (events.length > 0) {
      console.log("Fetched events:", events);
    }
  }, [
    loading,
    error,
    teams,
    roles,
    loadingRoles,
    errorRoles,
    sponsors,
    loadingSponsors,
    errorSponsors,
    competitions,
    loadingCompetitions,
    errorCompetitions,
    loadingEvents,
    errorEvents,
    events,
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

  if (loading) return <p>Loading...</p>;
  // if (error)
  //   return (
  //     <p className="error-message">
  //       {showError && <ErrorModal message={error} onClose={handleCloseModal} />}
  //     </p>
  //   );
  if (loadingRoles) return <p>Loading...</p>;
  if (errorRoles) return <p className="error-message">{errorRoles}</p>;
  if (loadingSponsors) return <p>Loading...</p>;
  if (errorSponsors) return <p className="error-message">{errorSponsors}</p>;
  if (loadingCompetitions) return <p>Loading Competitions...</p>;
  if (errorCompetitions)
    return <p className="error-message">{errorCompetitions}</p>;
  if (loadingEvents) return <p>Loading Events...</p>;
  if (errorEvents) return <p className="error-message">{errorEvents}</p>;

  return (
    <div className="team-list overflow-auto">
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
        Create New Team
      </button>
      <div className="table-wrapper max-h-80 overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="whitespace-nowrap sticky top-0 z-30 tableHeadEditDelete  ">
            <tr>
              {/* <th className="px-4 py-2 whitespace-nowrap sticky top-0 left-0 z-20 tableHeadEditDelete">
                Team ID
              </th> */}
              <th className="px-4 py-2 whitespace-nowrap">Team Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Team Role</th>
              <th className="px-4 py-2 whitespace-nowrap">Sponsor Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Competition Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Event Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Remark</th>
              <th className="px-4 py-2 whitespace-nowrap">Team Icon</th>
              <th className="px-4 py-2 whitespace-nowrap">Team Color</th>
              <th className="px-4 py-2 whitespace-nowrap sticky top-0 right-0 z-20 tableHeadEditDelete">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team.team_id}>
                {/* <td className="px-4 py-2 whitespace-nowrap sticky left-0 tableHeadEditDelete">
                  {team.team_id}
                </td> */}

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingTeam && editingTeam.team_id === team.team_id ? (
                    <EditableSelectInput
                      name="team_name"
                      options={teams.map((team) => ({
                        value: team.team_name, // Actual value (team_name)
                        label: team.team_name, // Display value (team.team_name)
                      }))}
                      value={editingTeam.team_name}
                      onChange={handleInputChange}
                      editable={true} // Allows typin or selection from dropdown
                      // error={errors.team_name}
                      placeholder="Select or Enter Team Name"
                      id="team_name"
                    />
                  ) : (
                    team.team_name
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingTeam && editingTeam.team_id === team.team_id ? (
                    <EditableSelectInput
                      name="role_id"
                      options={roles.map((role) => ({
                        value: role.role_id, // Actual value (role_id)
                        label: role.role_name, // Display value (role.role_name)
                      }))}
                      value={editingTeam.role_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errors.role_id}
                      placeholder="Select Team Role"
                      id="role_id"
                    />
                  ) : (
                    // roles.role_name
                    // Display role name based on role_id when not in edit mode
                    roles.find((role) => role.role_id === team.role_id)
                      ?.role_name || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingTeam && editingTeam.team_id === team.team_id ? (
                    <EditableSelectInput
                      name="sponsor_id"
                      options={sponsors.map((sponsor) => ({
                        value: sponsor.sponsor_id, // Actual value (sponsor_id)
                        label: sponsor.sponsor_name, // Display value (sponsor.sponsor_name)
                      }))}
                      value={editingTeam.sponsor_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errors.sponsor_id}
                      placeholder="Select Sponsor Name"
                      id="sponsor_id"
                    />
                  ) : (
                    // roles.role_name
                    // Display sponsor name based on sponsor_id when not in edit mode
                    sponsors.find(
                      (sponsor) => sponsor.sponsor_id === team.sponsor_id
                    )?.sponsor_name || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingTeam && editingTeam.team_id === team.team_id ? (
                    <EditableSelectInput
                      name="competition_id"
                      options={competitions.map((competition) => ({
                        value: competition.competition_id,
                        label: competition.competition_name,
                      }))}
                      value={editingTeam.competition_id}
                      onChange={handleInputChange}
                      editable={true} // Change to true to allow selection from dropdown
                      placeholder="Select Competition Name"
                      id="competition_id"
                      renderOption={handleMouseEnter} // Pass the mouse enter handler
                    />
                  ) : (
                    competitions.find(
                      (competition) =>
                        competition.competition_id === team.competition_id
                    )?.competition_name || ""
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {
                    // Display event name based on hovered competition only if in editing mode
                    editingTeam && editingTeam.team_id === team.team_id
                      ? getEventName(
                          hoveredCompetitionId || team.competition_id
                        )
                      : getEventName(team.competition_id) // Static event name when not editing
                  }
                </td>

                {/* <td className="px-4 py-2 whitespace-nowrap">
                  {editingTeam && editingTeam.team_id === team.team_id ? (
                    <EditableSelectInput
                      name="competition_id"
                      options={competitions.map((competition) => ({
                        value: competition.competition_id, // Actual value (competition_id)
                        label: competition.competition_name, // Display value (competition.competition_name)
                      }))}
                      value={editingTeam.competition_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errors.competition_id}
                      placeholder="Select Competition Name"
                      id="competition_id"
                    />
                  ) : (
                    // competitions.competition_name
                    // Display competition name based on competition_id when not in edit mode
                    competitions.find(
                      (competition) =>
                        competition.competition_id === team.competition_id
                    )?.competition_name || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
  {editingTeam && editingTeam.team_id === team.team_id ? (
    // <EditableSelectInput
    //   name="competition_id"
    //   options={competitions.map((competition) => ({
    //     value: competition.competition_id, // Actual value (competition_id)
    //     label: competition.competition_name, // Display value (competition.competition_name)
    //   }))}
    //   value={editingTeam.competition_id}
    //   onChange={handleInputChange}
    //   editable={false} // Allows selection from dropdown
    //   placeholder="Select Competition Name"
    //   id="competition_id"
    // />
    competitions.find(
      (competition) =>
        competition.competition_id === team.competition_id
    )?.event_id && 
    // Then use the event_id to find the corresponding event_name in the events array
    events.find(
      (event) =>
        event.event_id === 
        competitions.find(
          (competition) =>
            competition.competition_id === team.competition_id
        )?.event_id
    )?.event_name || ""
  ) : (
    // Find the competition by competition_id
    competitions.find(
      (competition) =>
        competition.competition_id === team.competition_id
    )?.event_id && 
    // Then use the event_id to find the corresponding event_name in the events array
    events.find(
      (event) =>
        event.event_id === 
        competitions.find(
          (competition) =>
            competition.competition_id === team.competition_id
        )?.event_id
    )?.event_name || ""
  )}
                </td> */}

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingTeam && editingTeam.team_id === team.team_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="remark"
                        value={editingTeam.remark || ""}
                        onChange={handleInputChange}
                        placeholder="Remark"
                      />
                    </div>
                  ) : (
                    team.remark
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingTeam && editingTeam.team_id === team.team_id ? (
                    <>
                      {/* Check if the team icon is a file (selected by the user) */}
                      <div className="flex items-center space-x-4">
                        {editingTeam.team_icon_url instanceof File ? (
                          <img
                            src={URL.createObjectURL(editingTeam.team_icon_url)}
                            alt="Team Icon"
                            width="50"
                            height="50"
                          />
                        ) : editingTeam.team_icon_url ? (
                          /* If the team icon is a URL (from the database) */
                          <img
                            // src={`http://localhost:5000${editingTeam.team_icon_url}`} // Ensure the backend URL is correctly prefixed
                            src={`${process.env.REACT_APP_BACKEND_URL}${editingTeam.team_icon_url}`} // Use environment variable
                            alt="Team Icon"
                            width="50"
                            height="50"
                          />
                        ) : (
                          <p>No Team Icon</p>
                        )}
                        <input
                          type="file"
                          name="team_icon_url"
                          accept="image/*" // Accept only image files
                          onChange={handleTeamIconChange}
                        />
                      </div>
                    </>
                  ) : /* Display team icon from the team object if available */
                  team.team_icon_url ? (
                    <img
                      // src={`http://localhost:5000${team.team_icon_url}`} // Prefixing the URL with backend address
                      src={`${process.env.REACT_APP_BACKEND_URL}${team.team_icon_url}`} // Use environment variable
                      alt="Team Icon"
                      width="50"
                      height="50"
                    />
                  ) : (
                    <p>No Team Icon</p>
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingTeam && editingTeam.team_id === team.team_id ? (
                    <>
                      {/* Team Color Input for Editing */}
                      <div className="flex items-center space-x-4">
                        <input
                          type="color"
                          name="team_color"
                          value={editingTeam.team_color || "#ffffff"} // Display current color or default to white
                          onChange={handleTeamColorChange} // Handle color change
                        />

                        {/* Preview of Selected Team Color */}
                        {editingTeam.team_color ? (
                          <div
                            style={{
                              backgroundColor: editingTeam.team_color,
                              width: "50px",
                              height: "50px",
                              border: "1px solid #000",
                            }}
                          ></div>
                        ) : (
                          <p>No Team Color</p>
                        )}
                      </div>
                    </>
                  ) : /* Display current team color in a preview */
                  team.team_color ? (
                    <div
                      style={{
                        backgroundColor: team.team_color,
                        width: "50px",
                        height: "50px",
                        border: "1px solid #000",
                      }}
                    ></div>
                  ) : (
                    <p>No Team Color</p>
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap sticky right-0 tableHeadEditDelete">
                  {editingTeam && editingTeam.team_id === team.team_id ? (
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
                        onClick={() => handleEdit(team)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 my-1 rounded"
                        onClick={() => handleDelete(team.team_id)}
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
            <h2 className="text-2xl font-semibold mb-4">Register New Team</h2>
            <form className="grid grid-cols-4 gap-4">
              <EditableSelectInput
                label="Team Name"
                name="team_name"
                options={teams.map((team) => ({
                  value: team.team_name, // Actual value (team_name)
                  label: team.team_name, // Display value (team.team_name)
                }))}
                value={newTeam.team_name}
                onChange={handleInputChange}
                editable={true} // Allows selection from dropdown
                error={errors.team_name}
                showRequired={true}
                placeholder="Select or Enter Team Name"
                id="team_name"
              />

              <EditableSelectInput
                label="Team Role"
                name="role_id"
                options={roles.map((role) => ({
                  value: role.role_id, // Actual value (role_id)
                  label: role.role_name, // Display value (role.role_name)
                }))}
                value={newTeam.role_id}
                onChange={handleInputChange}
                editable={false} // Allows selection from dropdown
                error={errors.role_id}
                // showRequired={true}
                placeholder="Select Team Role"
                id="role_id"
              />

              <EditableSelectInput
                label="Sponsor Name"
                name="sponsor_id"
                options={sponsors.map((sponsor) => ({
                  value: sponsor.sponsor_id, // Actual value (sponsor_id)
                  label: sponsor.sponsor_name, // Display value (sponsor.sponsor_name)
                }))}
                value={newTeam.sponsor_id}
                onChange={handleInputChange}
                editable={false} // Allows selection from dropdown
                error={errors.sponsor_id}
                // showRequired={true}
                placeholder="Select Sponsor Name"
                id="sponsor_id"
              />

              <EditableSelectInput
                label="Competition Name"
                name="competition_id"
                options={competitions.map((competition) => ({
                  value: competition.competition_id, // Actual value (competition_id)
                  label: competition.competition_name, // Display value (competition.competition_name)
                }))}
                value={newTeam.competition_id}
                onChange={handleInputChange}
                editable={false} // Allow selection from dropdown in create mode
                error={errors.competition_id}
                placeholder="Select Competition Name"
                id="competition_id"
                renderOption={handleMouseEnter} // Pass the mouse enter handler

                // onMouseEnter={(competitionId) =>
                //   setHoveredCompetitionId(competitionId)
                // } // Update hovered competition
                // onMouseLeave={() => setHoveredCompetitionId(null)} // Clear hovered competition
              />

              <div className="input-group row-span-3">
                <label htmlFor="competition_name">Event Name</label>
                <div
                  style={{
                    width: "100%",
                    padding: "0.64rem",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                    outline: "none", // Add this for focus state
                    borderColor: hoveredCompetitionId ? "#d1644d" : "#ccc", // Change border color on hover
                    boxShadow: hoveredCompetitionId
                      ? "0 0 5px rgba(145, 64, 47, 0.5)"
                      : "none", // Change box-shadow on hover
                  }}
                  onFocus={() =>
                    setHoveredCompetitionId(newTeam.competition_id)
                  } // To handle focus
                  onBlur={() => setHoveredCompetitionId(null)} // To clear on blur
                >
                  {
                    // Display event name based on hovered competition only if in create mode
                    newTeam && newTeam.team_id === teams.team_id
                      ? getEventName(
                          hoveredCompetitionId || newTeam.competition_id
                        )
                      : getEventName(newTeam.competition_id) // Static event name when not editing
                  }
                </div>
              </div>

              <div className="input-group row-span-3">
                <label htmlFor="remark">Remark</label>
                <textarea
                  name="remark"
                  value={newTeam.remark || ""}
                  onChange={handleInputChange}
                  placeholder="Remark"
                  className="w-full p-2 mb-4 border rounded"
                />
              </div>

              <div className="input-group row-span-3">
                <label htmlFor="profile_picture_url">Team Icon</label>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    name="team_icon_url"
                    accept="image/*" // Accept only image files
                    onChange={handleTeamIconChange}
                  />

                  {newTeam.team_icon_url && (
                    <img
                      src={URL.createObjectURL(newTeam.team_icon_url)}
                      alt="Team Icon"
                      width="50"
                      height="50"
                    />
                  )}
                </div>
              </div>

              {/* Team Color Input */}
              <div className="input-group row-span-3">
                <label htmlFor="team_color">Team Color</label>
                <div className="flex items-center space-x-4">
                  <input
                    type="color"
                    name="team_color"
                    id="team_color"
                    value={newTeam.team_color} // Display the current color value
                    onChange={handleTeamColorChange} // Handle color change
                  />
                  {newTeam.team_color && (
                    <div
                      style={{
                        backgroundColor: newTeam.team_color,
                        width: "50px",
                        height: "50px",
                        border: "1px solid #000",
                      }}
                    ></div>
                  )}
                </div>
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

export default TeamList;
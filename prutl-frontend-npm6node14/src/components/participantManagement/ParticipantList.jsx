// prutl-frontend-npm6node14/src/components/participantManagement/ParticipantList.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllParticipants,
  createNewParticipant,
  updateParticipant,
  deleteParticipant,
} from "../../redux/slices/participantSlice.js";
import EditableSelectInput from "../common/EditableSelectInput .jsx";
import { getAllEvents } from "../../redux/slices/eventSlice.js";
import { getAllUsers } from "../../redux/slices/userSlice.js";
import { getAllCompetitions } from "../../redux/slices/competitionSlice.js";
import { getAllOrganizations } from "../../redux/slices/organizationSlice.js";
import ErrorModal from "../common/ErrorModal.jsx";
import { getAllUserGroups } from "../../redux/slices/userGroupSlice.js";

const ParticipantList = () => {
  const dispatch = useDispatch();
  const { participants, loading, error } = useSelector(
    (state) => state.participants
  );
  const { events, loadingEvents, errorEvents } = useSelector(
    (state) => state.events
  );
  const { users, loadingUsers, errorUsers } = useSelector(
    (state) => state.users
  );
  const { organizations, loadingOrganizations, errorOrganizations } =
    useSelector((state) => state.organizations);
  const { competitions, loadingCompetitions, errorCompetitions } = useSelector(
    (state) => state.competitions
  );
  const { userGroups, loadingUserGroups, errorUserGroups } = useSelector(
    (state) => state.userGroups
  );

  const [editingParticipant, setEditingParticipant] = useState(null);
  const [newParticipant, setNewParticipant] = useState({
    user_id: "",
    usergroup_id: "",
    event_id: "",
    competition_id: "",
    org_id: "",
    remark: "",
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    dispatch(getAllParticipants());
    // Dispatch the action to fetch events when the component mounts
    dispatch(getAllEvents());
    // Dispatch the action to fetch events when the component mounts
    dispatch(getAllUsers());
    // Dispatch the action to fetch events when the component mounts
    dispatch(getAllCompetitions());
    // Dispatch the action to fetch events when the component mounts
    dispatch(getAllOrganizations());
    // Dispatch the action to fetch events when the component mounts
    dispatch(getAllUserGroups());
  }, [dispatch]);

  const handleDelete = (participantId) => {
    dispatch(deleteParticipant(participantId));
  };

  const handleEdit = (participant) => {
    setEditingParticipant({ ...participant });
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   if (editingParticipant) {
  //     setEditingParticipant({ ...editingParticipant, [name]: value });
  //   } else {
  //     setNewParticipant({ ...newParticipant, [name]: value });
  //   }
  // };
  // Filter users based on selected usergroup_id
  const filterUsersByGroup = (usergroupId) => {
    const filtered = users.filter((user) => user.usergroup_id === usergroupId);
    setFilteredUsers(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "usergroup_id") {
      // Filter users when usergroup_id is selected
      filterUsersByGroup(value);
    }

    if (editingParticipant) {
      setEditingParticipant({ ...editingParticipant, [name]: value });
    } else {
      setNewParticipant({ ...newParticipant, [name]: value });
    }
  };

  const validateForm = (formData) => {
    let newErrors = {};
    if (!formData.user_id) newErrors.user_id = "User Name is required";
    // if (!formData.competition_id) newErrors.competition_id = "Competition Name is required";
    // if (!formData.org_id) newErrors.org_id = "Organization Name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (editingParticipant) {
      if (editingParticipant.participant_id && editingParticipant) {
        dispatch(
          updateParticipant({
            participantId: editingParticipant.participant_id,
            data: editingParticipant,
          })
        );
      } else {
        console.error(
          "Error: participantId or editingParticipant is undefined"
        );
      }
      setEditingParticipant(null);
    } else {
      if (validateForm(newParticipant)) {
        dispatch(createNewParticipant(newParticipant));
        setNewParticipant({
          user_id: "",
          usergroup_id: "",
          event_id: "",
          competition_id: "",
          org_id: "",
          remark: "",
        });
        setShowModal(false);
      }
    }
  };

  const handleUndo = () => {
    setEditingParticipant(null);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setNewParticipant({
      user_id: "",
      usergroup_id: "",
      event_id: "",
      competition_id: "",
      org_id: "",
      remark: "",
    });
  };

  useEffect(() => {
    if (loading) {
      console.log("Loading participants...");
    }
    if (error) {
      console.error("Error fetching participants:", error);
    }
    if (participants.length > 0) {
      console.log("Fetched participants:", participants);
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
      console.log("Error fetching users:", errorUsers);
    }
    if (users.length > 0) {
      console.log("Fetched users:", users);
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
    if (loadingUserGroups) {
      console.log("Loading usergroups...");
    }
    if (errorUserGroups) {
      console.log("Error fetching usergroups:", errorUserGroups);
    }
    if (userGroups.length > 0) {
      console.log("Fetched usergroups:", userGroups);
    }
  }, [
    loading,
    error,
    participants,
    loadingEvents,
    errorEvents,
    events,
    users,
    loadingUsers,
    errorUsers,
    organizations,
    loadingOrganizations,
    errorOrganizations,
    competitions,
    loadingCompetitions,
    errorCompetitions,
    userGroups,
    loadingUserGroups,
    errorUserGroups,
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
  if (error)
    return (
      <p className="error-message">
        {showError && <ErrorModal message={error} onClose={handleCloseModal} />}
      </p>
    );
  if (loadingEvents) return <p>Loading Events...</p>;
  if (errorEvents) return <p className="error-message">{errorEvents}</p>;
  if (loadingUsers) return <p>Loading Users...</p>;
  if (errorUsers) return <p className="error-message">{errorUsers}</p>;
  if (loadingOrganizations) return <p>Loading Organizations...</p>;
  if (errorOrganizations)
    return <p className="error-message">{errorOrganizations}</p>;
  if (loadingCompetitions) return <p>Loading Competitions...</p>;
  if (errorCompetitions)
    return <p className="error-message">{errorCompetitions}</p>;
  if (loadingUserGroups) return <p>Loading UserGroups...</p>;
  if (errorUserGroups)
    return <p className="error-message">{errorUserGroups}</p>;
  
  return (
    <div className="participant-list overflow-auto">
      <button
        className="bg-blue-500 text-white px-4 py-2 m-2 rounded mb-4"
        onClick={toggleModal}
      >
        Create New Participant
      </button>
      <div className="table-wrapper max-h-80 overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="whitespace-nowrap sticky top-0 z-30 tableHeadEditDelete  ">
            <tr>
              {/* <th className="px-4 py-2 whitespace-nowrap sticky top-0 left-0 z-20 tableHeadEditDelete">
      Participant ID</th> */}
              <th className="px-4 py-2 whitespace-nowrap">User Group Name</th>
              <th className="px-4 py-2 whitespace-nowrap">User Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Competition Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Organization Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Event Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Remark</th>
              <th className="px-4 py-2 whitespace-nowrap sticky top-0 right-0 z-20 tableHeadEditDelete">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participant) => (
              <tr key={participant.participant_id}>
                {/* <td className="px-4 py-2 whitespace-nowrap sticky left-0 tableHeadEditDelete">
{participant.participant_id}</td> */}

                {/* <td className="px-4 py-2 whitespace-nowrap">
                {editingParticipant && editingParticipant.participant_id === participant.participant_id ? (
                  <div className="input-group">
                    <input
                      type="text"
                      name="user_id"
                      value={editingParticipant.user_id || ""}
                      onChange={handleInputChange}
                      placeholder="User ID"
                    />
                  </div>
                ) : (
                  participant.user_id
                )}
              </td> */}

              
               {/* User Group Selection */}
               <td className="px-4 py-2 whitespace-nowrap">
                  {editingParticipant &&
                  editingParticipant.participant_id ===
                    participant.participant_id ? (
               <EditableSelectInput
                name="usergroup_id"
                options={userGroups.map((group) => ({
                  value: group.usergroup_id,
                  label: group.group_name,
                }))}
                value={editingParticipant.usergroup_id}
                onChange={handleInputChange}
                editable={false} // Allows selection from dropdown
                error={errors.usergroup_id}
                // showRequired={true}
                placeholder="Select User Group"
                id="usergroup_id"
              />
            ) : (
              // participant.usergroup_id
              // Display user name based on user_id when not in edit mode
              userGroups.find((group) => group.usergroup_id === participant.usergroup_id)
                ?.group_name || ""
            )}
          </td>

              {/* User Selection - Filtered based on selected usergroup_id */}
                <td className="px-4 py-2 whitespace-nowrap">
                  {editingParticipant &&
                  editingParticipant.participant_id ===
                    participant.participant_id ? (
                    <EditableSelectInput
                      name="user_id"
                      options={filteredUsers.map((user) => ({
                        value: user.user_id, // Actual value (user_id)
                        label: user.name, // Display value (user.name)
                      }))}
                      value={editingParticipant.user_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errors.user_id}
                      placeholder="Select User Name"
                      id="user_id"
                    />
                  ) : (
                    // participant.user_id
                    // Display user name based on user_id when not in edit mode
                    users.find((user) => user.user_id === participant.user_id)
                      ?.name || ""
                  )}
                </td>
                {/* <td className="px-4 py-2 whitespace-nowrap">
                  {editingParticipant &&
                  editingParticipant.participant_id ===
                    participant.participant_id ? (
                    <EditableSelectInput
                      name="user_id"
                      options={users.map((user) => ({
                        value: user.user_id, // Actual value (user_id)
                        label: user.name, // Display value (user.name)
                      }))}
                      value={editingParticipant.user_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errors.user_id}
                      placeholder="Select User Name"
                      id="user_id"
                    />
                  ) : (
                    // participant.user_id
                    // Display user name based on user_id when not in edit mode
                    users.find((user) => user.user_id === participant.user_id)
                      ?.name || ""
                  )}
                </td> */}

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingParticipant &&
                  editingParticipant.participant_id ===
                    participant.participant_id ? (
                    <EditableSelectInput
                      name="competition_id"
                      options={competitions.map((competition) => ({
                        value: competition.competition_id, // Actual value (competition_id)
                        label: competition.competition_name, // Display value (competition.competition_name)
                      }))}
                      value={editingParticipant.competition_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errors.competition_id}
                      placeholder="Select Competition Name"
                      id="competition_id"
                    />
                  ) : (
                    // participant.competition_name
                    // Display user name based on user_id when not in edit mode
                    competitions.find(
                      (competition) =>
                        competition.competition_id ===
                        participant.competition_id
                    )?.competition_name || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingParticipant &&
                  editingParticipant.participant_id ===
                    participant.participant_id ? (
                    <EditableSelectInput
                      name="org_id"
                      options={organizations.map((organization) => ({
                        value: organization.org_id, // Actual value (org_id)
                        label: organization.org_name, // Display value (organization.org_name)
                      }))}
                      value={editingParticipant.org_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errors.org_id}
                      placeholder="Select Organization Name"
                      id="org_id"
                    />
                  ) : (
                    // participant.org_id
                    // Display user name based on user_id when not in edit mode
                    organizations.find(
                      (organization) =>
                        organization.org_id === participant.org_id
                    )?.org_name || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingParticipant &&
                  editingParticipant.participant_id ===
                    participant.participant_id ? (
                    <EditableSelectInput
                      name="event_id"
                      options={events.map((event) => ({
                        value: event.event_id, // Actual value (event_id)
                        label: event.event_name, // Display value (event.event_name)
                      }))}
                      value={editingParticipant.event_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errors.event_id}
                      placeholder="Select Event Name"
                      id="event_id"
                    />
                  ) : (
                    // event.event_name
                    // Display event name based on event_name when not in edit mode
                    events.find(
                      (event) => event.event_id === participant.event_id
                    )?.event_name || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingParticipant &&
                  editingParticipant.participant_id ===
                    participant.participant_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="remark"
                        value={editingParticipant.remark || ""}
                        onChange={handleInputChange}
                        placeholder="Remark"
                      />
                    </div>
                  ) : (
                    participant.remark
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap sticky right-0 tableHeadEditDelete">
                  {editingParticipant &&
                  editingParticipant.participant_id ===
                    participant.participant_id ? (
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
                        onClick={() => handleEdit(participant)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 my-1 rounded"
                        onClick={() => handleDelete(participant.participant_id)}
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
              Register New Participant
            </h2>
            <form className="grid grid-cols-4 gap-4">

               {/* User Group Selection */}
               <EditableSelectInput
                label="User Group"
                name="usergroup_id"
                options={userGroups.map((group) => ({
                  value: group.usergroup_id,
                  label: group.group_name,
                }))}
                value={newParticipant.usergroup_id}
                onChange={handleInputChange}
                editable={false} // Allows selection from dropdown
                error={errors.usergroup_id}
                showRequired={true}
                placeholder="Select User Group"
                id="usergroup_id"
              />

              {/* User Selection - Filtered based on selected usergroup_id */}
              <EditableSelectInput
                label="User Name"
                name="user_id"
                options={filteredUsers.map((user) => ({
                  value: user.user_id,
                  label: user.name,
                }))}
                value={newParticipant.user_id}
                onChange={handleInputChange}
                editable={false} // Allows selection from dropdown
                error={errors.user_id}
                showRequired={true}
                placeholder="Select User Name"
                id="user_id"
              />

              {/* <EditableSelectInput
                label="User Name"
                name="user_id"
                options={users.map((user) => ({
                  value: user.user_id, // Actual value (user_id)
                  label: user.name, // Display value (user.name)
                }))}
                value={newParticipant.user_id}
                onChange={handleInputChange}
                editable={false} // Allows selection from dropdown
                error={errors.user_id}
                showRequired={true}
                placeholder="Select User Name"
                id="user_id"
              /> */}

              <EditableSelectInput
                label="Competition Name"
                name="competition_id"
                options={competitions.map((competition) => ({
                  value: competition.competition_id, // Actual value (competition_id)
                  label: competition.competition_name, // Display value (competition.competition_name)
                }))}
                value={newParticipant.competition_id}
                onChange={handleInputChange}
                editable={false} // Allows selection from dropdown
                error={errors.competition_id}
                showRequired={true}
                placeholder="Select Competition Name"
                id="competition_id"
              />

              <EditableSelectInput
                label="Organization Name"
                name="org_id"
                options={organizations.map((organization) => ({
                  value: organization.org_id, // Actual value (org_id)
                  label: organization.org_name, // Display value (organization.org_name)
                }))}
                value={newParticipant.org_id}
                onChange={handleInputChange}
                editable={false} // Allows selection from dropdown
                // error={errors.org_id}
                placeholder="Select Organization Name"
                id="org_id"
              />

              <EditableSelectInput
                label="Event Name"
                name="event_id"
                options={events.map((event) => ({
                  value: event.event_id, // Actual value (event_id)
                  label: event.event_name, // Display value (event.event_name)
                }))}
                value={newParticipant.event_id}
                onChange={handleInputChange}
                editable={false} // Allows selection from dropdown
                // error={errors.event_id}
                placeholder="Select Event Name"
                id="event_id"
              />

              <div className="input-group row-span-3">
                <label htmlFor="remark">Remark</label>
                <textarea
                  name="remark"
                  value={newParticipant.remark || ""}
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

export default ParticipantList;

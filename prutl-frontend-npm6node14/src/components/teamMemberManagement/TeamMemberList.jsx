// prutl-frontend-npm6node14/src/components/teamMemberManagement/TeamMemberList.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTeamMembers,
  createNewTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "../../redux/slices/teamMemberSlice.js";
// import CustomSelect from "../common/CustomDropdown.jsx";
import ErrorModal from "../common/ErrorModal.jsx";
import { getAllUsers } from "../../redux/slices/userSlice.js";
import { getAllRoles } from "../../redux/slices/roleSlice.js";
import { getAllTeams } from "../../redux/slices/teamSlice.js";
import EditableSelectInput from "../common/EditableSelectInput .jsx";

const TeamMemberList = () => {
  const dispatch = useDispatch();
  const { teamMembers, loading, error } = useSelector(
    (state) => state.teamMembers
  );
  const { roles, loadingRoles, errorRoles } = useSelector(
    (state) => state.roles
  );
  const { teams, loadingTeams, errorTeams } = useSelector(
    (state) => state.teams
  );
  const { users, loadingUsers, errorUsers } = useSelector(
    (state) => state.users
  );
  const [editingMember, setEditingMember] = useState(null);
  const [newMember, setNewMember] = useState({
    user_id: "",
    team_id: "",
    role_id: "",
    remark: "",
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [hoveredUserId, setHoveredUserId] = useState(null);

  // const handleMouseEnter = (user) => {
  //   setHoveredUserId(user.value); // Update the hovered user ID
  // };

const getTeamMemberProfilePictureUrl = (userId) =>{
  const user = users.find((e) =>e.user_id === userId);
  if(user){
   return user ? 
      <img
      src={`${process.env.REACT_APP_BACKEND_URL}${user.profile_picture_url}`} // Prefix the URL with backend address
      alt="Profile"
      width="50"
      height="50"
    />
   : "";
  }
  return "";
}

  useEffect(() => {
    dispatch(getAllTeamMembers());
    dispatch(getAllRoles());
    dispatch(getAllUsers());
    dispatch(getAllTeams());
  }, [dispatch]);

  const handleDelete = (teamMemberId) => {
    dispatch(deleteTeamMember(teamMemberId));
  };

  const handleEdit = (member) => {
    setEditingMember({ ...member });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingMember) {
      setEditingMember({ ...editingMember, [name]: value });
    } else {
      setNewMember({ ...newMember, [name]: value });
    }
  };

  const validateForm = (formData) => {
    let newErrors = {};
    if (!formData.user_id) {
      newErrors.user_id = "Select from options";
    }
    if (!formData.team_id) {
      newErrors.team_id = "Select from options";
    }
    if (!formData.role_id) {
      newErrors.role_id = "Select from options";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (editingMember) {
      if (editingMember.team_member_id) {
        dispatch(
          updateTeamMember({
            teamMemberId: editingMember.team_member_id,
            data: editingMember,
          })
        );
      } else {
        console.error("Error: teamMemberId or editingMember is undefined");
      }
      setEditingMember(null);
    } else {
      if (validateForm(newMember)) {
        dispatch(createNewTeamMember(newMember));
        setNewMember({
          user_id: "",
          team_id: "",
          role_id: "",
          remark: "",
        });
        setShowModal(false);
      }
    }
  };

  const handleUndo = () => {
    setEditingMember(null);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setNewMember({
      user_id: "",
      team_id: "",
      role_id: "",
      remark: "",
    });
  };

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  const handleCloseModal = () => {
    setShowError(false);
  };

  if (loading) return <p>Loading Team Members...</p>;
  // if (error)
  //   return (
  //     <p className="error-message">
  //       {showError && <ErrorModal message={error} onClose={handleCloseModal} />}
  //     </p>
  //   );
  if (loadingRoles) return <p>Loading roles...</p>;
  if (errorRoles) return <p className="error-message">{errorRoles}</p>;

  if (loadingTeams) return <p>Loading teams...</p>;
  if (errorTeams) return <p className="error-message">{errorTeams}</p>;

  if (loadingUsers) return <p>Loading users...</p>;
  if (errorUsers) return <p className="error-message">{errorUsers}</p>;

  return (
    <div className="team-member-list overflow-auto">
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
        Register New Team Member
      </button>
      <div className="table-wrapper max-h-80 overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="whitespace-nowrap sticky top-0 z-30 tableHeadEditDelete">
            <tr>
              {/* <th className="px-4 py-2 whitespace-nowrap sticky top-0 left-0 z-20 tableHeadEditDelete">
                Team Member ID
              </th> */}
              <th className="px-4 py-2 whitespace-nowrap">User Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Team Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Role Code</th>
              <th className="px-4 py-2 whitespace-nowrap">Remark</th>
              <th className="px-28 py-2 mx-28 whitespace-nowrap">
                Profile Image
              </th>
              <th className="px-4 py-2 whitespace-nowrap sticky top-0 right-0 z-20 tableHeadEditDelete">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((member) => (
              <tr key={member.team_member_id}>
                {/* <td className="px-4 py-2 whitespace-nowrap sticky left-0 tableHeadEditDelete z-10">
                  {member.team_member_id}
                </td> */}

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingMember &&
                  editingMember.team_member_id === member.team_member_id ? (
                    <EditableSelectInput
                      name="user_id"
                      options={users.map((user) => ({
                        value: user.user_id, // Actual value (user_id)
                        label: user.name, // Display value (user.name)
                      }))}
                      value={editingMember.user_id}
                      onChange={handleInputChange}
                      editable={false} // Allows both typing and selection from dropdown
                      error={errors.user_id}
                      placeholder="Select User Name"
                      id="user_id"
                    />
                  ) : (
                    // member.user_id
                    // Display user name based on user_id when not in edit mode
                    users.find((user) => user.user_id === member.user_id)
                      ?.name || "Unknown User"
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingMember &&
                  editingMember.team_member_id === member.team_member_id ? (
                    <EditableSelectInput
                      name="team_id"
                      options={teams.map((team) => ({
                        value: team.team_id, // Actual value (team_id)
                        label: team.team_name, // Display value (team.team_name)
                      }))}
                      value={editingMember.team_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      error={errors.team_id}
                      placeholder="Select Team Name"
                      id="team_id"
                    />
                  ) : (
                    // member.team_id
                    // Display user name based on user_id when not in edit mode
                    teams.find((team) => team.team_id === member.team_id)
                      ?.team_name || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingMember &&
                  editingMember.team_member_id === member.team_member_id ? (
                    <EditableSelectInput
                      name="role_id"
                      options={roles.map((role) => ({
                        value: role.role_id, // Actual value (role_id)
                        label: role.role_code, // Display value (roles.role_code)
                      }))}
                      value={editingMember.role_id}
                      onChange={handleInputChange}
                      editable={false} // Allows both typing and selection from dropdown
                      error={errors.role_id}
                      placeholder="Select Role Code"
                      // showRequired={true}
                      id="role_id"
                    />
                  ) : (
                    // member.role_id
                    // Display user name based on user_id when not in edit mode
                    roles.find((role) => role.role_id === member.role_id)
                      ?.role_code || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingMember &&
                  editingMember.team_member_id === member.team_member_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="remark"
                        value={editingMember.remark || ""}
                        onChange={handleInputChange}
                        placeholder="Remark"
                      />
                    </div>
                  ) : (
                    member.remark
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {
                    // Use `find` to get the user's profile picture from the `users` array based on `user_id`
                    (() => {
                      const foundUser = users.find(
                        (user) => user.user_id === member.user_id
                      );
                      return foundUser && foundUser.profile_picture_url ? (
                        <img
                          src={`${process.env.REACT_APP_BACKEND_URL}${foundUser.profile_picture_url}`} // Prefix the URL with backend address
                          alt="Profile"
                          width="50"
                          height="50"
                        />
                      ) : (
                        <p>No Profile Picture</p>
                      );
                    })()
                  }
                </td>

                {/* <td className="px-4 py-2 whitespace-nowrap">
                  {editingMember &&
                  editingMember.team_member_id === member.team_member_id ? (
                    <>
                      
                      <div className="flex items-center space-x-4">
                        {editingMember.profile_picture_url instanceof File ? (
                          <img
                            src={URL.createObjectURL(
                              editingMember.profile_picture_url
                            )}
                            alt="Profile"
                            width="50"
                            height="50"
                          />
                        ) : editingMember.profile_picture_url ? (
                          <img
                            src={`${process.env.REACT_APP_BACKEND_URL}${editingMember.profile_picture_url}`} // Use environment variable for backend URL
                            alt="Profile"
                            width="50"
                            height="50"
                          />
                        ) : (
                          <p>No Profile Picture</p>
                        )}
                        <input
                          type="file"
                          name="profile_picture"
                          accept="image/*" // Accept only image files
                          onChange={handleProfilePictureChange}
                        />
                      </div>
                    </>
                  ) :
                   (
                    // Use `find` to get the user's profile picture from the `users` array based on `user_id`
                    (() => {
                      const foundUser = users.find(
                        (user) => user.user_id === member.user_id
                      );
                      return foundUser && foundUser.profile_picture_url ? (
                        <img
                          src={`${process.env.REACT_APP_BACKEND_URL}${foundUser.profile_picture_url}`} // Prefix the URL with backend address
                          alt="Profile"
                          width="50"
                          height="50"
                        />
                      ) : (
                        <p>No Profile Picture</p>
                      );
                    })()
                  )}
                </td> */}

                <td className="px-4 py-2 whitespace-nowrap sticky right-0 tableHeadEditDelete">
                  {editingMember &&
                  editingMember.team_member_id === member.team_member_id ? (
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
                        onClick={() => handleEdit(member)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 my-1 rounded"
                        onClick={() => handleDelete(member.team_member_id)}
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
              Register New Team Member
            </h2>
            <form className="grid grid-cols-4 gap-4">
              <EditableSelectInput
                label="User Name"
                name="user_id"
                options={users.map((user) => ({
                  value: user.user_id, // Actual value (user_id)
                  label: user.name, // Display value (user.name)
                }))}
                value={newMember.user_id}
                onChange={handleInputChange}
                editable={false} // Allows selection from dropdown
                error={errors.user_id}
                placeholder="Select User Name"
                showRequired={true}
                id="user_id"
              />

              <EditableSelectInput
                label="Team Name"
                name="team_id"
                options={teams.map((team) => ({
                  value: team.team_id, // Actual value (team_id)
                  label: team.team_name, // Display value (team.team_name)
                }))}
                value={newMember.team_id}
                onChange={handleInputChange}
                editable={false} // Allows both typing and selection from dropdown
                error={errors.team_id}
                placeholder="Select Team Name"
                showRequired={true}
                id="team_id"
              />

              <EditableSelectInput
                label="Role Code"
                name="role_id"
                options={roles.map((role) => ({
                  value: role.role_id, // Actual value (role_id)
                  label: role.role_name, // Display value (role.role_name)
                }))}
                value={newMember.role_id}
                onChange={handleInputChange}
                editable={false} // Allows both typing and selection from dropdown
                error={errors.role_id}
                placeholder="Select Role Code"
                showRequired={true}
                id="role_id"
              />

              <div className="input-group row-span-3">
                <label htmlFor="remark">Remark</label>
                <textarea
                  name="remark"
                  value={newMember.remark || ""}
                  onChange={handleInputChange}
                  placeholder="Remark"
                  className="w-full p-2 mb-4 border rounded"
                />
              </div>
              <div className="input-group row-span-3">
                <label htmlFor="competition_name">Team Member Profile Picture</label>
                <div
                  style={{
                    width: "100%",
                    padding: "0.64rem",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                    outline: "none", // Add this for focus state
                    borderColor: hoveredUserId ? "#d1644d" : "#ccc", // Change border color on hover
                    boxShadow: hoveredUserId
                      ? "0 0 5px rgba(145, 64, 47, 0.5)"
                      : "none", // Change box-shadow on hover
                  }}
                  onFocus={() =>
                    setHoveredUserId(newMember.user_id)
                  } // To handle focus
                  onBlur={() => setHoveredUserId(null)} // To clear on blur
                >
                  {
                    // Display event name based on hovered competition only if in create mode
                    newMember && newMember.user_id === teamMembers.user_id
                      ? getTeamMemberProfilePictureUrl(
                          hoveredUserId || newMember.user_id
                        )
                      : getTeamMemberProfilePictureUrl(newMember.user_id) // Static event name when not editing
                  }
                </div>
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

export default TeamMemberList;

// // prutl-frontend-npm6node14/src/components/teamMemberManagement/TeamMemberList.jsx

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getAllTeamMembers,
//   createNewTeamMember,
//   updateTeamMember,
//   deleteTeamMember,
// } from "../../redux/slices/teamMemberSlice.js";
// // import CustomSelect from "../common/CustomDropdown.jsx";
// import ErrorModal from "../common/ErrorModal.jsx";
// import { getAllUsers } from "../../redux/slices/userSlice.js";
// import { getAllRoles } from "../../redux/slices/roleSlice.js";
// import { getAllTeams } from "../../redux/slices/teamSlice.js";
// import EditableSelectInput from "../common/EditableSelectInput .jsx";

// const TeamMemberList = () => {
//   const dispatch = useDispatch();
//   const { teamMembers, loading, error } = useSelector(
//     (state) => state.teamMembers
//   );
//   const { roles, loadingRoles, errorRoles } = useSelector(
//     (state) => state.roles
//   );
//   const { teams, loadingTeams, errorTeams } = useSelector(
//     (state) => state.teams
//   );
//   const { users, loadingUsers, errorUsers } = useSelector(
//     (state) => state.users
//   );
//   const [editingMember, setEditingMember] = useState(null);
//   const [newMember, setNewMember] = useState({
//     user_id: "",
//     team_id: "",
//     role_id: "",
//     remark: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [showModal, setShowModal] = useState(false);
//   const [showError, setShowError] = useState(false);

//   useEffect(() => {
//     dispatch(getAllTeamMembers());
//     dispatch(getAllRoles());
//     dispatch(getAllUsers());
//     dispatch(getAllTeams());
//   }, [dispatch]);

//   const handleDelete = (teamMemberId) => {
//     dispatch(deleteTeamMember(teamMemberId));
//   };

//   const handleEdit = (member) => {
//     setEditingMember({ ...member });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (editingMember) {
//       setEditingMember({ ...editingMember, [name]: value });
//     } else {
//       setNewMember({ ...newMember, [name]: value });
//     }
//   };

//   const validateForm = (formData) => {
//     let newErrors = {};
//     if (!formData.user_id) {
//       newErrors.user_id = "Select from options";
//     }
//     if (!formData.team_id) {
//       newErrors.team_id = "Select from options";
//     }
//     if (!formData.role_id) {
//       newErrors.role_id = "Select from options";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSave = () => {
//     if (editingMember) {
//       if (editingMember.team_member_id) {
//         dispatch(
//           updateTeamMember({
//             teamMemberId: editingMember.team_member_id,
//             data: editingMember,
//           })
//         );
//       } else {
//         console.error("Error: teamMemberId or editingMember is undefined");
//       }
//       setEditingMember(null);
//     } else {
//       if (validateForm(newMember)) {
//         dispatch(createNewTeamMember(newMember));
//         setNewMember({
//           user_id: "",
//           team_id: "",
//           role_id: "",
//           remark: "",
//         });
//         setShowModal(false);
//       }
//     }
//   };

//   const handleUndo = () => {
//     setEditingMember(null);
//   };

//   const toggleModal = () => {
//     setShowModal(!showModal);
//     setNewMember({
//       user_id: "",
//       team_id: "",
//       role_id: "",
//       remark: "",
//     });
//   };

//   useEffect(() => {
//     if (error) {
//       setShowError(true);
//     }
//   }, [error]);

//   const handleCloseModal = () => {
//     setShowError(false);
//   };

//   if (loading) return <p>Loading Team Members...</p>;
//   // if (error)
//   //   return (
//   //     <p className="error-message">
//   //       {showError && <ErrorModal message={error} onClose={handleCloseModal} />}
//   //     </p>
//   //   );
//   if (loadingRoles) return <p>Loading roles...</p>;
//   if (errorRoles) return <p className="error-message">{errorRoles}</p>;

//   if (loadingTeams) return <p>Loading teams...</p>;
//   if (errorTeams) return <p className="error-message">{errorTeams}</p>;

//   if (loadingUsers) return <p>Loading users...</p>;
//   if (errorUsers) return <p className="error-message">{errorUsers}</p>;

//   return (
//     <div className="team-member-list overflow-auto">
//        {error &&
//       <p className="error-message">
//         {showError && <ErrorModal message={error} onClose={handleCloseModal} />}
//       </p>
//      } 
//       <button
//         className="bg-blue-500 text-white px-4 py-2 m-2 rounded mb-4"
//         onClick={toggleModal}
//       >
//         Register New Team Member
//       </button>
//       <div className="table-wrapper max-h-80 overflow-y-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="whitespace-nowrap sticky top-0 z-30 tableHeadEditDelete">
//             <tr>
//               {/* <th className="px-4 py-2 whitespace-nowrap sticky top-0 left-0 z-20 tableHeadEditDelete">
//                 Team Member ID
//               </th> */}
//               <th className="px-4 py-2 whitespace-nowrap">User Name</th>
//               <th className="px-4 py-2 whitespace-nowrap">Team Name</th>
//               <th className="px-4 py-2 whitespace-nowrap">Role Code</th>
//               <th className="px-4 py-2 whitespace-nowrap">Remark</th>
//               <th className="px-4 py-2 whitespace-nowrap sticky top-0 right-0 z-20 tableHeadEditDelete">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {teamMembers.map((member) => (
//               <tr key={member.team_member_id}>
//                 {/* <td className="px-4 py-2 whitespace-nowrap sticky left-0 tableHeadEditDelete z-10">
//                   {member.team_member_id}
//                 </td> */}

//                 <td className="px-4 py-2 whitespace-nowrap">
//                   {editingMember &&
//                   editingMember.team_member_id === member.team_member_id ? (
//                     <EditableSelectInput
//                       name="user_id"
//                       options={users.map((user) => ({
//                         value: user.user_id, // Actual value (user_id)
//                         label: user.name, // Display value (user.name)
//                       }))}
//                       value={editingMember.user_id}
//                       onChange={handleInputChange}
//                       editable={false} // Allows both typing and selection from dropdown
//                       error={errors.user_id}
//                       placeholder="Select User Name"
//                       id="user_id"
//                     />
//                   ) : (
//                     // member.user_id
//                     // Display user name based on user_id when not in edit mode
//                     users.find((user) => user.user_id === member.user_id)
//                       ?.name || "Unknown User"
//                   )}
//                 </td>

//                 <td className="px-4 py-2 whitespace-nowrap">
//                   {editingMember &&
//                   editingMember.team_member_id === member.team_member_id ? (
//                     <EditableSelectInput
//                       name="team_id"
//                       options={teams.map((team) => ({
//                         value: team.team_id, // Actual value (team_id)
//                         label: team.team_name, // Display value (team.team_name)
//                       }))}
//                       value={editingMember.team_id}
//                       onChange={handleInputChange}
//                       editable={false} // Allows selection from dropdown
//                       error={errors.team_id}
//                       placeholder="Select Team Name"
//                       id="team_id"
//                     />
//                   ) : (
//                     // member.team_id
//                     // Display user name based on user_id when not in edit mode
//                     teams.find((team) => team.team_id === member.team_id)
//                       ?.team_name || ""
//                   )}
//                 </td>

//                 <td className="px-4 py-2 whitespace-nowrap">
//                   {editingMember &&
//                   editingMember.team_member_id === member.team_member_id ? (
//                     <EditableSelectInput
//                       name="role_id"
//                       options={roles.map((role) => ({
//                         value: role.role_id, // Actual value (role_id)
//                         label: role.role_code, // Display value (roles.role_code)
//                       }))}
//                       value={editingMember.role_id}
//                       onChange={handleInputChange}
//                       editable={false} // Allows both typing and selection from dropdown
//                       error={errors.role_id}
//                       placeholder="Select Role Code"
//                       // showRequired={true}
//                       id="role_id"
//                     />
//                   ) : (
//                     // member.role_id
//                     // Display user name based on user_id when not in edit mode
//                     roles.find((role) => role.role_id === member.role_id)
//                       ?.role_code || ""
//                   )}
//                 </td>

//                 <td className="px-4 py-2 whitespace-nowrap">
//                   {editingMember &&
//                   editingMember.team_member_id === member.team_member_id ? (
//                     <div className="input-group">
//                       <input
//                         type="text"
//                         name="remark"
//                         value={editingMember.remark || ""}
//                         onChange={handleInputChange}
//                         placeholder="Remark"
//                       />
//                     </div>
//                   ) : (
//                     member.remark
//                   )}
//                 </td>

//                 <td className="px-4 py-2 whitespace-nowrap sticky right-0 tableHeadEditDelete">
//                   {editingMember &&
//                   editingMember.team_member_id === member.team_member_id ? (
//                     <>
//                       <button
//                         className="bg-green-500 text-white px-4 py-1 mx-5 rounded"
//                         onClick={handleSave}
//                       >
//                         Save
//                       </button>
//                       <button
//                         className="bg-gray-500 text-white px-3 py-1 rounded"
//                         onClick={handleUndo}
//                       >
//                         Undo
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <button
//                         className="bg-blue-500 text-white px-5 py-1 mx-5 rounded"
//                         onClick={() => handleEdit(member)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="bg-red-500 text-white px-2 py-1 my-1 rounded"
//                         onClick={() => handleDelete(member.team_member_id)}
//                       >
//                         Delete
//                       </button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {showModal && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center mt-12 z-30">
//           <div className="registerCard px-6 py-1 rounded-lg shadow-lg w-full max-w-6xl">
//             <h2 className="text-2xl font-semibold mb-4">
//               Register New Team Member
//             </h2>
//             <form className="grid grid-cols-4 gap-4">
//               <EditableSelectInput
//                 label="User Name"
//                 name="user_id"
//                 options={users.map((user) => ({
//                   value: user.user_id, // Actual value (user_id)
//                   label: user.name, // Display value (user.name)
//                 }))}
//                 value={newMember.user_id}
//                 onChange={handleInputChange}
//                 editable={false} // Allows selection from dropdown
//                 error={errors.user_id}
//                 placeholder="Select User Name"
//                 showRequired={true}
//                 id="user_id"
//               />

//               <EditableSelectInput
//                 label="Team Name"
//                 name="team_id"
//                 options={teams.map((team) => ({
//                   value: team.team_id, // Actual value (team_id)
//                   label: team.team_name, // Display value (team.team_name)
//                 }))}
//                 value={newMember.team_id}
//                 onChange={handleInputChange}
//                 editable={false} // Allows both typing and selection from dropdown
//                 error={errors.team_id}
//                 placeholder="Select Team Name"
//                 showRequired={true}
//                 id="team_id"
//               />

//               <EditableSelectInput
//                 label="Role Code"
//                 name="role_id"
//                 options={roles.map((role) => ({
//                   value: role.role_id, // Actual value (role_id)
//                   label: role.role_name, // Display value (role.role_name)
//                 }))}
//                 value={newMember.role_id}
//                 onChange={handleInputChange}
//                 editable={false} // Allows both typing and selection from dropdown
//                 error={errors.role_id}
//                 placeholder="Select Role Code"
//                 showRequired={true}
//                 id="role_id"
//               />

//               <div className="input-group row-span-3">
//                 <label htmlFor="remark">Remark</label>
//                 <textarea
//                   name="remark"
//                   value={newMember.remark || ""}
//                   onChange={handleInputChange}
//                   placeholder="Remark"
//                   className="w-full p-2 mb-4 border rounded"
//                 />
//               </div>
//               <div className="col-span-4 text-center">
//                 <button
//                   type="button"
//                   className="bg-green-500 text-white px-5 py-2 rounded mr-2"
//                   onClick={handleSave}
//                 >
//                   Save
//                 </button>
//                 <button
//                   type="button"
//                   className="bg-gray-500 text-white px-4 py-2 rounded"
//                   onClick={toggleModal}
//                 >
//                   Close
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TeamMemberList;

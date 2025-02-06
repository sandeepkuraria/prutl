// prutl-frontend-npm6node14/src/components/committeeMemberManagement/CommitteeMemberList.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCommitteeMembers,
  createNewCommitteeMember,
  updateCommitteeMember,
  deleteCommitteeMember,
} from "../../redux/slices/committeeMemberSlice.js";
import { getAllRoles } from "../../redux/slices/roleSlice.js";
import EditableSelectInput from "../common/EditableSelectInput .jsx";
import ErrorModal from "../common/ErrorModal.jsx";
import { getAllUsers } from "../../redux/slices/userSlice.js";
import { getAllCommittees } from "../../redux/slices/committeeSlice.js";

const CommitteeMemberList = () => {
  const dispatch = useDispatch();
  const { committeeMembers, loading, error } = useSelector(
    (state) => state.committeeMembers
  );
  const { roles, loadingRoles, errorRoles } = useSelector(
    (state) => state.roles
  );
  const { committees, loadingCommittees, errorCommittees } = useSelector(
    (state) => state.committees
  );
  const { users, loadingUsers, errorUsers } = useSelector(
    (state) => state.users
  );
  const [editingMember, setEditingMember] = useState(null);
  const [newMember, setNewMember] = useState({
    role_id: "",
    user_id: "",
    committee_id: "",
    remark: "",
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    dispatch(getAllCommitteeMembers());
    dispatch(getAllRoles());
    dispatch(getAllUsers());
    dispatch(getAllCommittees());
  }, [dispatch]);

  const handleDelete = (committeeMemberId) => {
    dispatch(deleteCommitteeMember(committeeMemberId));
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
    if (!formData.role_id) newErrors.role_id = "Committee Role is required";
    if (!formData.user_id) newErrors.user_id = "User Name is required";
    if (!formData.committee_id)
      newErrors.committee_id = "Committee Name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (editingMember) {
      if (editingMember.committee_member_id && editingMember) {
        dispatch(
          updateCommitteeMember({
            committeeMemberId: editingMember.committee_member_id,
            data: editingMember,
          })
        );
      } else {
        console.error("Error: committeeMemberId or editingMember is undefined");
      }
      setEditingMember(null);
    } else {
      if (validateForm(newMember)) {
        dispatch(createNewCommitteeMember(newMember));
        setNewMember({
          role_id: "",
          user_id: "",
          committee_id: "",
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
      role_id: "",
      user_id: "",
      committee_id: "",
      remark: "",
    });
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
      console.log("Loading committee members...");
    }
    if (error) {
      console.error("Error fetching committee members:", error);
    }
    if (committeeMembers.length > 0) {
      console.log("Fetched committee members:", committeeMembers);
    }
    if (loadingRoles) {
      console.log("Loading roles...");
    }
    if ( errorRoles) {
      console.error("Error fetching roles:", errorRoles);
    }
    if (roles.length > 0) {
      console.log("Fetched roles:", roles);
    }
    if ( loadingCommittees) {
      console.log("Loading committees...");
    }
    if (  errorCommittees) {
      console.error("Error fetching committees:", errorCommittees);
    }
    if (committees.length > 0) {
      console.log("Fetched committee:", committees);
    }
    if ( loadingUsers) {
      console.log("Loading users...");
    }
    if (   errorUsers) {
      console.error("Error fetching users:", errorUsers);
    }
    if (users.length > 0) {
      console.log("Fetched users:", users);
    }
  }, [loading, error, committeeMembers, roles, loadingRoles, errorRoles, committees, loadingCommittees, errorCommittees, users, loadingUsers, errorUsers]);

  if (loading) return <p>Loading...</p>;
  // if (error) return <p className="error-message">{error}</p>;
  if (loadingRoles) return <p>Loading roles...</p>;
  if (errorRoles) return <p className="error-message">{errorRoles}</p>;
  if (loadingUsers) return <p>Loading users...</p>;
  if (errorUsers) return <p className="error-message">{errorUsers}</p>;
  if (loadingCommittees) return <p>Loading committees...</p>;
  if (errorCommittees)
    return <p className="error-message">{errorCommittees}</p>;

  return (
    <div className="committee-member-list overflow-auto">
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
        Create New Committee Member
      </button>
      <div className="table-wrapper max-h-80 overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="whitespace-nowrap sticky top-0 z-30 tableHeadEditDelete  ">
            <tr>
              {/* <th className="px-4 py-2 whitespace-nowrap sticky top-0 left-0 z-20 tableHeadEditDelete">
   Committee Member ID</th> */}
              <th className="px-4 py-2 whitespace-nowrap">Committee Role</th>
              <th className="px-4 py-2 whitespace-nowrap">User Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Committee Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Remark</th>
              <th className="px-4 py-2 whitespace-nowrap sticky top-0 right-0 z-20 tableHeadEditDelete">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {committeeMembers.map((member) => (
              <tr key={member.committee_member_id}>
                {/* <td className="px-4 py-2 whitespace-nowrap sticky left-0 tableHeadEditDelete">
{member.committee_member_id}</td> */}

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingMember &&
                  editingMember.committee_member_id ===
                    member.committee_member_id ? (
                    <EditableSelectInput
                      name="role_id"
                      options={roles.map((role) => ({
                        value: role.role_id, // Actual value (role_id)
                        label: role.role_name, // Display value (role.role_name)
                      }))}
                      value={editingMember.role_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errors.role_name}
                      placeholder="Select Committee Role Name"
                      id="role_id"
                    />
                  ) : (
                    // member.role_id
                    // Display role name based on role_id when not in edit mode
                    roles.find((role) => role.role_id === member.role_id)
                      ?.role_name || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingMember &&
                  editingMember.committee_member_id ===
                    member.committee_member_id ? (
                    <EditableSelectInput
                      name="user_id"
                      options={users.map((user) => ({
                        value: user.user_id, // Actual value (user_id)
                        label: user.name, // Display value (user.name)
                      }))}
                      value={editingMember.user_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errors.user_id}
                      placeholder="Select User Name"
                      id="user_id"
                    />
                  ) : (
                    // member.user_id
                    // Display user name based on user_id when not in edit mode
                    users.find((user) => user.user_id === member.user_id)
                      ?.name || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingMember &&
                  editingMember.committee_member_id ===
                    member.committee_member_id ? (
                    <EditableSelectInput
                      name="committee_id"
                      options={committees.map((committee) => ({
                        value: committee.committee_id, // Actual value (committee_id)
                        label: committee.committee_name, // Display value (committee.committee_name)
                      }))}
                      value={editingMember.committee_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errors.committee_id}
                      placeholder="Select Committee Name"
                      id="committee_id"
                    />
                  ) : (
                    // member.committee_id
                    // Display committee name based on committee_id when not in edit mode
                    committees.find(
                      (committee) =>
                        committee.committee_id === member.committee_id
                    )?.committee_name || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingMember &&
                  editingMember.committee_member_id ===
                    member.committee_member_id ? (
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

                <td className="px-4 py-2 whitespace-nowrap sticky right-0  tableHeadEditDelete">
                  {editingMember &&
                  editingMember.committee_member_id ===
                    member.committee_member_id ? (
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
                        onClick={() => handleDelete(member.committee_member_id)}
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
              Register New Committee Member
            </h2>
            <form className="grid grid-cols-3 gap-4">
              <EditableSelectInput
                label="Committee Role"
                name="role_id"
                options={roles.map((role) => ({
                  value: role.role_id, // Actual value (role_id)
                  label: role.role_name, // Display value (role.role_name)
                }))}
                value={newMember.role_id}
                onChange={handleInputChange}
                editable={false} // Allows selection from dropdown
                error={errors.role_id}
                showRequired={true}
                placeholder="Select Committee Role Name"
                id="role_id"
              />
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
                showRequired={true}
                placeholder="Select User Name"
                id="user_id"
              />
              <EditableSelectInput
                label="Committee Name"
                name="committee_id"
                options={committees.map((committee) => ({
                  value: committee.committee_id, // Actual value (committee_id)
                  label: committee.committee_name, // Display value (committee.committee_name)
                }))}
                value={newMember.committee_id}
                onChange={handleInputChange}
                editable={false} // Allows selection from dropdown
                error={errors.committee_id}
                showRequired={true}
                placeholder="Select Committee Name"
                id="committee_id"
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
              <div className="col-span-3 text-center">
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

export default CommitteeMemberList;

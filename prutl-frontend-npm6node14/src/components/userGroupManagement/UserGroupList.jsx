// prutl-frontend-npm6node14/src/components/teamManagement/UserGroupList.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUserGroups,
  createNewUserGroup,
  updateUserGroup,
  deleteUserGroup,
} from "../../redux/slices/userGroupSlice.js";
import ErrorModal from "../common/ErrorModal.jsx";
import EditableSelectInput from "../common/EditableSelectInput .jsx";

const UserGroupList = () => {
  const dispatch = useDispatch();
  const { userGroups, loading, error } = useSelector(
    (state) => state.userGroups
  );
  const [editingGroup, setEditingGroup] = useState(null);
  const [newGroup, setNewGroup] = useState({
    // group_code: "",
    group_name: "",
    description: "",
    remark: "",
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    dispatch(getAllUserGroups());
  }, [dispatch]);

  const handleDelete = (userGroupId) => {
    dispatch(deleteUserGroup(userGroupId));
  };

  const handleEdit = (group) => {
    setEditingGroup({ ...group });
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   if (editingGroup) {
  //     setEditingGroup({ ...editingGroup, [name]: value });
  //   } else {
  //     setNewGroup({ ...newGroup, [name]: value });
  //   }
  // };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingGroup) {
      setEditingGroup({ ...editingGroup, [name]: value });
    } else {
      setNewGroup({ ...newGroup, [name]: value });
    }
  };

  const validateForm = (formData) => {
    let newErrors = {};
    // if (!formData.group_code) newErrors.group_code = "Group Code is required";
    if (!formData.group_name) newErrors.group_name = "Group Name is required";
    if (!formData.description)
      newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (editingGroup) {
      if (editingGroup.usergroup_id && editingGroup) {
        dispatch(
          updateUserGroup({
            userGroupId: editingGroup.usergroup_id,
            data: editingGroup,
          })
        );
      } else {
        console.error("Error: userGroupId or editingGroup is undefined");
      }
      setEditingGroup(null);
    } else {
      if (validateForm(newGroup)) {
        dispatch(createNewUserGroup(newGroup));
        setNewGroup({
          // group_code: "",
          group_name: "",
          description: "",
          remark: "",
        });
        setShowModal(false);
      }
    }
  };

  const handleUndo = () => {
    setEditingGroup(null);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setNewGroup({
      // group_code: "",
      group_name: "",
      description: "",
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
      console.log("Loading user groups...");
    }
    if (error) {
      console.error("Error fetching user groups:", error);
    }
    if (userGroups.length > 0) {
      console.log("Fetched user groups:", userGroups);
    }
  }, [loading, error, userGroups]);

  if (loading) return <p>Loading...</p>;
  // if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="userGroup-list overflow-auto">
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
        Create New User Group
      </button>
      <div className="table-wrapper max-h-80 overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="whitespace-nowrap sticky top-0 z-30 tableHeadEditDelete">
            <tr>
              {/* <th className="px-4 py-2 whitespace-nowrap sticky top-0 left-0 z-20 tableHeadEditDelete">
                User Group ID
              </th> */}
              {/* <th className="px-4 py-2 whitespace-nowrap">Group Code</th> */}
              <th className="px-4 py-2 whitespace-nowrap">Group Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Description</th>
              <th className="px-4 py-2 whitespace-nowrap">Remark</th>
              <th className="px-4 py-2 whitespace-nowrap sticky top-0 right-0 z-20 tableHeadEditDelete">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {userGroups.map((group) => (
              <tr key={group.usergroup_id}>
                {/* <td className="px-4 py-2 whitespace-nowrap sticky left-0 tableHeadEditDelete">
                  {group.usergroup_id}
                </td> */}
                {/* <td className="px-4 py-2 whitespace-nowrap">
                  {editingGroup &&
                  editingGroup.usergroup_id === group.usergroup_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="group_code"
                        value={editingGroup.group_code || ""}
                        onChange={handleInputChange}
                        placeholder="Group Code"
                      />
                    </div>
                  ) : (
                    group.group_code
                  )}
                </td> */}
                <td className="px-4 py-2 whitespace-nowrap">
                  {editingGroup &&
                  editingGroup.usergroup_id === group.usergroup_id ? (
                    <EditableSelectInput
                      name="group_name"
                      options={userGroups.map((group) => ({
                        value: group.group_name, // Actual value (group_name)
                        label: group.group_name, // Display value (group.group_name)
                      }))}
                      value={editingGroup.group_name}
                      onChange={handleInputChange}
                      editable={true} // Allows both typing and selection from dropdown
                      // error={errors.group_name}
                      placeholder="Select or Enter Group Name"
                      id="group_name"
                    />
                  ) : (
                    group.group_name
                  )}
                </td>
               
                <td className="px-4 py-2 whitespace-nowrap">
                  {editingGroup &&
                  editingGroup.usergroup_id === group.usergroup_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="description"
                        value={editingGroup.description || ""}
                        onChange={handleInputChange}
                        placeholder="Description"
                      />
                    </div>
                  ) : (
                    group.description
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {editingGroup &&
                  editingGroup.usergroup_id === group.usergroup_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="remark"
                        value={editingGroup.remark || ""}
                        onChange={handleInputChange}
                        placeholder="Remark"
                      />
                    </div>
                  ) : (
                    group.remark
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap sticky right-0 tableHeadEditDelete">
                  {editingGroup &&
                  editingGroup.usergroup_id === group.usergroup_id ? (
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
                        onClick={() => handleEdit(group)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-1 rounded"
                        onClick={() => handleDelete(group.usergroup_id)}
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

      {/* Modal for Creating a New User Group */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center mt-12 z-30">
          <div className="registerCard px-6 py-1 rounded-lg shadow-lg w-full max-w-6xl">
            <h2 className="text-2xl font-semibold mb-4">
              Create New User Group
            </h2>
            <form className="grid grid-cols-4 gap-4">
             
               <EditableSelectInput
               label="Group Name"
                      name="group_name"
                      options={userGroups.map((group) => ({
                        value: group.group_name, // Actual value (group_name)
                        label: group.group_name, // Display value (group.group_name)
                      }))}
                      value={newGroup.group_name}
                      onChange={handleInputChange}
                      editable={true} // Allows both typing and selection from dropdown
                      error={errors.group_name}
                      showRequired={true}
                      placeholder="Select or Enter Group Name"
                      id="group_name"
                    />
              <div className="input-group row-span-3">
                <label htmlFor="description">Description</label>
                {/* <input
                  type="text"
                  id="description"
                  name="description"
                  value={newGroup.description}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-4 border rounded"
                  placeholder="Description"
                /> */}
                 <textarea
                  name="description"
                  value={newGroup.description || ""}
                  onChange={handleInputChange}
                  placeholder="Description"
                  className="w-full p-2 mb-4 border rounded"
                />
                {errors.description && (
                  <p className="error-message">{errors.description}</p>
                )}
              </div>
              <div className="input-group row-span-3">
                <label htmlFor="remark">Remark</label>
                <textarea
                  name="remark"
                  value={newGroup.remark || ""}
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

export default UserGroupList;

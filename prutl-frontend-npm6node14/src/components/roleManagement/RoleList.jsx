import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRoles,
  createNewRole,
  updateRole,
  deleteRole,
} from "../../redux/slices/roleSlice.js";
import ErrorModal from "../common/ErrorModal.jsx";
import EditableSelectInput from "../common/EditableSelectInput .jsx";

const RoleList = () => {
  const dispatch = useDispatch();
  const { roles, loading, error } = useSelector((state) => state.roles);
  const [editingRole, setEditingRole] = useState(null);
  const [newRole, setNewRole] = useState({
    // role_code: "",
    role_name: "",
    remark: "",
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    dispatch(getAllRoles());
  }, [dispatch]);

  const handleDelete = (roleId) => {
    dispatch(deleteRole(roleId));
  };

  const handleEdit = (role) => {
    setEditingRole({ ...role });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingRole) {
      setEditingRole({ ...editingRole, [name]: value });
    } else {
      setNewRole({ ...newRole, [name]: value });
    }
  };

  const validateForm = (formData) => {
    let newErrors = {};
    // if (!formData.role_code) {
    //   newErrors.role_code = "Role code is required";
    // }
    if (!formData.role_name) {
      newErrors.role_name = "Role name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (editingRole) {
      if (editingRole.role_id) {
        dispatch(
          updateRole({ roleId: editingRole.role_id, data: editingRole })
        );
      } else {
        console.error("Error: roleId or editingRole is undefined");
      }
      setEditingRole(null);
    } else {
      if (validateForm(newRole)) {
        dispatch(createNewRole(newRole));
        setNewRole({
          // role_code: "",
          role_name: "",
          remark: "",
        });
        setShowModal(false);
      }
    }
  };

  const handleUndo = () => {
    setEditingRole(null);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setNewRole({
      role_name: "",
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

  if (loading) return <p>Loading Roles...</p>;
  // if (error)
  //   return (
  //     <p className="error-message">
  //       {showError && <ErrorModal message={error} onClose={handleCloseModal} />}
  //     </p>
  //   );

  return (
    <div className="role-list overflow-auto">
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
        Create New Role
      </button>
      <div className="table-wrapper max-h-80 overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="whitespace-nowrap sticky top-0 z-30 tableHeadEditDelete  ">
            <tr>
              {/* <th className="px-4 py-2 whitespace-nowrap sticky top-0 left-0 z-20 tableHeadEditDelete">
                Role ID
              </th> */}
              {/* <th className="px-4 py-2 whitespace-nowrap">Role Code</th> */}
              <th className="px-4 py-2 whitespace-nowrap">Role Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Remark</th>
              <th className="px-4 py-2 whitespace-nowrap sticky top-0 right-0 z-20 tableHeadEditDelete">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.role_id}>
                {/* <td className="px-4 py-2 whitespace-nowrap sticky left-0 tableHeadEditDelete z-10">
                  {role.role_id}
                </td> */}
                {/* <td className="px-4 py-2 whitespace-nowrap">
                  {editingRole && editingRole.role_id === role.role_id ? (
                    <CustomSelect
                      name="role_code"
                      options={roles.map((role) => ({
                        value: role.role_code,
                        label: role.role_code,
                      }))}
                      value={editingRole.role_code}
                      onChange={handleInputChange}
                      editable={true}
                      error={errors.role_code}
                      placeholder="Enter Unique Role Code"
                    />
                  ) : (
                    role.role_code
                  )}
                </td> */}

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingRole && editingRole.role_id === role.role_id ? (
                    <EditableSelectInput
                      name="role_name"
                      options={roles.map((role) => ({
                        value: role.role_name, // Actual value (role_name)
                        label: role.role_name, // Display value (role.role_name)
                      }))}
                      value={editingRole.role_name}
                      onChange={handleInputChange}
                      editable={true} // Allows typing and selection from dropdown
                      // error={errors.role_name}
                      placeholder="Select or Enter Role Name"
                      id="role_name"
                    />
                  ) : (
                    role.role_name
                    // // Display role name based on role_name when not in edit mode
                    // roles.find(
                    //   (role) =>
                    //     role.role_name === role.role_name
                    // )?.role_name || ""
                  )}
                </td>

                {/* <td className="px-4 py-2 whitespace-nowrap">
                  {editingRole && editingRole.role_id === role.role_id ? (
                    <CustomSelect
                      name="role_name"
                      options={roles.map((role) => ({
                        value: role.role_name,
                        label: role.role_name,
                      }))}
                      value={editingRole.role_name}
                      onChange={handleInputChange}
                      editable={true}
                      error={errors.role_name}
                      placeholder="Enter Role Name"
                    />
                  ) : (
                    role.role_name
                  )}
                </td> */}

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingRole && editingRole.role_id === role.role_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="remark"
                        value={editingRole.remark || ""}
                        onChange={handleInputChange}
                        placeholder="Remark"
                      />
                    </div>
                  ) : (
                    role.remark
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap sticky right-0 tableHeadEditDelete">
                  {editingRole && editingRole.role_id === role.role_id ? (
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
                        onClick={() => handleEdit(role)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 my-1 rounded"
                        onClick={() => handleDelete(role.role_id)}
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
            <h2 className="text-2xl font-semibold mb-4">Register New Role</h2>
            <form className="grid grid-cols-4 gap-4">
              {/* <CustomSelect
                label="Role Code"
                name="role_code"
                options={roles.map((role) => ({
                  value: role.role_code,
                  label: role.role_code,
                }))}
                value={newRole.role_code}
                onChange={handleInputChange}
                editable={true}
                error={errors.role_code}
                placeholder="Enter Unique Role Code"
                showRequired={true}
              /> */}
              {/* <CustomSelect
                label="Role Name"
                name="role_name"
                options={roles.map((role) => ({
                  value: role.role_name,
                  label: role.role_name,
                }))}
                value={newRole.role_name}
                onChange={handleInputChange}
                editable={true}
                error={errors.role_name}
                placeholder="Enter Role Name"
                showRequired={true}
              /> */}

              <EditableSelectInput
              label="Role Name"
                name="role_name"
                options={roles.map((role) => ({
                  value: role.role_name, // Actual value (role_name)
                  label: role.role_name, // Display value (role.role_name)
                }))}
                value={newRole.role_name}
                onChange={handleInputChange}
                editable={true} // Allows typing and selection from dropdown
                error={errors.role_name}
                showRequired={true}
                placeholder="Select or Enter Role Name"
                id="role_name"
              />

              <div className="input-group row-span-3">
                <label htmlFor="remark">Remark</label>
                <textarea
                  name="remark"
                  value={newRole.remark}
                  onChange={handleInputChange}
                  placeholder="Remark"
                  className="w-full p-2 mb-4 border rounded"
                />
              </div>
            </form>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleList;

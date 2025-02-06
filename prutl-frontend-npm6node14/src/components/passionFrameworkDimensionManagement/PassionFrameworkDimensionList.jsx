// prutl-frontend-npm6node14/src/components/passionFrameworkDimensionManagement/PassionFrameworkDimensionList.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPassionFrameworkDimensions,
  createNewPassionFrameworkDimension,
  updatePassionFrameworkDimension,
  deletePassionFrameworkDimension,
} from "../../redux/slices/passionFrameworkDimensionSlice.js";
import EditableSelectInput from "../common/EditableSelectInput .jsx";

const PassionFrameworkDimensionList = () => {
  const dispatch = useDispatch();
  const { passionFrameworkDimensions, loading, error } = useSelector(
    (state) => state.passionFrameworkDimensions
  );
  const [editingDimension, setEditingDimension] = useState(null);
  const [newDimension, setNewDimension] = useState({
    dimension_name: "",
    description: "",
    remark: "",
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getAllPassionFrameworkDimensions());
  }, [dispatch]);

  const handleDelete = (dimensionId) => {
    dispatch(deletePassionFrameworkDimension(dimensionId));
  };

  const handleEdit = (dimension) => {
    setEditingDimension({ ...dimension });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingDimension) {
      setEditingDimension({ ...editingDimension, [name]: value });
    } else {
      setNewDimension({ ...newDimension, [name]: value });
    }
  };

  const validateForm = (formData) => {
    let newErrors = {};
    if (!formData.dimension_name)
      newErrors.dimension_name = "Dimension Name is required";
    // if (!formData.description)
    //   newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (editingDimension) {
      if (editingDimension.dimension_id && editingDimension) {
        dispatch(
          updatePassionFrameworkDimension({
            dimensionId: editingDimension.dimension_id,
            data: editingDimension,
          })
        );
      } else {
        console.error("Error: dimensionId or editingDimension is undefined");
      }
      setEditingDimension(null);
    } else {
      if (validateForm(newDimension)) {
        dispatch(createNewPassionFrameworkDimension(newDimension));
        setNewDimension({
          dimension_name: "",
          description: "",
          remark: "",
        });
        setShowModal(false);
      }
    }
  };

  const handleUndo = () => {
    setEditingDimension(null);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setNewDimension({
      dimension_name: "",
      description: "",
      remark: "",
    });
  };

  useEffect(() => {
    if (loading) {
      console.log("Loading passion framework dimensions...");
    }
    if (error) {
      console.error("Error fetching passion framework dimensions:", error);
    }
    if (passionFrameworkDimensions.length > 0) {
      console.log(
        "Fetched passion framework dimensions:",
        passionFrameworkDimensions
      );
    }
  }, [loading, error, passionFrameworkDimensions]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="passionFrameworkDimension-list overflow-auto">
      <button
        className="bg-blue-500 text-white px-4 py-2 m-2 rounded mb-4"
        onClick={toggleModal}
      >
        Create New Dimension
      </button>
      <div className="table-wrapper max-h-80 overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="whitespace-nowrap sticky top-0 z-30 tableHeadEditDelete">
            <tr>
              {/* <th className="px-4 py-2 whitespace-nowrap sticky top-0 left-0 z-20 tableHeadEditDelete">
                Dimension ID
              </th> */}
              <th className="px-4 py-2 whitespace-nowrap">Dimension Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Description</th>
              <th className="px-4 py-2 whitespace-nowrap">Remark</th>

              <th className="px-4 py-2 whitespace-nowrap sticky top-0 right-0 z-20 tableHeadEditDelete">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {passionFrameworkDimensions.map((dimension) => (
              <tr key={dimension.dimension_id}>
                {/* <td className="px-4 py-2 whitespace-nowrap sticky left-0 tableHeadEditDelete">
                  {dimension.dimension_id}
                </td> */}

                {/* <td className="px-4 py-2 whitespace-nowrap">
                  {editingDimension &&
                  editingDimension.dimension_id === dimension.dimension_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="dimension_name"
                        value={editingDimension.dimension_name || ""}
                        onChange={handleInputChange}
                        placeholder="Dimension Name"
                      />
                    </div>
                  ) : (
                    dimension.dimension_name
                  )}
                </td> */}

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingDimension &&
                  editingDimension.dimension_id === dimension.dimension_id ? (
                    <EditableSelectInput
                      name="dimension_name"
                      options={passionFrameworkDimensions.map(
                        (passionFrameworkDimension) => ({
                          value: passionFrameworkDimension.dimension_name, // Actual value (dimension_name)
                          label: passionFrameworkDimension.dimension_name, // Display value (passionFrameworkDimension.dimension_name)
                        })
                      )}
                      value={editingDimension.dimension_name}
                      onChange={handleInputChange}
                      editable={true} // Allows selection from dropdown
                      error={errors.dimension_name}
                      placeholder="Select or Enter Passion Name"
                      id="dimension_name"
                    />
                  ) : (
                    // dimension.dimension_name
                    // Display passion dimension name based on dimension_id when not in edit mode
                    passionFrameworkDimensions.find(
                      (passionFrameworkDimension) =>
                        passionFrameworkDimension.dimension_name ===
                        dimension.dimension_name
                    )?.dimension_name || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingDimension &&
                  editingDimension.dimension_id === dimension.dimension_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="description"
                        value={editingDimension.description || ""}
                        onChange={handleInputChange}
                        placeholder="Description"
                      />
                    </div>
                  ) : (
                    dimension.description
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingDimension &&
                  editingDimension.dimension_id === dimension.dimension_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="remark"
                        value={editingDimension.remark || ""}
                        onChange={handleInputChange}
                        placeholder="Remark"
                      />
                    </div>
                  ) : (
                    dimension.remark
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap sticky right-0 tableHeadEditDelete">
                  {editingDimension &&
                  editingDimension.dimension_id === dimension.dimension_id ? (
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
                        onClick={() => handleEdit(dimension)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-1 rounded"
                        onClick={() => handleDelete(dimension.dimension_id)}
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

      {/* Modal for Creating a New Dimension */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center mt-12 z-30">
          <div className="registerCard px-6 py-1 rounded-lg shadow-lg w-full max-w-6xl">
            <h2 className="text-2xl font-semibold mb-4">
              Create New Dimension
            </h2>
            <form className="grid grid-cols-4 gap-4">
              {/* <div className="input-group row-span-3">
                <label htmlFor="dimension_name">Dimension Name</label>
                <input
                  type="text"
                  id="dimension_name"
                  name="dimension_name"
                  value={newDimension.dimension_name}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-4 border rounded"
                  placeholder="Dimension Name"
                />
                {errors.dimension_name && (
                  <span className="text-red-500 text-sm">
                    {errors.dimension_name}
                  </span>
                )}
              </div> */}
              <EditableSelectInput
               label="Passion Name"
                      name="dimension_name"
                      options={passionFrameworkDimensions.map(
                        (passionFrameworkDimension) => ({
                          value: passionFrameworkDimension.dimension_name, // Actual value (dimension_name)
                          label: passionFrameworkDimension.dimension_name, // Display value (passionFrameworkDimension.dimension_name)
                        })
                      )}
                      value={newDimension.dimension_name}
                      onChange={handleInputChange}
                      editable={true} // Allows selection from dropdown
                      error={errors.dimension_name}
                      placeholder="Select or Enter Passion Name"
                      showRequired={true}
                      id="dimension_name"
                    />

              <div className="input-group row-span-3">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={newDimension.description}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-4 border rounded"
                  placeholder="Description"
                />
                {errors.description && (
                  <span className="text-red-500 text-sm">
                    {errors.description}
                  </span>
                )}
              </div>
              <div className="input-group row-span-3">
                <label htmlFor="remark">Remark</label>
                <textarea
                  id="remark"
                  name="remark"
                  value={newDimension.remark || ""}
                  onChange={handleInputChange}
                  placeholder="Remark"
                  className="w-full p-2 mb-4 border rounded"
                />
              </div>
            </form>
            <div className="col-span-4 text-center">
              <button
                className="bg-green-500  text-white px-4 py-2 mt-4 rounded"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 mt-4 rounded ml-2"
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

export default PassionFrameworkDimensionList;

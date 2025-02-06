// prutl-frontend-npm6node14/src/components/prutlFrameworkDimensionManagement/PrutlFrameworkDimensionList.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPrutlFrameworkDimensions,
  createNewPrutlFrameworkDimension,
  updatePrutlFrameworkDimension,
  deletePrutlFrameworkDimension,
} from "../../redux/slices/prutlFrameworkDimensionSlice.js";
// import EditableSelectInput from "../common/EditableSelectInput.jsx";
import ErrorModal from "../common/ErrorModal.jsx";
import EditableSelectInput from "../common/EditableSelectInput .jsx";

const PrutlFrameworkDimensionList = () => {
  const dispatch = useDispatch();
  const { prutlFrameworkDimensions, loading, error } = useSelector(
    (state) => state.prutlFrameworkDimensions
  );
  const [editingDimension, setEditingDimension] = useState(null);
  const [newDimension, setNewDimension] = useState({
    prutl_name: "",
    description: "",
    remark: "",
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    dispatch(getAllPrutlFrameworkDimensions());
  }, [dispatch]);

  const handleDelete = (prutlId) => {
    dispatch(deletePrutlFrameworkDimension(prutlId));
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
    if (!formData.prutl_name) {
      newErrors.prutl_name = "Please provide a name";
    }
    if (!formData.description) {
      newErrors.description = "Please provide a description";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (editingDimension) {
      if (editingDimension.prutl_id) {
        dispatch(
          updatePrutlFrameworkDimension({
            prutlId: editingDimension.prutl_id,
            data: editingDimension,
          })
        );
      } else {
        console.error("Error: prutlId or editingDimension is undefined");
      }
      setEditingDimension(null);
    } else {
      if (validateForm(newDimension)) {
        dispatch(createNewPrutlFrameworkDimension(newDimension));
        setNewDimension({
          prutl_name: "",
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
      prutl_name: "",
      description: "",
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

  if (loading) return <p>Loading PRUTL Dimensions...</p>;
  // if (error)
  //   return (
  //     <p className="error-message">
  //       {showError && <ErrorModal message={error} onClose={handleCloseModal} />}
  //     </p>
  //   );

  return (
    <div className="prutl-dimension-list overflow-auto">
     {error &&
      <p className="error-message">
        {showError && <ErrorModal message={error} onClose={handleCloseModal} />}
      </p>
     } 

      <button
        className="bg-blue-500 text-white px-4 py-2 m-2 rounded mb-4"
        onClick={toggleModal}
      >
        Register New PRUTL Dimension
      </button>
      
      <div className="table-wrapper max-h-80 overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="whitespace-nowrap sticky top-0 z-30 tableHeadEditDelete">
            <tr>
              <th className="px-4 py-2 whitespace-nowrap">PRUTL Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Description</th>
              <th className="px-4 py-2 whitespace-nowrap">Remark</th>
              <th className="px-4 py-2 whitespace-nowrap sticky top-0 right-0 z-20 tableHeadEditDelete">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {prutlFrameworkDimensions.map((dimension) => (
              <tr key={dimension.prutl_id}>
                <td className="px-4 py-2 whitespace-nowrap">
                  {editingDimension &&
                  editingDimension.prutl_id === dimension.prutl_id ? (
                    <EditableSelectInput
                      name="prutl_name"
                      options={prutlFrameworkDimensions.map(
                        (prutlFrameworkDimension) => ({
                          value: prutlFrameworkDimension.prutl_name, // Actual value (prutl_name)
                          label: prutlFrameworkDimension.prutl_name, // Display value (prutlFrameworkDimension.prutl_name)
                        })
                      )}
                      value={editingDimension.prutl_name}
                      onChange={handleInputChange}
                      editable={true} // Allows selection from dropdown
                      error={errors.prutl_name}
                      placeholder="Select or Enter Prutl Name"
                      id="prutl_name"
                    />
                  ) : (
                    // dimension.prutl_id
                    // Display prutl name based on prutl_id when not in edit mode
                    prutlFrameworkDimensions.find(
                      (prutlFrameworkDimension) =>
                        prutlFrameworkDimension.prutl_name ===
                        dimension.prutl_name
                    )?.prutl_name || ""
                  )}
                </td>

                {/* <td className="px-4 py-2 whitespace-nowrap">
                  {editingDimension &&
                  editingDimension.prutl_id ===
                    dimension.prutl_id ? (
                    <EditableSelectInput
                      name="prutl_name"
                      options={prutlFrameworkDimensions.map(
                        (prutlFrameworkDimension) => ({
                          value: prutlFrameworkDimension.prutl_name, // Actual value (prutl_name)
                          label: prutlFrameworkDimension.prutl_name, // Display value (prutlFrameworkDimension.prutl_name)
                        })
                      )}
                      value={editingDimension.prutl_name}
                      onChange={handleInputChange}
                      editable={true} // Allows both typing and selection from dropdown
                      error={errors.prutl_name}
                      placeholder="Select Prutl Name"
                      // showRequired={true}
                      id="prutl_name"
                    />
                  ) : (
                    dimension.prutl_name
                    // Display user name based on user_id when not in edit mode
                    // prutlFrameworkDimensions.find(
                    //   (prutlFrameworkDimension) =>
                    //     prutlFrameworkDimension.prutl_name === dimension.prutl_name
                    // )?.prutl_name || ""
                  )}
                </td> */}

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingDimension &&
                  editingDimension.prutl_id === dimension.prutl_id ? (
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
                  editingDimension.prutl_id === dimension.prutl_id ? (
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
                  editingDimension.prutl_id === dimension.prutl_id ? (
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
                        className="bg-red-500 text-white px-2 py-1 my-1 rounded"
                        onClick={() => handleDelete(dimension.prutl_id)}
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
              Register New PRUTL Dimension
            </h2>
            <form className="grid grid-cols-4 gap-4">
              <EditableSelectInput
                label="Prutl Name"
                name="prutl_name"
                options={prutlFrameworkDimensions.map(
                  (prutlFrameworkDimension) => ({
                    value: prutlFrameworkDimension.prutl_name, // Actual value (prutl_name)
                    label: prutlFrameworkDimension.prutl_name, // Display value (prutlFrameworkDimension.prutl_name)
                  })
                )}
                value={newDimension.prutl_name}
                onChange={handleInputChange}
                editable={true} // Allows both typing and selection from dropdown
                error={errors.prutl_name}
                placeholder="Select or Enter Prutl Name"
                showRequired={true}
                id="prutl_name"
              />

              <div className="input-group row-span-3">
              <label htmlFor="description">Description&nbsp;<span className="error-message  ">*</span></label>

                <textarea
                  name="description"
                  value={newDimension.description || ""}
                  onChange={handleInputChange}
                  placeholder="Enter Description"
                  className="w-full p-2 mb-4 border rounded"
                  error={errors.description}
                />
                 { <p className="error-message text-sm ">{errors.description}</p>}
              </div>

              <div className="input-group row-span-3">
                <label htmlFor="remark">Remark</label>
                <textarea
                  name="remark"
                  value={newDimension.remark || ""}
                  onChange={handleInputChange}
                  placeholder="Enter Remark"
                  className="w-full p-2 mb-4 border rounded"
                />
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

export default PrutlFrameworkDimensionList;

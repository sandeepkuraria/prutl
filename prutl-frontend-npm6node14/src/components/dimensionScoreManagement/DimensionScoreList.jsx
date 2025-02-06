// prutl-frontend-npm6node14/src/components/dimensionScoreManagement/DimensionScoreList.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDimensionScores,
  createNewDimensionScore,
  updateDimensionScore,
  deleteDimensionScore,
} from "../../redux/slices/dimensionScoreSlice.js";
import { getAllUsers } from "../../redux/slices/userSlice.js";
import ErrorModal from "../common/ErrorModal.jsx";
import EditableSelectInput from "../common/EditableSelectInput .jsx";
import { getAllPassionFrameworkDimensions } from "../../redux/slices/passionFrameworkDimensionSlice.js";
import { getAllPrutlFrameworkDimensions } from "../../redux/slices/prutlFrameworkDimensionSlice.js";

const DimensionScoreList = () => {
  const dispatch = useDispatch();
  const { dimensionScores, loading, error } = useSelector(
    (state) => state.dimensionScores
  );
  const { users, loadingUsers, errorUsers } = useSelector(
    (state) => state.users
  );
  const {
    passionFrameworkDimensions,
    loadingPassionFrameworkDimensions,
    errorPassionFrameworkDimensions,
  } = useSelector((state) => state.passionFrameworkDimensions);
  const {
    prutlFrameworkDimensions,
    loadingPrutlFrameworkDimensions,
    errorPrutlFrameworkDimensions,
  } = useSelector((state) => state.prutlFrameworkDimensions);

  const [editingScore, setEditingScore] = useState(null);
  const [newScore, setNewScore] = useState({
    user_id: null,
    // dimension_id: "",
    dimension_id: null,
    prutl_id: null,
    score_value: null,
    assessment_date: null,
    remark: null,
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    dispatch(getAllDimensionScores());
    dispatch(getAllUsers());
    // Dispatch the action to fetch passionFrameworkDimensions when the component mounts
    dispatch(getAllPassionFrameworkDimensions());
    // Dispatch the action to fetch prutlFrameworkDimensions when the component mounts
    dispatch(getAllPrutlFrameworkDimensions());
    // Dispatch the action to fetch prutlFrameworkDimensions when the component mounts
  }, [dispatch]);

  const handleDelete = (dimensionScoreId) => {
    dispatch(deleteDimensionScore(dimensionScoreId));
  };

  const handleEdit = (score) => {
    setEditingScore({ ...score });
  };

  const combinedOptions = [
    ...passionFrameworkDimensions.map((passionFrameworkDimension) => ({
      value: `passion_${passionFrameworkDimension.dimension_id}`, // Prefix with "passion_"
      label: `Passion: ${passionFrameworkDimension.dimension_name}`,
    })),
    ...prutlFrameworkDimensions.map((prutlFrameworkDimension) => ({
      value: `prutl_${prutlFrameworkDimension.prutl_id}`, // Prefix with "prutl_"
      label: `Prutl: ${prutlFrameworkDimension.prutl_name}`,
    })),
  ];

  const handleInputChange = (e, selectedOption) => {
    const { name } = e.target;
    
    // Check if selectedOption is passed, otherwise fall back to target value
    const selectedOptionLabel = selectedOption ? selectedOption.label : e.target.label;
    const selectedValue = selectedOption ? selectedOption.value : e.target.value;
    
    console.log("Selected Option Label:", selectedOptionLabel);
    
    // Only apply startsWith if selectedValue is a string
    if (typeof selectedValue === "string") {
      const isPassion = selectedValue.startsWith("passion_");
      const isPrutl = selectedValue.startsWith("prutl_");
  
      if (isPassion || isPrutl) {
        // Strip the prefix and save only the numeric ID
        const strippedValue = selectedValue.replace(/^(passion_|prutl_)/, '');
        const updatedDimensionScore = {
          ...(editingScore || newScore),
          dimension_id: isPassion ? strippedValue : null,
          prutl_id: isPrutl ? strippedValue : null,
        };
  
        if (editingScore) {
          setEditingScore(updatedDimensionScore);
        } else {
          setNewScore(updatedDimensionScore);
        }
        return;
      }
    }
  
    // For other fields, directly set the value without prefixes
    const updatedDimensionScore = {
      ...(editingScore || newScore),
      [name]: selectedValue,
    };
  
    if (editingScore) {
      setEditingScore(updatedDimensionScore);
    } else {
      setNewScore(updatedDimensionScore);
    }
  };
  
 

  const validateForm = (formData) => {
    let newErrors = {};
    if (!formData.user_id) newErrors.user_id = "User Name is required";
    if (!formData.dimension_id)
      newErrors.dimension_id = "Passion Dimension is required";
    // if (!formData.prutl_id)
    //   newErrors.prutl_id = "Prutl Dimension is required";
    if (!formData.score_value) newErrors.score_value = "Score is required";
    if (!formData.assessment_date)
      newErrors.assessment_date = "Assessment Date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (editingScore) {
      if (editingScore.dimension_score_id && editingScore) {
        dispatch(
          updateDimensionScore({
            dimensionScoreId: editingScore.dimension_score_id,
            data: editingScore,
          })
        );
      } else {
        console.error("Error: dimensionScoreId or editingScore is undefined");
      }
      setEditingScore(null);
    } else {
      if (validateForm(newScore)) {
        dispatch(createNewDimensionScore(newScore));
        setNewScore({
          user_id: null,
          // dimension_id: "",
          dimension_id: null,
          prutl_id: null,
          score_value: null,
          assessment_date: null,
          remark: null,
        });
        setShowModal(false);
      }
    }
  };

  const handleUndo = () => {
    setEditingScore(null);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setNewScore({
      user_id: null,
      // dimension_id: "",
      dimension_id: null,
      prutl_id: null,
      score_value: null,
      assessment_date: null,
      remark: null,
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

  useEffect(() => {
    if (loading) {
      console.log("Loading dimension scores...");
    }
    if (error) {
      console.error("Error fetching dimension scores:", error);
    }
    if (dimensionScores.length > 0) {
      console.log("Fetched dimension scores:", dimensionScores);
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
    if (loadingPassionFrameworkDimensions) {
      console.log("Loading passionFrameworkDimensions...");
    }
    if (errorPassionFrameworkDimensions) {
      console.log(
        "Error fetching passionFrameworkDimensions:",
        errorPassionFrameworkDimensions
      );
    }
    if (passionFrameworkDimensions.length > 0) {
      console.log(
        "Fetched passionFrameworkDimensions:",
        passionFrameworkDimensions
      );
    }
    if (loadingPrutlFrameworkDimensions) {
      console.log("Loading prutlFrameworkDimensions...");
    }
    if (errorPrutlFrameworkDimensions) {
      console.log(
        "Error fetching prutlFrameworkDimensions:",
        errorPrutlFrameworkDimensions
      );
    }
    if (prutlFrameworkDimensions.length > 0) {
      console.log(
        "Fetched prutlFrameworkDimensions:",
        prutlFrameworkDimensions
      );
    }
  }, [
    loading,
    error,
    dimensionScores,
    users,
    loadingUsers,
    errorUsers,
    loadingPassionFrameworkDimensions,
    errorPassionFrameworkDimensions,
    passionFrameworkDimensions,
    loadingPrutlFrameworkDimensions,
    errorPrutlFrameworkDimensions,
    prutlFrameworkDimensions,
  ]);

  if (loading) return <p>Loading...</p>;
  // if (error) return <p className="error-message">{error}</p>;
  if (loadingUsers) return <p>Loading...</p>;
  if (errorUsers) return <p className="error-message">{errorUsers}</p>;
  if (loadingPassionFrameworkDimensions)
    return <p>Loading PassionFrameworkDimensions...</p>;
  if (errorPassionFrameworkDimensions)
    return <p className="error-message">{errorPassionFrameworkDimensions}</p>;
  if (loadingPrutlFrameworkDimensions)
    return <p>Loading PrutlFrameworkDimensions...</p>;
  if (errorPrutlFrameworkDimensions)
    return <p className="error-message">{errorPrutlFrameworkDimensions}</p>;

  return (
    <div className="dimensionScore-list overflow-auto">
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
        Create New Score
      </button>
      <div className="table-wrapper max-h-80 overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="whitespace-nowrap sticky top-0 z-30 tableHeadEditDelete">
            <tr>
              {/* <th className="px-4 py-2 whitespace-nowrap sticky top-0 left-0 z-20 tableHeadEditDelete">
            Dimension Score ID
              </th> */}
              <th className="px-16 py-2 mx-16 whitespace-nowrap">User Name</th>
              <th className="px-28 py-2 mx-28 whitespace-nowrap">
                Dimension Name
              </th>
              <th className="px-4 py-2 whitespace-nowrap">Dimension Score</th>
              <th className="px-4 py-2 whitespace-nowrap">Assessment Date</th>
              <th className="px-mx-28 py-2 mx-28 whitespace-nowrap">Remark</th>
              <th className="px-4 py-2 whitespace-nowrap sticky top-0 right-0 z-20 tableHeadEditDelete">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {dimensionScores.map((score) => (
              <tr key={score.dimension_score_id}>
                {/* <td className="px-4 py-2 whitespace-nowrap sticky left-0 tableHeadEditDelete">
{score.dimension_score_id}
                </td> */}
                <td className="px-4 py-2 whitespace-nowrap">
                  {editingScore &&
                  editingScore.dimension_score_id ===
                    score.dimension_score_id ? (
                    <EditableSelectInput
                      name="user_id"
                      options={users.map((user) => ({
                        value: user.user_id, // Actual value (user_id)
                        label: user.name, // Display value (user.name)
                      }))}
                      value={editingScore.user_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errors.user_id}
                      placeholder="Select User"
                      id="user_id"
                    />
                  ) : (
                    // score.user_id
                    // Display user name based on user id when not in edit mode
                    users.find((user) => user.user_id === score.user_id)
                      ?.name || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingScore &&
                  editingScore.dimension_score_id ===
                    score.dimension_score_id ? (
                    <EditableSelectInput
                      name={
                        editingScore.dimension_id ? "dimension_id" : "prutl_id"
                      }
                      options={combinedOptions}
                      value={
                        editingScore.dimension_id
                          ? `passion_${editingScore.dimension_id}`
                          : `prutl_${editingScore.prutl_id}`
                      }
                      onChange={(e, selectedOption) =>
                        handleInputChange(e, selectedOption)
                      }
                      editable={false} // Allows selection from dropdown
                      placeholder="Select Dimension"
                      id={
                        editingScore.dimension_id ? "dimension_id" : "prutl_id"
                      }
                    />
                  ) : (
                    (() => {
                      // Find in passionFrameworkDimensions
                      const passionDimension = passionFrameworkDimensions.find(
                        (dimension) =>
                          dimension.dimension_id === score.dimension_id
                      );
                      // Find in prutlFrameworkDimensions
                      const prutlDimension = prutlFrameworkDimensions.find(
                        (dimension) => dimension.prutl_id === score.prutl_id
                      );

                      // Return the appropriate name or "Unknown Dimension"
                      if (passionDimension) {
                        return passionDimension.dimension_name;
                      } else if (prutlDimension) {
                        return prutlDimension.prutl_name;
                      } else {
                        return "Unknown Dimension";
                      }
                    })()
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingScore &&
                  editingScore.dimension_score_id ===
                    score.dimension_score_id ? (
                    <EditableSelectInput
                      name="score_value"
                      options={dimensionScores.map((dimension) => ({
                        value: dimension.score_value, // Actual value (score_value)
                        label: dimension.score_value, // Display value (dimension.score_value)
                      }))}
                      value={editingScore.score_value}
                      onChange={handleInputChange}
                      editable={true} // Allows selection from dropdown
                      // error={errors.score_value}
                      placeholder="Select or Enter Score"
                      id="score_value"
                      isNumeric="true"
                    />
                  ) : (
                    score.score_value
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingScore &&
                  editingScore.dimension_score_id ===
                    score.dimension_score_id ? (
                    <div className="input-group">
                      <input
                        type="date"
                        name="assessment_date"
                        value={editingScore.assessment_date|| ""}
                        onChange={handleInputChange}
                        placeholder="Assessment Date"
                      />
                    </div>
                  ) : (
                    // score.assessment_date
                    new Date(score.assessment_date).toLocaleDateString()
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingScore &&
                  editingScore.dimension_score_id ===
                    score.dimension_score_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="remark"
                        value={editingScore.remark || ""}
                        onChange={handleInputChange}
                        placeholder="Remark"
                      />
                    </div>
                  ) : (
                    score.remark
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap sticky right-0 tableHeadEditDelete">
                  {editingScore &&
                  editingScore.dimension_score_id ===
                    score.dimension_score_id ? (
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
                        onClick={() => handleEdit(score)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-1 rounded"
                        onClick={() => handleDelete(score.dimension_score_id)}
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

      {/* Modal for Creating a New Dimension Score */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center mt-12 z-30">
          <div className="registerCard px-6 py-1 rounded-lg shadow-lg w-full max-w-6xl">
            <h2 className="text-2xl font-semibold mb-4">
              Create New Dimension Score
            </h2>
            <form className="grid grid-cols-4 gap-4">
              
              <EditableSelectInput
                label="Name"
                name="user_id"
                options={users.map((user) => ({
                  value: user.user_id, // Actual value (user_id)
                  label: user.name, // Display value (user.name)
                }))}
                value={newScore.user_id}
                onChange={handleInputChange}
                editable={false} // Allows selection from dropdown
                error={errors.user_id}
                showRequired={true}
                placeholder="Select User"
                id="user_id"
              />

             
              <EditableSelectInput
                label="Dimension Name"
                name={newScore.dimension_id ? "dimension_id" : "prutl_id"}
                options={combinedOptions}
                value={
                  newScore.dimension_id
                    ? `passion_${newScore.dimension_id}`
                    : `prutl_${newScore.prutl_id}`
                }
                onChange={(e, selectedOption) =>
                  handleInputChange(e, selectedOption)
                }
                editable={false} // Allows selection from dropdown\
                error={errors.dimension_id}
                showRequired={true}
                placeholder="Select Dimension"
                id={newScore.dimension_id ? "dimension_id" : "prutl_id"}
              />

             

              <EditableSelectInput
                label="Score"
                name="score_value"
                options={dimensionScores.map((dimension) => ({
                  value: dimension.score_value, // Actual value (score_value)
                  label: dimension.score_value, // Display value (dimension.score_value)
                }))}
                value={newScore.score_value}
                onChange={handleInputChange}
                editable={true} // Allows selection from dropdown
                error={errors.score_value}
                showRequired={true}
                placeholder="Select or Enter Score"
                id="score_value"
                isNumeric="true"
              />

              <div className="input-group row-span-3">
                <label htmlFor="assessment_date">Assessment Date</label>
                <input
                  type="date"
                  id="assessment_date"
                  name="assessment_date"
                  value={newScore.assessment_date || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-4 border rounded"
                  placeholder="Assessment Date"
                />
                {errors.assessment_date && (
                  <p className="error-message text-sm">{errors.assessment_date}</p>
                )}
              </div>

              <div className="input-group row-span-3">
                <label htmlFor="remark">Remark</label>
                <textarea
                  id="remark"
                  name="remark"
                  value={newScore.remark}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-4 border rounded"
                  placeholder="Remark"
                />
              </div>
            </form>
            <div className="flex justify-end mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 ml-4 rounded"
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

export default DimensionScoreList;

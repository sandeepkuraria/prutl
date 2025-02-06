// prutl-frontend-npm6node14/src/components/aiInsightManagement/AIInsightList.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAIInsights,
  createNewAIInsight,
  updateAIInsight,
  deleteAIInsight,
} from "../../redux/slices/aiInsightSlice.js";
import ErrorModal from "../common/ErrorModal.jsx";
import { getAllUsers } from "../../redux/slices/userSlice.js";
import EditableSelectInput from "../common/EditableSelectInput .jsx";

const AIInsightList = () => {
  const dispatch = useDispatch();
  const { aiInsights, loading, error } = useSelector(
    (state) => state.aiInsights
  );
  const { users, loadingUsers, errorUsers } = useSelector(
    (state) => state.users
  );
  const [editingAIInsight, setEditingAIInsight] = useState(null);
  const [newAIInsight, setNewAIInsight] = useState({
    user_id: "",
    insight_type: "",
    insight_data: "",
    insight_date: "",
    remark: "",
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    dispatch(getAllAIInsights());
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDelete = (insightId) => {
    dispatch(deleteAIInsight(insightId));
  };

  const handleEdit = (aiInsight) => {
    setEditingAIInsight({ ...aiInsight });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingAIInsight) {
      setEditingAIInsight({ ...editingAIInsight, [name]: value });
    } else {
      setNewAIInsight({ ...newAIInsight, [name]: value });
    }
  };

  const validateForm = (formData) => {
    let newErrors = {};
    if (!formData.insight_type)
      newErrors.insight_type = "Insight Type is required";
    if (!formData.insight_data)
      newErrors.insight_data = "Insight Data is required";
    if (!formData.insight_date)
      newErrors.insight_date = "Insight Date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (editingAIInsight) {
      if (editingAIInsight.insight_id && editingAIInsight) {
        dispatch(
          updateAIInsight({
            insightId: editingAIInsight.insight_id,
            data: editingAIInsight,
          })
        );
      } else {
        console.error("Error: insightId or editingAIInsight is undefined");
      }
      setEditingAIInsight(null);
    } else {
      if (validateForm(newAIInsight)) {
        dispatch(createNewAIInsight(newAIInsight));
        setNewAIInsight({
          user_id: "",
          insight_type: "",
          insight_data: "",
          insight_date: "",
          remark: "",
        });
        setShowModal(false);
      }
    }
  };

  const handleUndo = () => {
    setEditingAIInsight(null);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setNewAIInsight({
      user_id: "",
      insight_type: "",
      insight_data: "",
      insight_date: "",
      remark: "",
    });
  };

  const handleCloseModal = () => {
    setShowError(false);
  };

  useEffect(() => {
    if (loading) {
      console.log("Loading AI insights...");
    }
    if (error) {
      console.error("Error fetching AI insights:", error);
    }
    if (aiInsights.length > 0) {
      console.log("Fetched AI insights:", aiInsights);
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
  }, [loading, error, aiInsights, users, loadingUsers, errorUsers]);

  if (loading) return <p>Loading...</p>;
  // if (error) return <p className="error-message">{error}</p>;
  if (loadingUsers) return <p>Loading users...</p>;
  if (errorUsers) return <p className="error-message">{errorUsers}</p>;

  return (
    <div className="ai-insight-list overflow-auto">
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
        Create New AI Insight
      </button>
      <div className="table-wrapper max-h-80 overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="whitespace-nowrap sticky top-0 z-30 tableHeadEditDelete">
            <tr>
              {/* <th className="px-4 py-2 whitespace-nowrap sticky top-0 left-0 z-20 tableHeadEditDelete">
            Insight ID</th> */}
              <th className="px-4 py-2 whitespace-nowrap">User Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Insight Type</th>
              <th className="px-4 py-2 whitespace-nowrap">Insight Data</th>
              <th className="px-4 py-2 whitespace-nowrap">Insight Date</th>
              <th className="px-4 py-2 whitespace-nowrap">Remark</th>
              <th className="px-4 py-2 whitespace-nowrap sticky top-0 right-0 z-20 tableHeadEditDelete">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {aiInsights.map((aiInsight) => (
              <tr key={aiInsight.insight_id}>
                {/* <td className="px-4 py-2 whitespace-nowrap sticky left-0 tableHeadEditDelete">
{aiInsight.insight_id}
                </td> */}

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingAIInsight &&
                  editingAIInsight.insight_id === aiInsight.insight_id ? (
                    <EditableSelectInput
                      name="user_id"
                      options={users.map((user) => ({
                        value: user.user_id, // Actual value (user_id)
                        label: user.name, // Display value (user.user_name)
                      }))}
                      value={editingAIInsight.user_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errors.user_id}
                      placeholder="Select User Name"
                      id="user_id"
                    />
                  ) : (
                    // aiInsight.user_id
                    // Display user name based on user_id when not in edit mode
                    users.find((user) => user.user_id === aiInsight.user_id)
                      ?.name || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingAIInsight &&
                  editingAIInsight.insight_id === aiInsight.insight_id ? (
                    <EditableSelectInput
                      name="insight_type"
                      options={aiInsights.map((aiInsight) => ({
                        value: aiInsight.insight_type, // Actual value (insight_type)
                        label: aiInsight.insight_type, // Display value (aiInsight.insight_type)
                      }))}
                      value={editingAIInsight.insight_type}
                      onChange={handleInputChange}
                      editable={true} // Allows typing and selection from dropdown
                      // error={errors.insight_type}
                      placeholder="Select Insight Type"
                      id="insight_type"
                    />
                  ) : (
                    aiInsight.insight_type
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {editingAIInsight &&
                  editingAIInsight.insight_id === aiInsight.insight_id ? (
                    <EditableSelectInput
                      name="insight_data"
                      options={aiInsights.map((aiInsight) => ({
                        value: aiInsight.insight_data, // Actual value (insight_data)
                        label: aiInsight.insight_data, // Display value (aiInsight.insight_data)
                      }))}
                      value={editingAIInsight.insight_data}
                      onChange={handleInputChange}
                      editable={true} // Allows typing and selection from dropdown
                      // error={errors.insight_data}
                      placeholder="Select Insight Data"
                      id="insight_data"
                    />
                  ) : (
                    aiInsight.insight_data
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingAIInsight &&
                  editingAIInsight.insight_id === aiInsight.insight_id ? (
                    <div className="input-group">
                      <input
                        type="date"
                        name="insight_date"
                        value={editingAIInsight.insight_date || ""}
                        onChange={handleInputChange}
                        placeholder="Insight Date"
                      />
                    </div>
                  ) : (
                    new Date(aiInsight.insight_date).toLocaleDateString()
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingAIInsight &&
                  editingAIInsight.insight_id === aiInsight.insight_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="remark"
                        value={editingAIInsight.remark || ""}
                        onChange={handleInputChange}
                        placeholder="Remark"
                      />
                    </div>
                  ) : (
                    aiInsight.remark
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap sticky right-0 tableHeadEditDelete">
                  {editingAIInsight &&
                  editingAIInsight.insight_id === aiInsight.insight_id ? (
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
                        onClick={() => handleEdit(aiInsight)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-1 rounded"
                        onClick={() => handleDelete(aiInsight.insight_id)}
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
      {/* Modal for Creating a New AI Insight */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center mt-12 z-30">
          <div className="registerCard px-6 py-1 rounded-lg shadow-lg w-full max-w-6xl">
            <h2 className="text-2xl font-semibold mb-4">
              Create New AI Insight
            </h2>
            <form className="grid grid-cols-4 gap-4">
              <EditableSelectInput
                label="User Name"
                name="user_id"
                options={users.map((user) => ({
                  value: user.user_id, // Actual value (user_id)
                  label: user.name, // Display value (user.user_name)
                }))}
                value={newAIInsight.user_id}
                onChange={handleInputChange}
                editable={false} // Allows selection from dropdown
                error={errors.user_id}
                // showRequired={true}
                placeholder="Select User Name"
                id="user_id"
              />
               <EditableSelectInput
               label="Insight Type"
                      name="insight_type"
                      options={aiInsights.map((aiInsight) => ({
                        value: aiInsight.insight_type, // Actual value (insight_type)
                        label: aiInsight.insight_type, // Display value (aiInsight.insight_type)
                      }))}
                      value={newAIInsight.insight_type}
                      onChange={handleInputChange}
                      editable={true} // Allows typing and selection from dropdown
                      error={errors.insight_type}
                      showRequired={true}
                      placeholder="Select Insight Type"
                      id="insight_type"
                    />
              
              <div className="input-group row-span-3">
                <label htmlFor="insight_data">Insight Data</label>
                <textarea
                  name="insight_data"
                  value={newAIInsight.insight_data || ""}
                  onChange={handleInputChange}
                  placeholder="Insight Data"
                  className="w-full p-2 mb-4 border rounded"
                />
                {errors.insight_data && (
                  <span className="error-message text-sm">{errors.insight_data}</span>
                )}
              </div>
              <div className="input-group row-span-3">
                <label htmlFor="insight_date">Insight Date</label>
                <input
                  type="date"
                  id="insight_date"
                  name="insight_date"
                  value={newAIInsight.insight_date}
                  onChange={handleInputChange}
                  placeholder="Insight Date"
                />
                {errors.insight_date && (
                  <span className="error-message text-sm">{errors.insight_date}</span>
                )}
              </div>
              <div className="input-group row-span-3">
                <label htmlFor="remark">Remark</label>
                <textarea
                  name="remark"
                  value={newAIInsight.remark || ""}
                  onChange={handleInputChange}
                  placeholder="Remark"
                  className="w-full p-2 mb-4 border rounded"
                />
                {errors.remark && (
                  <span className="text-red-500">{errors.remark}</span>
                )}
              </div>
              <div className="col-span-4 text-center">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded mr-4"
                  type="button"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  type="button"
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

export default AIInsightList;

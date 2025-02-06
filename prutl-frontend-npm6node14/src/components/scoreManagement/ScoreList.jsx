// prutl-frontend-npm6node14/src/components/scoreManagement/ScoreList.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllScores,
  createNewScore,
  updateScore,
  deleteScore,
} from "../../redux/slices/scoreSlice.js";
import { getAllUsers } from "../../redux/slices/userSlice.js";
import { getAllTeams } from "../../redux/slices/teamSlice.js";
import ErrorModal from "../common/ErrorModal.jsx";
import EditableSelectInput from "../common/EditableSelectInput .jsx";
import { getAllCompetitions } from "../../redux/slices/competitionSlice.js";
import { getAllEvents } from "../../redux/slices/eventSlice.js";
import { getAllCategories } from "../../redux/slices/categorySlice.js";

const ScoreList = () => {
  const dispatch = useDispatch();
  const { scores, loading, error } = useSelector((state) => state.scores);
  const { users, loadingUsers, errorUsers } = useSelector(
    (state) => state.users
  );
  const { teams, loadingTeams, errorTeams } = useSelector(
    (state) => state.teams
  );
  const { competitions, loadingCompetitions, errorCompetitions } = useSelector(
    (state) => state.competitions
  );
  const { categories, loadingCategories, errorCategories } = useSelector(
    (state) => state.categories
  );
  const { events, loadingEvents, errorEvents } = useSelector(
    (state) => state.events
  );
  const [editingScore, setEditingScore] = useState(null);
  const [newScore, setNewScore] = useState({
    user_id: null,
    team_id: null,
    score_value: null,
    category_id: null,
    assessment_date: null,
    year: null,
    month: null,
    remark: null,
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

  const getMonthName = (monthNumber) => {
    const months = [
      "", // Index 0 is unused because months start from 1
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[monthNumber] || ""; // Return the month name or an empty string if invalid
  };

  useEffect(() => {
    dispatch(getAllScores());
    dispatch(getAllUsers());
    dispatch(getAllTeams());
    // Dispatch the action to fetch events when the component mounts
    dispatch(getAllCompetitions());
    // Dispatch the action to fetch events when the component mounts
    dispatch(getAllCategories());
    // Dispatch the action to fetch events when the component mounts
    dispatch(getAllEvents());
  }, [dispatch]);

  const handleDelete = (scoreId) => {
    dispatch(deleteScore(scoreId));
  };

  const handleEdit = (score) => {
    setEditingScore({ ...score });
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   if (editingScore) {
  //     setEditingScore({ ...editingScore, [name]: value });
  //   } else {
  //     setNewScore({ ...newScore, [name]: value });
  //   }
  // };

  const combinedOptions = [
    ...teams.map((team) => ({
      value: team.team_id,
      label: `Team: ${team.team_name}`,
    })),
    ...users.map((user) => ({
      value: user.user_id,
      label: `User: ${user.name}`, // Modify based on user table structure
    })),
  ];

  const handleInputChange = (e, selectedOption) => {
    const { name } = e.target;
    const selectedValue = selectedOption
      ? selectedOption.value
      : e.target.value; // Use selectedOption if available

    // Check whether the selected option is a team or user based on the label
    const isUser = selectedOption?.label.startsWith("User:");
    const isTeam = selectedOption?.label.startsWith("Team:");

    if (isUser || isTeam) {
      const updatedScore = {
        ...(editingScore || newScore),
        user_id: isUser ? selectedValue : null, // Set user_id if it's a User
        team_id: isTeam ? selectedValue : null, // Set team_id if it's a Team
      };

      if (editingScore) {
        setEditingScore(updatedScore);
      } else {
        setNewScore(updatedScore);
      }
    } else {
      // Handle other input changes (e.g., year, month, etc.)
      const updatedScore = {
        ...(editingScore || newScore),
        [name]: selectedValue,
      };

      if (editingScore) {
        setEditingScore(updatedScore);
      } else {
        setNewScore(updatedScore);
      }
    }
  };

  const validateForm = (formData) => {
    let newErrors = {};
    // if (!formData.user_id) newErrors.user_id = "User Name is required";
    // if (!formData.team_id) newErrors.team_id = "Team Name is required";
    if (!formData.score_value) newErrors.score_value = "Score is required";
    if (!formData.assessment_date)
      newErrors.assessment_date = "Assessment Date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (editingScore) {
      if (editingScore.score_id && editingScore) {
        dispatch(
          updateScore({ scoreId: editingScore.score_id, data: editingScore })
        );
      } else {
        console.error("Error: scoreId or editingScore is undefined");
      }
      setEditingScore(null);
    } else {
      if (validateForm(newScore)) {
        dispatch(createNewScore(newScore));
        setNewScore({
          user_id: null,
          team_id: null,
          score_value: null,
          category_id: null,
          assessment_date: null,
          year: null,
          month: null,
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
      team_id: null,
      score_value: null,
      category_id: null,
      assessment_date: null,
      year: null,
      month: null,
      remark: null,
    });
  };

  const handleCloseModal = () => {
    setShowError(false);
  };

  useEffect(() => {
    if (loading) {
      console.log("Loading scores...");
    }
    if (error) {
      console.error("Error fetching scores:", error);
    }
    if (scores.length > 0) {
      console.log("Fetched scores:", scores);
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
    if (loadingTeams) {
      console.log("Loading teams...");
    }
    if (errorTeams) {
      console.error("Error fetching teams:", errorTeams);
    }
    if (teams.length > 0) {
      console.log("Fetched users:", teams);
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
    if (loadingCategories) {
      console.log("Loading categories...");
    }
    if (errorCategories) {
      console.log("Error fetching categories:", errorCategories);
    }
    if (categories.length > 0) {
      console.log("Fetched categories:", categories);
    }
  }, [
    loading,
    error,
    scores,
    users,
    loadingUsers,
    errorUsers,
    teams,
    loadingTeams,
    errorTeams,
    competitions,
    loadingCompetitions,
    errorCompetitions,
    loadingEvents,
    errorEvents,
    events,
    loadingCategories,
    errorCategories,
    categories,
  ]);

  if (loading) return <p>Loading...</p>;
  // if (error) return <p className="error-message">{error}</p>;
  if (loadingUsers) return <p>Loading users...</p>;
  if (errorUsers) return <p className="error-message">{errorUsers}</p>;
  if (loadingTeams) return <p>Loading teams...</p>;
  if (errorTeams) return <p className="error-message">{errorTeams}</p>;
  if (loadingCompetitions) return <p>Loading Competitions...</p>;
  if (errorCompetitions)
    return <p className="error-message">{errorCompetitions}</p>;
  if (loadingEvents) return <p>Loading Events...</p>;
  if (errorEvents) return <p className="error-message">{errorEvents}</p>;
  if (loadingCategories) return <p>Loading Categories...</p>;
  if (errorCategories)
    return <p className="error-message">{errorCategories}</p>;

  return (
    <div className="score-list overflow-auto">
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
          <thead className="whitespace-nowrap sticky top-0 z-30 tableHeadEditDelete  ">
            <tr>
              {/* <th className="px-4 py-2 whitespace-nowrap sticky top-0 left-0 z-20 tableHeadEditDelete">
                Score ID
              </th> */}
              {/* <th className="px-4 py-2 whitespace-nowrap">User Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Team Name</th> */}
              <th className="mx-28 px-28 py-2 whitespace-nowrap">Recipient</th>
              <th className="px-4 py-2 whitespace-nowrap">Competition Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Event Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Category Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Score Value</th>
              <th className="px-4 py-2 whitespace-nowrap">Assessment Date</th>
              <th className="px-16 py-2 mx-px-16 whitespace-nowrap">Year</th>
              <th className="px-16 py-2 mx-px-16 whitespace-nowrap">Month</th>
              <th className="px-4 py-2 whitespace-nowrap">Remark</th>
              <th className="px-4 py-2 whitespace-nowrap sticky top-0 right-0 z-20 tableHeadEditDelete">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score) => (
              <tr key={score.score_id}>
                {/* <td className="px-4 py-2 whitespace-nowrap sticky left-0 tableHeadEditDelete">
                  {score.score_id}
                </td> */}

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingScore && editingScore.score_id === score.score_id ? (
                    <EditableSelectInput
                      name={editingScore.user_id ? "user_id" : "team_id"}
                      options={combinedOptions}
                      value={editingScore.user_id || editingScore.team_id} // Set to user_id or team_id
                      onChange={(e, selectedOption) =>
                        handleInputChange(e, selectedOption)
                      } // Pass selectedOption to handleInputChange
                      editable={false}
                      placeholder="Select Recipient Name"
                      id={editingScore.user_id ? "user_id" : "team_id"}
                      renderOption={handleMouseEnter}
                    />
                  ) : (
                    (() => {
                      const recipient =
                        users.find((user) => user.user_id === score.user_id) ||
                        teams.find((team) => team.team_id === score.team_id);

                      return recipient
                        ? recipient.name || recipient.team_name // Display user name or team name based on the recipient
                        : "Unknown Recipient"; // Fallback if no match is found
                    })()
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingScore && editingScore.score_id === score.score_id ? (
                    <EditableSelectInput
                      name="competition_id"
                      options={competitions.map((competition) => ({
                        value: competition.competition_id, // Actual value (competition_id)
                        label: competition.competition_name, // Display value (competition.competition_name)
                      }))}
                      value={editingScore.competition_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errors.competition_id}
                      placeholder="Select Competition Name"
                      id="competition_id"
                      renderOption={handleMouseEnter} // Pass the mouse enter handler
                    />
                  ) : (
                    // score.competition_id
                    // Display competition name based on competition_id when not in edit mode
                    competitions.find(
                      (competition) =>
                        competition.competition_id === score.competition_id
                    )?.competition_name || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {
                    // Display event name based on hovered competition only if in editing mode
                    editingScore && editingScore.score_id === score.score_id
                      ? getEventName(
                          hoveredCompetitionId || score.competition_id
                        )
                      : getEventName(score.competition_id) // Static event name when not editing
                  }
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingScore && editingScore.score_id === score.score_id ? (
                    <EditableSelectInput
                      name="category_id"
                      options={categories.map((category) => ({
                        value: category.category_id, // Actual value (category_id)
                        label: category.category_name, // Display value (category.category_name)
                      }))}
                      value={editingScore.category_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errors.category_id}
                      placeholder="Select Category Name"
                      id="category_id"
                      renderOption={handleMouseEnter} // Pass the mouse enter handler
                    />
                  ) : (
                    // score.category_id
                    // Display category name based on category_id when not in edit mode
                    categories.find(
                      (category) => category.category_id === score.category_id
                    )?.category_name || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingScore && editingScore.score_id === score.score_id ? (
                    <EditableSelectInput
                      name="score_value"
                      options={scores.map((score) => ({
                        value: score.score_value, // Actual value (score_value)
                        label: score.score_value, // Display value (score.score_value)
                      }))}
                      value={editingScore.score_value}
                      onChange={handleInputChange}
                      editable={true} // Allows selection from dropdown
                      // error={errors.score_value}
                      isNumeric="true"
                      placeholder="Select Score Value"
                      id="score_value"
                    />
                  ) : (
                    score.score_value
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingScore && editingScore.score_id === score.score_id ? (
                    <div className="input-group">
                      <input
                        type="date"
                        name="assessment_date"
                        value={editingScore.assessment_date || ""}
                        onChange={handleInputChange}
                        placeholder="Assessment Date"
                      />
                    </div>
                  ) : (
                    new Date(score.assessment_date).toLocaleDateString()
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {editingScore && editingScore.score_id === score.score_id ? (
                    <div className="input-group">
                      <select
                        name="year"
                        value={editingScore.year || ""}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Year</option>
                        {Array.from({ length: 50 }, (_, i) => {
                          const year = new Date().getFullYear() - i;
                          return (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  ) : (
                    score.year
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingScore && editingScore.score_id === score.score_id ? (
                    <div className="input-group">
                      <select
                        name="month"
                        value={editingScore.month || ""}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Month</option>
                        {[
                          { name: "January", value: 1 },
                          { name: "February", value: 2 },
                          { name: "March", value: 3 },
                          { name: "April", value: 4 },
                          { name: "May", value: 5 },
                          { name: "June", value: 6 },
                          { name: "July", value: 7 },
                          { name: "August", value: 8 },
                          { name: "September", value: 9 },
                          { name: "October", value: 10 },
                          { name: "November", value: 11 },
                          { name: "December", value: 12 },
                        ].map((month) => (
                          <option key={month.value} value={month.value}>
                            {month.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    getMonthName(score.month) // Show month name instead of the number
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingScore && editingScore.score_id === score.score_id ? (
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
                <td className="px-4 py-2 whitespace-nowrap sticky right-0  tableHeadEditDelete">
                  {editingScore && editingScore.score_id === score.score_id ? (
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
                        className="bg-red-500 text-white px-2 py-1 my-1 rounded"
                        onClick={() => handleDelete(score.score_id)}
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
            <h2 className="text-2xl font-semibold mb-4">Register New Score</h2>
            <form className="grid grid-cols-4 gap-4">
              <EditableSelectInput
                label="Recipient Name"
                name={newScore.user_id ? "user_id" : "team_id"} // Dynamically set to "user_id" or "team_id"
                options={combinedOptions} // Combined team and user options
                value={newScore.user_id || newScore.team_id} // Set to user_id or team_id based on current state
                onChange={(e, selectedOption) =>
                  handleInputChange(e, selectedOption)
                } // Pass selectedOption to handleInputChange
                editable={false}
                placeholder="Select Recipient Name"
                id={newScore.user_id ? "user_id" : "team_id"} // Dynamically set ID based on selected value
                renderOption={handleMouseEnter} // Handle hovering event (optional)
              />

              <EditableSelectInput
                label="Competition Name"
                name="competition_id"
                options={competitions.map((competition) => ({
                  value: competition.competition_id, // Actual value (competition_id)
                  label: competition.competition_name, // Display value (competition.competition_name)
                }))}
                value={newScore.competition_id}
                onChange={handleInputChange}
                editable={false} // Allows selection from dropdown
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
                    setHoveredCompetitionId(newScore.competition_id)
                  } // To handle focus
                  onBlur={() => setHoveredCompetitionId(null)} // To clear on blur
                >
                  {
                    // Display event name based on hovered competition only if in create mode
                    newScore && newScore.score_id === scores.score_id
                      ? getEventName(
                          hoveredCompetitionId || newScore.competition_id
                        )
                      : getEventName(newScore.competition_id) // Static event name when not editing
                  }
                </div>
              </div>

              <EditableSelectInput
                label="Category"
                name="category_id"
                options={categories.map((category) => ({
                  value: category.category_id, // Actual value (category_id)
                  label: category.category_name, // Display value (category.category_name)
                }))}
                value={newScore.category_id}
                onChange={handleInputChange}
                editable={false} // Allows selection from dropdown
                error={errors.category_id}
                placeholder="Select Category Name"
                id="category_id"
                renderOption={handleMouseEnter} // Pass the mouse enter handler
              />

              <EditableSelectInput
                label="Score"
                name="score_value"
                options={scores.map((score) => ({
                  value: score.score_value, // Actual value (score_value)
                  label: score.score_value, // Display value (score.score_value)
                }))}
                value={newScore.score_value}
                onChange={handleInputChange}
                editable={true} // Allows selection from dropdown
                error={errors.score_value}
                showRequired="true"
                isNumeric="true"
                placeholder="Select Score Value"
                id="score_value"
              />

              <div className="input-group row-span-3">
                <label htmlFor="assessment_date">
                  Assessment Date <span className="error-message">*</span>
                </label>
                <input
                  type="date"
                  name="assessment_date"
                  value={newScore.assessment_date || ""}
                  onChange={handleInputChange}
                  placeholder="Assessment Date"
                  className="w-full p-2 mb-4 border rounded"
                />
                {errors.assessment_date && (
                  <p className="error-message text-sm">
                    {errors.assessment_date}
                  </p>
                )}
              </div>

              <div className="input-group row-span-3">
                <label htmlFor="year">Year</label>
                <select
                  name="year"
                  value={newScore.year || ""}
                  onChange={handleInputChange}
                >
                  <option value="">Select Year</option>
                  {Array.from({ length: 50 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="input-group row-span-3">
                <label htmlFor="month">Month</label>
                <select
                  name="month"
                  value={newScore.month || ""}
                  onChange={handleInputChange}
                >
                  <option value="">Select Month</option>
                  {[
                    { name: "January", value: 1 },
                    { name: "February", value: 2 },
                    { name: "March", value: 3 },
                    { name: "April", value: 4 },
                    { name: "May", value: 5 },
                    { name: "June", value: 6 },
                    { name: "July", value: 7 },
                    { name: "August", value: 8 },
                    { name: "September", value: 9 },
                    { name: "October", value: 10 },
                    { name: "November", value: 11 },
                    { name: "December", value: 12 },
                  ].map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-group row-span-3">
                <label htmlFor="remark">Remark</label>
                <textarea
                  name="remark"
                  value={newScore.remark || ""}
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
export default ScoreList;

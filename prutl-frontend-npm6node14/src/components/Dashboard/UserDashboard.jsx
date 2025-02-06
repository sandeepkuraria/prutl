// prutl-frontend-npm6node14/src/components/scoreManagement/UserDashboard.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllScores } from "../../redux/slices/scoreSlice.js";
import { getAllUsers } from "../../redux/slices/userSlice.js";
import { getAllTeams } from "../../redux/slices/teamSlice.js";

import { getAllCompetitions } from "../../redux/slices/competitionSlice.js";
import { getAllEvents } from "../../redux/slices/eventSlice.js";

import ScoreChart from "../common/ScoreChart.jsx";
import { getAllCategories } from "../../redux/slices/categorySlice.js";

const UserDashboard = () => {
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
  const [filters, setFilters] = useState({
    competition: "",
    category: "",
    team: "",
    user: "",
    year: "",
  });
  const [selectedScore, setSelectedScore] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    dispatch(getAllCategories());
    // Dispatch the action to fetch events when the component mounts
    dispatch(getAllEvents());
  }, [dispatch]);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   if (editingScore) {
  //     setEditingScore({ ...editingScore, [name]: value });
  //   } else {
  //     setNewScore({ ...newScore, [name]: value });
  //   }
  // };

  //   const combinedOptions = [
  //     ...teams.map((team) => ({
  //       value: team.team_id,
  //       label: `Team: ${team.team_name}`,
  //     })),
  //     ...users.map((user) => ({
  //       value: user.user_id,
  //       label: `User: ${user.name}`, // Modify based on user table structure
  //     })),
  //   ];

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
  if (errorCategories) return <p className="error-message">{errorCategories}</p>;

  // Helper function to get competition name
  const getCompetitionName = (score) => {
    const competition = competitions.find(
      (competition) => competition.competition_id === score.competition_id
    );
    return competition ? competition.competition_name : "Unknown Competition";
  };
  
  const getCategoryName = (score) => {
    const category = categories.find(
      (category) => category.category_id === score.category_id
    );
    return category ? category.category_name : "Unknown Category";
  };

  const getUserName = (score) => {
    const userName = users.find((e) => e.user_id === score.user_id);

    return userName ? userName.name : "Unknown User";
  };
  const getTeamName = (score) => {
    const teamName = teams.find((e) => e.team_id === score.team_id);

    return teamName ? teamName.team_name : "Unknown Team";
  };
  // Helper function to get user or team name
  const getUserOrTeamName = (score) => {
    const recipient =
      users.find((user) => user.user_id === score.user_id) ||
      teams.find((team) => team.team_id === score.team_id);

    return recipient
      ? recipient.name || recipient.team_name // Display user name or team name based on the recipient
      : "Unknown Recipient"; // Fallback if no match is found
  };
  const filteredScores = scores.filter((score) => {
    return (
      (!filters.user || score.user_id === Number(filters.user)) &&
      (!filters.competition ||
        score.competition_id === Number(filters.competition)) &&
      (!filters.category ||
        score.category_id === Number(filters.category)) &&
      (!filters.team || score.team_id === Number(filters.team)) &&
      (!filters.year || score.year === Number(filters.year)) &&
      (!filters.month || score.month === Number(filters.month)) // Add this line for month filter
    );
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value, // Update filters dynamically
    });
  };
  //   console.log('Filters:', filters);
  //   scores.forEach(score => console.log('Score:', score));

  console.log("Current Filters:", filters);
  console.log("Filtered Scores:", filteredScores);

  const handleResetFilters = () => {
    setFilters({
      competition: "",
      category: "",
      team: "",
      user: "",
      year: "",
      month: "", // Reset the month filter as well
    });
  };

  // Modal component for showing score details
const ScoreDetailsModal = ({ score, isOpen, onClose, getTeamName, getCompetitionName, getCategoryName, getEventName, getMonthName }) => {
  if (!isOpen || !score) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="registerCard p-6 rounded-lg shadow-lg w-1/2 max-w-lg">
        <h3 className="text-lg font-bold mb-4">Score Details</h3>
        <p><strong>Team:</strong> {getTeamName(score)}</p>
        <p><strong>Competition:</strong> {getCompetitionName(score)}</p>
        <p><strong>Event:</strong> {getEventName(score.competition_id)}</p>
        <p><strong>Category:</strong> {getCategoryName(score)}</p>
        <p><strong>Score:</strong> {score.score_value.toFixed(2)}</p>
        <p><strong>Month:</strong> {getMonthName(score.month)}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};


  const handleScoreClick = (score) => {
    setSelectedScore(score);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedScore(null);
  };
  return (
    <div>
      <div className="loginFormContainer my-3 py-3 px-1">
        <h2 className="text-xl font-bold">Top Scores</h2>
        <div className="leaderboard registerCard p-4">
  <div className="grid grid-cols-3 gap-4">
    {[...scores] // Create a shallow copy of the array
      .sort((a, b) => b.score_value - a.score_value) // Sort by top score
      .slice(0, 3) // Show top 3 scores
      .map((topScore, index) => (
        <div
          key={topScore.score_id}
          className="loginFormContainer p-3 rounded-lg shadow-md flex flex-col items-center justify-center"
        >
          <button
            onClick={() => handleScoreClick(topScore)}
            className="text-home hover:underline focus:outline-none text-center"
          >
            <span className="block font-semibold">
              {index + 1}. {getUserOrTeamName(topScore)}
            </span>
            <span className="text-lg font-bold">{topScore.score_value.toFixed(2)}</span>
          </button>
        </div>
      ))}
  </div>

  {/* Render the modal for selected score details */}
  <ScoreDetailsModal
    score={selectedScore}
    isOpen={isModalOpen}
    onClose={closeModal}
    getTeamName={getTeamName}
    getCompetitionName={getCompetitionName}
    getCategoryName={getCategoryName}
    getEventName={getEventName}
    getMonthName={getMonthName}
  />
</div>

        <div className="flex items-center justify-between">
          
          <div className="filters flex justify-between mb-4 mt-2">
            <select
              onChange={handleFilterChange}
              name="competition"
              value={filters.competition} // Bind to filter state
              className="mx-2 loginFormContainer"
            >
              <option value="">All Competitions</option>
              {competitions.map((comp) => (
                <option key={comp.competition_id} value={comp.competition_id}>
                  {comp.competition_name}
                </option>
              ))}
            </select>
            <select
              onChange={handleFilterChange}
              name="category"
              value={filters.category} // Bind to filter state
              className="mx-2 loginFormContainer"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
            </select>

            <select
              onChange={handleFilterChange}
              name="year"
              value={filters.year} // Bind to filter state
              className="mx-2 loginFormContainer"
            >
              <option value="">All Years</option>
              {[...new Set(scores.map((score) => score.year))].map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <select
              onChange={handleFilterChange}
              name="month"
              value={filters.month} // Bind to filter state
              className="mx-2 loginFormContainer"
            >
              <option value="">All Months</option>
              {[...new Set(scores.map((score) => score.month))].map((month) => (
                <option key={month} value={month}>
                  {getMonthName(month)}
                </option>
              ))}
            </select>

            <select
              onChange={handleFilterChange}
              name="user"
              value={filters.user} // Bind to filter state
              className="mx-2 loginFormContainer"
            >
              <option value="">All Users</option>
              {users.map((user) => (
                <option key={user.user_id} value={user.user_id}>
                  {user.name}
                </option>
              ))}
            </select>

            <select
              onChange={handleFilterChange}
              name="team"
              value={filters.team} // Bind to filter state
              className="mx-2 loginFormContainer"
            >
              <option value="">All Teams</option>
              {teams.map((team) => (
                <option key={team.team_id} value={team.team_id}>
                  {team.team_name}
                </option>
              ))}
            </select>

            {/* Reset Button */}
            <button
              onClick={handleResetFilters}
              className=" inline-block button-bg text-lg font-semibold text-white px-4 py-2 rounded-md"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* <div className="score-list grid grid-cols-3 gap-4 p-4">
        {scores.map((score) => (
          <div
            key={score.score_id}
            className="score-card bg-white shadow-md p-4 rounded-lg"
          >
            <h3 className="font-semibold">{getUserOrTeamName(score)}</h3>
            <p>Competition: {getCompetitionName(score)}</p>
            <p>Event: {getEventName(score.competition_id)}</p>
            <p>Score: {score.score_value}</p>
            <p>Date: {new Date(score.assessment_date).toLocaleDateString()}</p>
            <p>Year: {score.year}</p>
            <p>Month: {getMonthName(score.month)}</p>
            <p>Remark: {score.remark}</p>
          </div>
        ))}
      </div> */}

      {/* Filtered Scores Table */}
      <div className="filtered-scores-table p-4 loginFormContainer">
        <h2 className="text-xl font-bold mb-4">Filtered Scores</h2>
        {filteredScores.length > 0 ? (
          <table className="min-w-full registerCard border-collapse border border-gray-200 ">
            <thead>
              <tr>
                {/* <th className="border border-gray-200 px-4 py-2">User/Team</th> */}
                <th className="border border-gray-200 px-4 py-2">User</th>
                <th className="border border-gray-200 px-4 py-2">Team</th>
                <th className="border border-gray-200 px-4 py-2">
                  Competition
                </th>
                <th className="border border-gray-200 px-4 py-2">
                  Category
                </th>
                <th className="border border-gray-200 px-4 py-2">Event</th>
                <th className="border border-gray-200 px-4 py-2">Score</th>
                <th className="border border-gray-200 px-4 py-2">Date</th>
                <th className="border border-gray-200 px-4 py-2">Year</th>
                <th className="border border-gray-200 px-4 py-2">Month</th>
                <th className="border border-gray-200 px-4 py-2">Remark</th>
              </tr>
            </thead>
            <tbody>
              {filteredScores.map((score) => (
                <tr key={score.score_id}>
                  {/* <td className="border border-gray-200 px-4 py-2">{getUserOrTeamName(score)}</td> */}
                  <td className="border border-gray-200 px-4 py-2">
                    {getUserName(score)}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {getTeamName(score)}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {getCompetitionName(score)}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {getCategoryName(score)}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {getEventName(score.competition_id)}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {/* {score.score_value} */}
                    {score.score_value ? score.score_value.toFixed(2) : "0.00"}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {new Date(score.assessment_date).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {score.year}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {getMonthName(score.month)}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {score.remark}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No filtered scores available.</p>
        )}
      </div>

      {/* Bar Chart */}
      <div className="mt-6">
        <h2 className="text-xl font-bold">Score Chart</h2>
        {filteredScores.length > 0 ? (
          <ScoreChart
            scores={filteredScores.slice(0, 10)}
            competitions={competitions}
          />
        ) : (
          // <ScoreChart scores={filteredScores.slice(0, 10)} />
          <p>No scores available for this chart.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;

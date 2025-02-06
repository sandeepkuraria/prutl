import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { useEffect, useState } from 'react';
  import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../redux/slices/userSlice';
import { getAllTeams } from '../../redux/slices/teamSlice';
  
  
  // Register the components
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  
  const ScoreChart = ({ scores, competitions }) => {
    const dispatch = useDispatch();
      // State to toggle between displaying users or teams
  const [showUsers, setShowUsers] = useState(true);

    useEffect(() => {
        // dispatch(getAllScores());
        dispatch(getAllUsers());
        dispatch(getAllTeams());
        // Dispatch the action to fetch events when the component mounts
        // dispatch(getAllCompetitions());
        // // Dispatch the action to fetch events when the component mounts
        // dispatch(getAllEvents());
      }, [dispatch]);

    const { users, loadingUsers, errorUsers } = useSelector(
        (state) => state.users
      );
      const { teams, loadingTeams, errorTeams } = useSelector(
        (state) => state.teams
      );
 // Function to get either user or team names based on the toggle state
 const getUserOrTeamName = (score) => {
  let name = "";

    if (showUsers) {
      const user = users.find((user) => user.user_id === score.user_id);
   name = user ? user.name : "Unknown User";
    } else {
      const team = teams.find((team) => team.team_id === score.team_id);
     name = team ? team.team_name : "Unknown Team";
    }

      // Find competition name
      const competition = competitions.find(
        (comp) => comp.competition_id === score.competition_id
      );
      const competitionName = competition ? competition.competition_name : "Unknown Competition";
  
      return `${name} (${competitionName})`;
  };

     // Modify this function to return the name based on user_id or team_id
//   const getUserOrTeamName = (score) => {
//     const user = users.find((user) => user.user_id === score.user_id);
//     const team = teams.find((team) => team.team_id === score.team_id);
//     return user ? user.name : team ? team.team_name : "Unknown Recipient";
//   };

 // Toggle function to switch between users and teams
 const toggleLabels = () => {
    setShowUsers((prevShowUsers) => !prevShowUsers);
  };

    const data = {
        labels: scores.map(score => getUserOrTeamName(score)), // Use the function to get user/team names
        // labels: scores.map(score => score.score_id), // Update labels as per your data structure
    datasets: [
        {
          label: 'Scores',
          data: scores.map(score => score.score_value), // Update data as per your structure
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  
    // const options = {
    //   responsive: true,
    //   scales: {
    //     x: {
    //       beginAtZero: true,
    //     },
    //     y: {
    //       beginAtZero: true,
    //     },
    //   },
    // };
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            autoSkip: false, // Show all labels without skipping
            maxTicksLimit: scores.length, // Display all entries (adjust if you have a very large dataset)
            font: {
              size: 10, // Reduce font size if needed to fit more labels
            },
          },
        },
        y: {
          beginAtZero: true,
          max: Math.max(...scores.map(score => score.score_value)) + 100, // Ensure y-axis covers the highest score
        },
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
      },
    };
    
    
    
    
    useEffect(() => {
      
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
      }, [
       
        users,
        loadingUsers,
        errorUsers,
        teams,
        loadingTeams,
        errorTeams,
       
      ]);
    
    //   if (loading) return <p>Loading...</p>;
      // if (error) return <p className="error-message">{error}</p>;
      if (loadingUsers) return <p>Loading users...</p>;
      if (errorUsers) return <p className="error-message">{errorUsers}</p>;
      if (loadingTeams) return <p>Loading teams...</p>;
      if (errorTeams) return <p className="error-message">{errorTeams}</p>;
    
    
  
    return (
        <div>
          <div className="flex justify-between items-center mb-4">
            {/* <h2 className="text-xl font-bold">Score Chart</h2> */}
            <button
              onClick={toggleLabels}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {showUsers ? "Show Team Names" : "Show User Names"}
            </button>
          </div>
               
                {/* <div style={{ width: '600px' }}> 
          <div style={{ minWidth: '1200px', height: '600px' }}> 
          <Bar data={data} options={options} />
</div>

</div> */}
<div style={{ width: '800px', height: '600px' }}> {/* Set custom chart size */}
          <Bar data={data} options={options} />
</div>
 {/* <div style={{ width: '100%', overflowX: 'auto' }}> 
      <div style={{ minWidth: '1200px', height: '600px' }}> 
        <Bar data={data} options={options} />
      </div>
    </div> */}
        </div>
      );
  };
  
  export default ScoreChart;
  
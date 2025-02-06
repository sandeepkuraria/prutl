//prutl-frontend-npm6node14/src/utils/api.js
import { REACT_APP_API_URL } from "./endpoint";

// const getToken = () => localStorage.getItem('token');
const getToken = () => {
  return sessionStorage.getItem("token") || localStorage.getItem("token");
};

const getHeaders = () => {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

export const login = async (email, password, keepSignedIn) => {
  const response = await fetch(`${REACT_APP_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, keepSignedIn }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    // console.log("errorData for login +++++++++", errorData.message)
    throw new Error(errorData.message || "Email or Password is incorrect");
  }

  return response.json();
};
//registration by user, first time signup without login
export const register = async (data) => {
  const response = await fetch(`${REACT_APP_API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Registration failed");
  }

  return response.json();
};

// //registration by admin when logged in, not by user.
// export const registerByAdmin = async (data) => {
//   const response = await fetch(`${REACT_APP_API_URL}/auth/register`, {
//     method: "POST",
//     headers: getHeaders(),
//     body: data,
//   });
// console.log("response by registerByAdmin", response)
 
//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.error.message || "Registration failed");
//   }

//   return response.json();
// };

export const registerByAdmin = async (data) => {
  const token = getToken();

  const response = await fetch(`${REACT_APP_API_URL}/auth/register`, {
    method: "POST",
    headers: {
      Authorization: token ? `Bearer ${token}` : "", // Only set Authorization header
    },
    // Do NOT include headers, let fetch automatically handle it for FormData
    body: data, // FormData object containing the file and other form fields
  });

  console.log("response by registerByAdmin", response);

  if (!response.ok) {
    const errorData = await response.json();
console.error("Error response from server:", errorData);
throw new Error(errorData.error.message || "Registration failed");

  }

  return response.json();
};


export const fetchAllUsers = async () => {
  const response = await fetch(`${REACT_APP_API_URL}/users`, {
    method: "GET",
    headers: getHeaders(),
  });
  // if (!response.ok) {
  //   throw new Error('Fetching users failed');
  // }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching users failed");
  }

  return response.json(); // Return the array of users
};

export const fetchUserById = async (userId) => {
  const response = await fetch(`${REACT_APP_API_URL}/users/${userId}`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching user failed");
  }

  return response.json();
};

export const updateUserById = async (userId, data) => {
  const token = getToken();

  const response = await fetch(`${REACT_APP_API_URL}/users/${userId}`, {
    method: "PUT",
    // headers: getHeaders(),
    headers: {
      Authorization: token ? `Bearer ${token}` : "", // Only set Authorization header
    },
    // Do NOT include headers, let fetch automatically handle it for FormData
    body: data, // FormData object containing the file and other form fields
  
  });
console.log("updateUserById response+++++++++++",response)
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Updating user failed");
  }

  return response.json();
};

export const deleteUserById = async (userId) => {
  const response = await fetch(`${REACT_APP_API_URL}/users/${userId}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Deleting user failed");
  }
};

// Membership APIs

export const createMembership = async (data) => {
  const response = await fetch(`${REACT_APP_API_URL}/memberships`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Creating membership failed");
  }

  return response.json();
};

export const fetchAllMemberships = async () => {
  const response = await fetch(`${REACT_APP_API_URL}/memberships`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching memberships failed");
  }

  return response.json();
};

export const fetchMembershipById = async (membershipId) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/memberships/${membershipId}`,
    {
      method: "GET",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching membership failed");
  }

  return response.json();
};

export const updateMembershipById = async (membershipId, data) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/memberships/${membershipId}`,
    {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Updating membership failed");
  }

  return response.json();
};

export const deleteMembershipById = async (membershipId) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/memberships/${membershipId}`,
    {
      method: "DELETE",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Deleting membership failed");
  }
};

// Organization APIs

export const createOrganization = async (data) => {
  const response = await fetch(`${REACT_APP_API_URL}/organizations`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Creating organization failed");
  }

  return response.json();
};

export const fetchAllOrganizations = async () => {
  const response = await fetch(`${REACT_APP_API_URL}/organizations`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching organizations failed");
  }

  return response.json();
};

export const fetchOrganizationById = async (orgId) => {
  const response = await fetch(`${REACT_APP_API_URL}/organizations/${orgId}`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching organization failed");
  }

  return response.json();
};

export const updateOrganizationById = async (orgId, data) => {
  const response = await fetch(`${REACT_APP_API_URL}/organizations/${orgId}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Updating organization failed");
  }

  return response.json();
};

export const deleteOrganizationById = async (orgId) => {
  const response = await fetch(`${REACT_APP_API_URL}/organizations/${orgId}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Deleting organization failed");
  }
};

// Event APIs

export const createEvent = async (data) => {
  const response = await fetch(`${REACT_APP_API_URL}/events`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Creating event failed");
  }

  return response.json();
};

export const fetchAllEvents = async () => {
  const response = await fetch(`${REACT_APP_API_URL}/events`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching events failed");
  }

  return response.json();
};

export const fetchEventById = async (eventId) => {
  const response = await fetch(`${REACT_APP_API_URL}/events/${eventId}`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching event failed");
  }

  return response.json();
};

export const updateEventById = async (eventId, data) => {
  const response = await fetch(`${REACT_APP_API_URL}/events/${eventId}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Updating event failed");
  }

  return response.json();
};

export const deleteEventById = async (eventId) => {
  const response = await fetch(`${REACT_APP_API_URL}/events/${eventId}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Deleting event failed");
  }
};

// Competition APIs

export const createCompetition = async (data) => {
  const response = await fetch(`${REACT_APP_API_URL}/competitions`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Creating competition failed");
  }

  return response.json();
};

export const fetchAllCompetitions = async () => {
  const response = await fetch(`${REACT_APP_API_URL}/competitions`, {
    method: "GET",
    headers: getHeaders(),
  });

  // if (!response.ok) {
  //   const errorData = await response.json();
  //   throw new Error(errorData.error.message || "Fetching competitions failed");
  // }
  if (!response.ok) {
    const errorData = await response.json();
    if (response.status === 404) {
      throw new Error("No competitions found (404 Not Found)");
    } else if (response.status === 500) {
      throw new Error("Server error (500 Internal Server Error)");
    } else {
      throw new Error(
        errorData.error.message || "Fetching competitions failed"
      );
    }
  }
  
  // Handle cases where the response isn't valid JSON
  if (!response || typeof response !== "object") {
    throw new Error("Invalid JSON response");
  }

  return response.json();
};

export const fetchCompetitionById = async (competitionId) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/competitions/${competitionId}`,
    {
      method: "GET",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching competition failed");
  }

  return response.json();
};

export const updateCompetitionById = async (competitionId, data) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/competitions/${competitionId}`,
    {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Updating competition failed");
  }

  return response.json();
};

export const deleteCompetitionById = async (competitionId) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/competitions/${competitionId}`,
    {
      method: "DELETE",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Deleting competition failed");
  }
};

// Event Schedule APIs

export const createEventSchedule = async (data) => {
  const response = await fetch(`${REACT_APP_API_URL}/event-schedules`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Creating event schedule failed");
  }

  return response.json();
};

export const fetchAllEventSchedules = async () => {
  const response = await fetch(`${REACT_APP_API_URL}/event-schedules`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching event schedules failed");
  }

  return response.json();
};

export const fetchEventScheduleById = async (scheduleId) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/event-schedules/${scheduleId}`,
    {
      method: "GET",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching event schedule failed");
  }

  return response.json();
};

export const updateEventScheduleById = async (scheduleId, data) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/event-schedules/${scheduleId}`,
    {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Updating event schedule failed");
  }

  return response.json();
};

export const deleteEventScheduleById = async (scheduleId) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/event-schedules/${scheduleId}`,
    {
      method: "DELETE",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Deleting event schedule failed");
  }
};

// Stream APIs

export const createStream = async (data) => {
  const response = await fetch(`${REACT_APP_API_URL}/streams`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Creating stream failed");
  }

  return response.json();
};

export const fetchAllStreams = async () => {
  const response = await fetch(`${REACT_APP_API_URL}/streams`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching streams failed");
  }

  return response.json();
};

export const fetchStreamById = async (streamId) => {
  const response = await fetch(`${REACT_APP_API_URL}/streams/${streamId}`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching stream failed");
  }

  return response.json();
};

export const updateStreamById = async (streamId, data) => {
  const response = await fetch(`${REACT_APP_API_URL}/streams/${streamId}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Updating stream failed");
  }

  return response.json();
};

export const deleteStreamById = async (streamId) => {
  const response = await fetch(`${REACT_APP_API_URL}/streams/${streamId}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Deleting stream failed");
  }
};

// Participant APIs

export const createParticipant = async (data) => {
  const response = await fetch(`${REACT_APP_API_URL}/participants`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Creating participant failed");
  }

  return response.json();
};

export const fetchAllParticipants = async () => {
  const response = await fetch(`${REACT_APP_API_URL}/participants`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching participants failed");
  }

  return response.json();
};

export const fetchParticipantById = async (participantId) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/participants/${participantId}`,
    {
      method: "GET",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching participant failed");
  }

  return response.json();
};

export const updateParticipantById = async (participantId, data) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/participants/${participantId}`,
    {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Updating participant failed");
  }

  return response.json();
};

export const deleteParticipantById = async (participantId) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/participants/${participantId}`,
    {
      method: "DELETE",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Deleting participant failed");
  }
};

// Sponsors APIs

export const createSponsor = async (data) => {
  const response = await fetch(`${REACT_APP_API_URL}/sponsors`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Creating sponsor failed");
  }

  return response.json();
};

export const fetchAllSponsors = async () => {
  const response = await fetch(`${REACT_APP_API_URL}/sponsors`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching sponsors failed");
  }

  return response.json();
};

export const fetchSponsorById = async (sponsorId) => {
  const response = await fetch(`${REACT_APP_API_URL}/sponsors/${sponsorId}`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching sponsor failed");
  }

  return response.json();
};

export const updateSponsorById = async (sponsorId, data) => {
  const response = await fetch(`${REACT_APP_API_URL}/sponsors/${sponsorId}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Updating sponsor failed");
  }

  return response.json();
};

export const deleteSponsorById = async (sponsorId) => {
  const response = await fetch(`${REACT_APP_API_URL}/sponsors/${sponsorId}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Deleting sponsor failed");
  }
};

// Teams APIs

export const createTeam = async (data) => {
  const token = getToken();
 
  const response = await fetch(`${REACT_APP_API_URL}/teams`, {
    method: "POST",
    headers: {
      Authorization: token ? `Bearer ${token}` : "", // Only set Authorization header
    },
    // Do NOT include headers, let fetch automatically handle it for FormData
    body: data, // FormData object containing the file and other form fields
    // headers: getHeaders(),
    // body: JSON.stringify(data),
  });

  console.log("response by createTeam", response);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Creating team failed");
  }

  return response.json();
};

export const fetchAllTeams = async () => {
  const response = await fetch(`${REACT_APP_API_URL}/teams`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching teams failed");
  }

  return response.json();
};

export const fetchTeamById = async (teamId) => {
  const response = await fetch(`${REACT_APP_API_URL}/teams/${teamId}`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching team failed");
  }

  return response.json();
};

export const updateTeamById = async (teamId, data) => {
  const token = getToken();

  const response = await fetch(`${REACT_APP_API_URL}/teams/${teamId}`, {
    method: "PUT",
    headers: {
      Authorization: token ? `Bearer ${token}` : "", // Only set Authorization header
    },
    // Do NOT include headers, let fetch automatically handle it for FormData
    body: data, // FormData object containing the file and other form fields
    // headers: getHeaders(),
    // body: JSON.stringify(data),
  });

  console.log("response by updateTeamById", response);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Updating team failed");
  }

  return response.json();
};

export const deleteTeamById = async (teamId) => {
  const response = await fetch(`${REACT_APP_API_URL}/teams/${teamId}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Deleting team failed");
  }
};

// Committees APIs

export const createCommittee = async (data) => {
  const response = await fetch(`${REACT_APP_API_URL}/committees`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Creating committee failed");
  }

  return response.json();
};

export const fetchAllCommittees = async () => {
  const response = await fetch(`${REACT_APP_API_URL}/committees`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching committees failed");
  }

  return response.json();
};

export const fetchCommitteeById = async (committeeId) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/committees/${committeeId}`,
    {
      method: "GET",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching committee failed");
  }

  return response.json();
};

export const updateCommitteeById = async (committeeId, data) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/committees/${committeeId}`,
    {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Updating committee failed");
  }

  return response.json();
};

export const deleteCommitteeById = async (committeeId) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/committees/${committeeId}`,
    {
      method: "DELETE",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Deleting committee failed");
  }
};

// CommitteeMembers APIs

export const createCommitteeMember = async (data) => {
  const response = await fetch(`${REACT_APP_API_URL}/committee-members`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Creating committee member failed");
  }

  return response.json();
};

export const fetchAllCommitteeMembers = async () => {
  const response = await fetch(`${REACT_APP_API_URL}/committee-members`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching committee members failed");
  }

  return response.json();
};

export const fetchCommitteeMemberById = async (committeeMemberId) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/committee-members/${committeeMemberId}`,
    {
      method: "GET",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching committee member failed");
  }

  return response.json();
};

export const updateCommitteeMemberById = async (committeeMemberId, data) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/committee-members/${committeeMemberId}`,
    {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Updating committee member failed");
  }

  return response.json();
};

export const deleteCommitteeMemberById = async (committeeMemberId) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/committee-members/${committeeMemberId}`,
    {
      method: "DELETE",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Deleting committee member failed");
  }
};

// Awards APIs

export const createAward = async (data) => {
  const response = await fetch(`${REACT_APP_API_URL}/awards`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Creating award failed");
  }

  return response.json();
};

export const fetchAllAwards = async () => {
  const response = await fetch(`${REACT_APP_API_URL}/awards`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching awards failed");
  }

  return response.json();
};

export const fetchAwardById = async (awardId) => {
  const response = await fetch(`${REACT_APP_API_URL}/awards/${awardId}`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching award failed");
  }

  return response.json();
};

export const updateAwardById = async (awardId, data) => {
  const response = await fetch(`${REACT_APP_API_URL}/awards/${awardId}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Updating award failed");
  }

  return response.json();
};

export const deleteAwardById = async (awardId) => {
  const response = await fetch(`${REACT_APP_API_URL}/awards/${awardId}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Deleting award failed");
  }
};

// Scores APIs

export const createScore = async (data) => {
  const response = await fetch(`${REACT_APP_API_URL}/scores`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Creating score failed");
  }

  return response.json();
};

export const fetchAllScores = async () => {
  const response = await fetch(`${REACT_APP_API_URL}/scores`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching scores failed");
  }

  return response.json();
};

export const fetchScoreById = async (scoreId) => {
  const response = await fetch(`${REACT_APP_API_URL}/scores/${scoreId}`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching score failed");
  }

  return response.json();
};

export const updateScoreById = async (scoreId, data) => {
  const response = await fetch(`${REACT_APP_API_URL}/scores/${scoreId}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Updating score failed");
  }

  return response.json();
};

export const deleteScoreById = async (scoreId) => {
  const response = await fetch(`${REACT_APP_API_URL}/scores/${scoreId}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Deleting score failed");
  }
};

// Sponsorships APIs

export const createSponsorship = async (data) => {
  const response = await fetch(`${REACT_APP_API_URL}/sponsorships`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Creating sponsorship failed");
  }

  return response.json();
};

export const fetchAllSponsorships = async () => {
  const response = await fetch(`${REACT_APP_API_URL}/sponsorships`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching sponsorships failed");
  }

  return response.json();
};

export const fetchSponsorshipById = async (sponsorshipId) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/sponsorships/${sponsorshipId}`,
    {
      method: "GET",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching sponsorship failed");
  }

  return response.json();
};

export const updateSponsorshipById = async (sponsorshipId, data) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/sponsorships/${sponsorshipId}`,
    {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Updating sponsorship failed");
  }

  return response.json();
};

export const deleteSponsorshipById = async (sponsorshipId) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/sponsorships/${sponsorshipId}`,
    {
      method: "DELETE",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Deleting sponsorship failed");
  }
};

// passionFrameworkDimensions APIs

export const createPassionFrameworkDimension = async (data) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/passion-framework-dimensions`,
    {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.error.message || "Creating Passion Framework Dimension failed"
    );
  }

  return response.json();
};

export const fetchAllPassionFrameworkDimensions = async () => {
  const response = await fetch(
    `${REACT_APP_API_URL}/passion-framework-dimensions`,
    {
      method: "GET",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.error.message || "Fetching Passion Framework Dimensions failed"
    );
  }

  return response.json();
};

export const fetchPassionFrameworkDimensionById = async (dimensionId) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/passion-framework-dimensions/${dimensionId}`,
    {
      method: "GET",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.error.message || "Fetching Passion Framework Dimension failed"
    );
  }

  return response.json();
};

export const updatePassionFrameworkDimensionById = async (
  dimensionId,
  data
) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/passion-framework-dimensions/${dimensionId}`,
    {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.error.message || "Updating Passion Framework Dimension failed"
    );
  }

  return response.json();
};

export const deletePassionFrameworkDimensionById = async (dimensionId) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/passion-framework-dimensions/${dimensionId}`,
    {
      method: "DELETE",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.error.message || "Deleting Passion Framework Dimension failed"
    );
  }
};

// DimensionScores APIs

export const createDimensionScore = async (data) => {
  const response = await fetch(`${REACT_APP_API_URL}/dimension-scores`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Creating Dimension Score failed");
  }

  return response.json();
};

export const fetchAllDimensionScores = async () => {
  const response = await fetch(`${REACT_APP_API_URL}/dimension-scores`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching Dimension Scores failed");
  }

  return response.json();
};

export const fetchDimensionScoreById = async (dimensionScoreId) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/dimension-scores/${dimensionScoreId}`,
    {
      method: "GET",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching Dimension Score failed");
  }

  return response.json();
};

export const updateDimensionScoreById = async (dimensionScoreId, data) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/dimension-scores/${dimensionScoreId}`,
    {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Updating Dimension Score failed");
  }

  return response.json();
};

export const deleteDimensionScoreById = async (dimensionScoreId) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/dimension-scores/${dimensionScoreId}`,
    {
      method: "DELETE",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Deleting Dimension Score failed");
  }
};

// UserGroups APIs

export const createUserGroup = async (data) => {
  const response = await fetch(`${REACT_APP_API_URL}/user-groups`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Creating User Group failed");
  }

  return response.json();
};

export const fetchAllUserGroups = async () => {
  const response = await fetch(`${REACT_APP_API_URL}/user-groups`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching User Groups failed");
  }

  return response.json();
};

export const fetchUserGroupById = async (userGroupId) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/user-groups/${userGroupId}`,
    {
      method: "GET",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching User Group failed");
  }

  return response.json();
};

export const updateUserGroupById = async (userGroupId, data) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/user-groups/${userGroupId}`,
    {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Updating User Group failed");
  }

  return response.json();
};

export const deleteUserGroupById = async (userGroupId) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/user-groups/${userGroupId}`,
    {
      method: "DELETE",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Deleting User Group failed");
  }
};

// Families APIs

export const createFamily = async (data) => {
  const response = await fetch(`${REACT_APP_API_URL}/families`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Creating Family failed");
  }

  return response.json();
};

export const fetchAllFamilies = async () => {
  const response = await fetch(`${REACT_APP_API_URL}/families`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching Families failed");
  }

  return response.json();
};

export const fetchFamilyById = async (familyId) => {
  const response = await fetch(`${REACT_APP_API_URL}/families/${familyId}`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching Family failed");
  }

  return response.json();
};

export const updateFamilyById = async (familyId, data) => {
  const response = await fetch(`${REACT_APP_API_URL}/families/${familyId}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Updating Family failed");
  }

  return response.json();
};

export const deleteFamilyById = async (familyId) => {
  const response = await fetch(`${REACT_APP_API_URL}/families/${familyId}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Deleting Family failed");
  }
};

// Family Members APIs

export const createFamilyMember = async (data) => {
  const response = await fetch(`${REACT_APP_API_URL}/family-members`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Creating Family Member failed");
  }

  return response.json();
};

export const fetchAllFamilyMembers = async () => {
  const response = await fetch(`${REACT_APP_API_URL}/family-members`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching Family Members failed");
  }

  return response.json();
};

export const fetchFamilyMemberById = async (familyMemberId) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/family-members/${familyMemberId}`,
    {
      method: "GET",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching Family Member failed");
  }

  return response.json();
};

export const updateFamilyMemberById = async (familyMemberId, data) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/family-members/${familyMemberId}`,
    {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Updating Family Member failed");
  }

  return response.json();
};

export const deleteFamilyMemberById = async (familyMemberId) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/family-members/${familyMemberId}`,
    {
      method: "DELETE",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Deleting Family Member failed");
  }
};

// AI Insights APIs

export const createAIInsight = async (data) => {
  const response = await fetch(`${REACT_APP_API_URL}/ai-insights`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Creating AI Insight failed");
  }

  return response.json();
};

export const fetchAllAIInsights = async () => {
  const response = await fetch(`${REACT_APP_API_URL}/ai-insights`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching AI Insights failed");
  }

  return response.json();
};

export const fetchAIInsightById = async (insightId) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/ai-insights/${insightId}`,
    {
      method: "GET",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching AI Insight failed");
  }

  return response.json();
};

export const updateAIInsightById = async (insightId, data) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/ai-insights/${insightId}`,
    {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Updating AI Insight failed");
  }

  return response.json();
};

export const deleteAIInsightById = async (insightId) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/ai-insights/${insightId}`,
    {
      method: "DELETE",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Deleting AI Insight failed");
  }
};

// Venues APIs

export const createVenue = async (data) => {
  const response = await fetch(`${REACT_APP_API_URL}/venues`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Creating Venue failed");
  }

  return response.json();
};

export const fetchAllVenues = async () => {
  const response = await fetch(`${REACT_APP_API_URL}/venues`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching Venues failed");
  }

  return response.json();
};

export const fetchVenueById = async (venueId) => {
  const response = await fetch(`${REACT_APP_API_URL}/venues/${venueId}`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching Venue failed");
  }

  return response.json();
};

export const updateVenueById = async (venueId, data) => {
  const response = await fetch(`${REACT_APP_API_URL}/venues/${venueId}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Updating Venue failed");
  }

  return response.json();
};

export const deleteVenueById = async (venueId) => {
  const response = await fetch(`${REACT_APP_API_URL}/venues/${venueId}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Deleting Venue failed");
  }
};

// Halls APIs

export const createHall = async (data) => {
  const response = await fetch(`${REACT_APP_API_URL}/halls`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Creating Hall failed");
  }

  return response.json();
};

export const fetchAllHalls = async () => {
  const response = await fetch(`${REACT_APP_API_URL}/halls`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching Halls failed");
  }

  return response.json();
};

export const fetchHallById = async (hallId) => {
  const response = await fetch(`${REACT_APP_API_URL}/halls/${hallId}`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching Hall failed");
  }

  return response.json();
};

export const updateHallById = async (hallId, data) => {
  const response = await fetch(`${REACT_APP_API_URL}/halls/${hallId}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Updating Hall failed");
  }

  return response.json();
};

export const deleteHallById = async (hallId) => {
  const response = await fetch(`${REACT_APP_API_URL}/halls/${hallId}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Deleting Hall failed");
  }
};

// Event Bookings APIs

export const createEventBooking = async (data) => {
  const response = await fetch(`${REACT_APP_API_URL}/event-bookings`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Creating Event Booking failed");
  }

  return response.json();
};

export const fetchAllEventBookings = async () => {
  const response = await fetch(`${REACT_APP_API_URL}/event-bookings`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching Event Bookings failed");
  }

  return response.json();
};

export const fetchEventBookingById = async (bookingId) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/event-bookings/${bookingId}`,
    {
      method: "GET",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching Event Booking failed");
  }

  return response.json();
};

export const updateEventBookingById = async (bookingId, data) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/event-bookings/${bookingId}`,
    {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Updating Event Booking failed");
  }

  return response.json();
};

export const deleteEventBookingById = async (bookingId) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/event-bookings/${bookingId}`,
    {
      method: "DELETE",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Deleting Event Booking failed");
  }
};

// Guest Services APIs

export const createGuestService = async (data) => {
  const response = await fetch(`${REACT_APP_API_URL}/guest-services`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Creating Guest Service failed");
  }

  return response.json();
};

export const fetchAllGuestServices = async () => {
  const response = await fetch(`${REACT_APP_API_URL}/guest-services`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching Guest Services failed");
  }

  return response.json();
};

export const fetchGuestServiceById = async (serviceId) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/guest-services/${serviceId}`,
    {
      method: "GET",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching Guest Service failed");
  }

  return response.json();
};

export const updateGuestServiceById = async (serviceId, data) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/guest-services/${serviceId}`,
    {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Updating Guest Service failed");
  }

  return response.json();
};

export const deleteGuestServiceById = async (serviceId) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/guest-services/${serviceId}`,
    {
      method: "DELETE",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Deleting Guest Service failed");
  }
};

// Booking Services APIs

export const createBookingService = async (data) => {
  const response = await fetch(`${REACT_APP_API_URL}/booking-services`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Creating Booking Service failed");
  }

  return response.json();
};

export const fetchAllBookingServices = async () => {
  const response = await fetch(`${REACT_APP_API_URL}/booking-services`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching Booking Services failed");
  }

  return response.json();
};

export const fetchBookingServiceById = async (serviceId) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/booking-services/${serviceId}`,
    {
      method: "GET",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching Booking Service failed");
  }

  return response.json();
};

export const updateBookingServiceById = async (serviceId, data) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/booking-services/${serviceId}`,
    {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Updating Booking Service failed");
  }

  return response.json();
};

export const deleteBookingServiceById = async (serviceId) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/booking-services/${serviceId}`,
    {
      method: "DELETE",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Deleting Booking Service failed");
  }
};

// Categories APIs

export const createCategory = async (data) => {
  const response = await fetch(`${REACT_APP_API_URL}/categories`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Creating Category failed");
  }

  return response.json();
};

export const fetchAllCategories = async () => {
  const response = await fetch(`${REACT_APP_API_URL}/categories`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching Categories failed");
  }

  return response.json();
};

export const fetchCategoryById = async (categoryId) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/categories/${categoryId}`,
    {
      method: "GET",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching Category failed");
  }

  return response.json();
};

export const updateCategoryById = async (categoryId, data) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/categories/${categoryId}`,
    {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Updating Category failed");
  }

  return response.json();
};

export const deleteCategoryById = async (categoryId) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/categories/${categoryId}`,
    {
      method: "DELETE",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Deleting Category failed");
  }
};

// Roles APIs

export const createRole = async (data) => {
  const response = await fetch(`${REACT_APP_API_URL}/roles`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Creating Role failed");
  }

  return response.json();
};

export const fetchAllRoles = async () => {
  const response = await fetch(`${REACT_APP_API_URL}/roles`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching Roles failed");
  }

  return response.json();
};

export const fetchRoleById = async (roleId) => {
  const response = await fetch(`${REACT_APP_API_URL}/roles/${roleId}`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching Role failed");
  }

  return response.json();
};

export const updateRoleById = async (roleId, data) => {
  const response = await fetch(`${REACT_APP_API_URL}/roles/${roleId}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Updating Role failed");
  }

  return response.json();
};

export const deleteRoleById = async (roleId) => {
  const response = await fetch(`${REACT_APP_API_URL}/roles/${roleId}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Deleting Role failed");
  }
};

// Team Members APIs

export const createTeamMember = async (data) => {
  // const token = getToken();
  const response = await fetch(`${REACT_APP_API_URL}/team-members`, {
    method: "POST",
    // headers: {
    //   Authorization: token ? `Bearer ${token}` : "", // Only set Authorization header
    // },
    // // Do NOT include headers, let fetch automatically handle it for FormData
    // body: data, // FormData object containing the file and other form fields
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Creating Team Member failed");
  }

  return response.json();
};

export const fetchAllTeamMembers = async () => {
  const response = await fetch(`${REACT_APP_API_URL}/team-members`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
   
      if (response.status === 404) {
        throw new Error("No Team Members found (404 Not Found)");
      } else if (response.status === 500) {
        throw new Error("Server error (500 Internal Server Error)");
      } else {
        throw new Error(
          errorData.error.message || "Fetching Team Members failed"
        );
      }
    }
    // Parse JSON response only if it is valid
    // const data = await response.json();
  
    // Handle cases where the response isn't valid JSON
    if (!response || typeof response !== "object") {
      throw new Error("Invalid JSON response");
    
    // throw new Error(errorData.error.message || "Fetching Team Members failed");
  }

  return response.json();
};

export const fetchTeamMemberById = async (teamMemberId) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/team-members/${teamMemberId}`,
    {
      method: "GET",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching Team Member failed");
  }

  return response.json();
};

export const updateTeamMemberById = async (teamMemberId, data) => {
  // const token = getToken();
  const response = await fetch(
    `${REACT_APP_API_URL}/team-members/${teamMemberId}`,
    {
      method: "PUT",
      // headers: {
      //   Authorization: token ? `Bearer ${token}` : "", // Only set Authorization header
      // },
      // // Do NOT include headers, let fetch automatically handle it for FormData
      // body: data, // FormData object containing the file and other form fields
      headers: getHeaders(),
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Updating Team Member failed");
  }

  return response.json();
};

export const deleteTeamMemberById = async (teamMemberId) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/team-members/${teamMemberId}`,
    {
      method: "DELETE",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Deleting Team Member failed");
  }
};

// PRUTL Framework Dimensions APIs

export const createPrutlFrameworkDimension = async (data) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/prutl-framework-dimensions`,
    {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Creating Framework Dimension failed");
  }

  return response.json();
};

// export const fetchAllPrutlFrameworkDimensions = async () => {
//   const response = await fetch(`${REACT_APP_API_URL}/prutl-framework-dimensions`, {
//     method: 'GET',
//     headers: getHeaders(),
//   });

//   // if (!response.ok) {
//   //   const errorData = await response.json();
//   //   throw new Error(errorData.error.message || 'Fetching Framework Dimensions failed');
//   // }
//    // Check if response is OK (status in the range 200-299)
//   if (!response.ok) {
//     // Handle specific error statuses if needed
//     if (response.status === 404) {
//       throw new Error("No PRUTL dimensions found (404 Not Found)");
//     } else if (response.status === 500) {
//       throw new Error("Server error (500 Internal Server Error)");
//     } else {
//       throw new Error(`Unexpected error: ${response.status}`);
//     }
//   }

//   // Parse JSON response only if it is valid
//   const data = await response.json();

//   // Handle cases where the response isn't valid JSON
//   if (!data || typeof data !== "object") {
//     throw new Error("Invalid JSON response");
//   }

//   return response.json();
// };

export const fetchAllPrutlFrameworkDimensions = async () => {
  const response = await fetch(
    `${REACT_APP_API_URL}/prutl-framework-dimensions`,
    {
      method: "GET",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    if (response.status === 404) {
      throw new Error("No PRUTL dimensions found (404 Not Found)");
    } else if (response.status === 500) {
      throw new Error("Server error (500 Internal Server Error)");
    } else {
      throw new Error(
        errorData.error.message || "Fetching Framework Dimensions failed"
      );
    }
  }
  // Parse JSON response only if it is valid
  // const data = await response.json();
  
  // Handle cases where the response isn't valid JSON
  if (!response || typeof response !== "object") {
    throw new Error("Invalid JSON response");
  }
  return response.json();
};

export const fetchPrutlFrameworkDimensionById = async (prutlId) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/prutl-framework-dimensions/${prutlId}`,
    {
      method: "GET",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching Framework Dimension failed");
  }

  return response.json();
};

export const updatePrutlFrameworkDimensionById = async (prutlId, data) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/prutl-framework-dimensions/${prutlId}`,
    {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Updating Framework Dimension failed");
  }

  return response.json();
};

export const deletePrutlFrameworkDimensionById = async (prutlId) => {
  const response = await fetch(
    `${REACT_APP_API_URL}/prutl-framework-dimensions/${prutlId}`,
    {
      method: "DELETE",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Deleting Framework Dimension failed");
  }
};

// Vehicles APIs

export const createVehicle = async (data) => {
  const response = await fetch(`${REACT_APP_API_URL}/vehicles`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Creating Vehicle failed");
  }

  return response.json();
};

export const fetchAllVehicles = async () => {
  const response = await fetch(`${REACT_APP_API_URL}/vehicles`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching Vehicles failed");
  }

  return response.json();
};

export const fetchVehicleById = async (vehicleId) => {
  const response = await fetch(`${REACT_APP_API_URL}/vehicles/${vehicleId}`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching Vehicle failed");
  }

  return response.json();
};

export const updateVehicleById = async (vehicleId, data) => {
  const response = await fetch(`${REACT_APP_API_URL}/vehicles/${vehicleId}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Updating Vehicle failed");
  }

  return response.json();
};

export const deleteVehicleById = async (vehicleId) => {
  const response = await fetch(`${REACT_APP_API_URL}/vehicles/${vehicleId}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Deleting Vehicle failed");
  }

  return response.json();
};


// Parking Areas APIs

export const createParkingArea = async (data) => {
  const response = await fetch(`${REACT_APP_API_URL}/parking-areas`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Creating Parking Area failed");
  }

  return response.json();
};

export const fetchAllParkingAreas = async () => {
  const response = await fetch(`${REACT_APP_API_URL}/parking-areas`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching Parking Areas failed");
  }

  return response.json();
};

export const fetchParkingAreaById = async (parkingAreaId) => {
  const response = await fetch(`${REACT_APP_API_URL}/parking-areas/${parkingAreaId}`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Fetching Parking Area failed");
  }

  return response.json();
};

export const updateParkingAreaById = async (parkingAreaId, data) => {
  const response = await fetch(`${REACT_APP_API_URL}/parking-areas/${parkingAreaId}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Updating Parking Area failed");
  }

  return response.json();
};

export const deleteParkingAreaById = async (parkingAreaId) => {
  const response = await fetch(`${REACT_APP_API_URL}/parking-areas/${parkingAreaId}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || "Deleting Parking Area failed");
  }

  return response.json();
};

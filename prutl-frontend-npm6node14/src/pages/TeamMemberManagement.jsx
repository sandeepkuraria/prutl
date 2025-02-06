// prutl-frontend-npm6node14/src/pages/TeamMemberManagement.jsx

import React from 'react';
import TeamMemberList from '../components/teamMemberManagement/TeamMemberList.jsx';

const TeamMemberManagement = () => {
  return (
    <div className="teamMemberManagementContainer">
      <h1>Team Member Management</h1>
      <TeamMemberList />
    </div>
  );
};

export default TeamMemberManagement;

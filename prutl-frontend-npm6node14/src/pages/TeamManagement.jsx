// prutl-frontend-npm6node14/src/pages/TeamManagement.jsx

import React from 'react';
import TeamList from '../components/teamManagement/TeamList.jsx';

const TeamManagement = () => {
  return (
    <div className="teamManagementContainer">
      <h1>Team Management</h1>
      <TeamList />
    </div>
  );
};

export default TeamManagement;

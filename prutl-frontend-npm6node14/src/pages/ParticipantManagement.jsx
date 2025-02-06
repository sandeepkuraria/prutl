// prutl-frontend-npm6node14/src/pages/ParticipantManagement.jsx

import React from 'react';
import ParticipantList from '../components/participantManagement/ParticipantList.jsx';

const ParticipantManagement = () => {
  return (
    <div className="participantManagementContainer">
      <h1>Participant Management</h1>
      <ParticipantList />
    </div>
  );
};

export default ParticipantManagement;

// prutl-frontend-npm6node14/src/pages/CompetitionManagement.jsx

import React from 'react';
import CompetitionList from '../components/competitionManagement/CompetitionList.jsx';

const CompetitionManagement = () => {
  return (
    <div className="competitionManagementContainer">
      <h1>Competition Management</h1>
      <CompetitionList />
    </div>
  );
};

export default CompetitionManagement;

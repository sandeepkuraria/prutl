// prutl-frontend-npm6node14/src/pages/ScoreManagement.jsx

import React from 'react';
import ScoreList from '../components/scoreManagement/ScoreList.jsx';

const ScoreManagement = () => {
  return (
    <div className="scoreManagementContainer">
      <h1>Score Management</h1>
      <ScoreList />
    </div>
  );
};

export default ScoreManagement;

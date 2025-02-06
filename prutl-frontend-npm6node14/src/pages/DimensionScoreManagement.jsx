// prutl-frontend-npm6node14/src/pages/DimensionScoreManagement.jsx

import React from 'react';
import DimensionScoreList from '../components/dimensionScoreManagement/DimensionScoreList.jsx';

const DimensionScoreManagement = () => {
  return (
    <div className="dimensionScoreManagementContainer">
      <h1>Dimension Score Management</h1>
      <DimensionScoreList />
    </div>
  );
};

export default DimensionScoreManagement;

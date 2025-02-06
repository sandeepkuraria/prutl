// prutl-frontend-npm6node14/src/pages/HallManagement.jsx

import React from 'react';
import HallList from '../components/hallManagement/HallList.jsx';

const HallManagement = () => {
  return (
    <div className="hallManagementContainer">
      <h1>Hall Management</h1>
      <HallList />
    </div>
  );
};

export default HallManagement;

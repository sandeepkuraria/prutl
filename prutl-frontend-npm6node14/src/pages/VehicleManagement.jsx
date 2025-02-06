// prutl-frontend-npm6node14/src/pages/VehicleManagement.jsx

import React from 'react';
import VehicleList from '../components/vehicleManagement/VehicleList.jsx';

const VehicleManagement = () => {
  return (
    <div className="vehicleManagementContainer">
      <h1>Vehicle Management</h1>
      <VehicleList />
    </div>
  );
};

export default VehicleManagement;

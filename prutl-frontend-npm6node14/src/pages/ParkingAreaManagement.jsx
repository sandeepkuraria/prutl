// prutl-frontend-npm6node14/src/pages/ParkingAreaManagement.jsx
import React from 'react';
import ParkingAreaList from '../components/parkingAreaManagement/ParkingAreaList.jsx';

const ParkingAreaManagement = () => {
  return (
    <div className="parkingAreaManagementContainer">
      <h1>Parking Area Management</h1>
      <ParkingAreaList />
    </div>
  );
};

export default ParkingAreaManagement;

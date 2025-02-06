// prutl-frontend-npm6node14/src/pages/GuestServiceManagement.jsx

import React from 'react';
import GuestServiceList from '../components/guestServiceManagement/GuestServiceList.jsx';

const GuestServiceManagement = () => {
  return (
    <div className="guestServiceManagementContainer">
      <h1>Guest Service Management</h1>
      <GuestServiceList />
    </div>
  );
};

export default GuestServiceManagement;

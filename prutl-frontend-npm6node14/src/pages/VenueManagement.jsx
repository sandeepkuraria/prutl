// prutl-frontend-npm6node14/src/pages/VenueManagement.jsx

import React from 'react';
import VenueList from '../components/venueManagement/VenueList.jsx';

const VenueManagement = () => {
  return (
    <div className="venueManagementContainer">
      <h1>Venue Management</h1>
      <VenueList />
    </div>
  );
};

export default VenueManagement;

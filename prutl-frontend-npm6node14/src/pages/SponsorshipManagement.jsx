// prutl-frontend-npm6node14/src/pages/SponsorshipManagement.jsx

import React from 'react';
import SponsorshipList from '../components/sponsorshipManagement/SponsorshipList.jsx';

const SponsorshipManagement = () => {
  return (
    <div className="sponsorshipManagementContainer">
      <h1>Sponsorship Management</h1>
      <SponsorshipList />
    </div>
  );
};

export default SponsorshipManagement;

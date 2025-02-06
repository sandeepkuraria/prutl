// prutl-frontend-npm6node14/src/pages/OrganizationManagement.jsx

import React from 'react';
import OrganizationList from '../components/organizationManagement/OrganizationList';


const OrganizationManagement = () => {
  return (
    <div className="organizationManagementContainer">
      <h1>Organization Management</h1>
      <OrganizationList />
    </div>
  );
};

export default OrganizationManagement;

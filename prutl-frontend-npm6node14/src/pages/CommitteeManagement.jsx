// prutl-frontend-npm6node14/src/pages/CommitteeManagement.jsx

import React from 'react';
import CommitteeList from '../components/committeeManagement/CommitteeList.jsx';

const CommitteeManagement = () => {
  return (
    <div className="committeeManagementContainer">
      <h1>Committee Management</h1>
      <CommitteeList />
    </div>
  );
};

export default CommitteeManagement;

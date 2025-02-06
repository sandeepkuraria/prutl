// prutl-frontend-npm6node14/src/pages/CommitteeMemberManagement.jsx

import React from 'react';
import CommitteeMemberList from '../components/committeeMemberManagement/CommitteeMemberList.jsx';

const CommitteeMemberManagement = () => {
  return (
    <div className="committeeMemberManagementContainer">
      <h1>Committee Member Management</h1>
      <CommitteeMemberList />
    </div>
  );
};

export default CommitteeMemberManagement;

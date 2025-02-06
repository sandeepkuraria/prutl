// prutl-frontend-npm6node14/src/pages/FamilyMemberManagement.jsx

import React from 'react';
import FamilyMemberList from '../components/familyMemberManagement/FamilyMemberList.jsx';

const FamilyMemberManagement = () => {
  return (
    <div className="familyMemberManagementContainer">
      <h1>Family Member Management</h1>
      <FamilyMemberList />
    </div>
  );
};

export default FamilyMemberManagement;

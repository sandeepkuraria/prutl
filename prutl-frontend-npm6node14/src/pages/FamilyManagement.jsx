// prutl-frontend-npm6node14/src/pages/FamilyManagement.jsx

import React from 'react';
import FamilyList from '../components/familyManagement/FamilyList.jsx';

const FamilyManagement = () => {
  return (
    <div className="familyManagementContainer">
      <h1>Family Management</h1>
      <FamilyList />
    </div>
  );
};

export default FamilyManagement;

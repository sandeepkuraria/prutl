// prutl-frontend-npm6node14/src/pages/UserGroupManagement.jsx

import React from 'react';
import UserGroupList from '../components/userGroupManagement/UserGroupList.jsx';

const UserGroupManagement = () => {
  return (
    <div className="userGroupManagementContainer">
      <h1>User Group Management</h1>
      <UserGroupList />
    </div>
  );
};

export default UserGroupManagement;

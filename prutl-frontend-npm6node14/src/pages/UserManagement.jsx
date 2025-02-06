//prutl-frontend-npm6node14/src/pages/UserManagement.jsx
import React from 'react';
import UserList from '../components/userManagement/UsersList';

const UserManagement = () => {
  return (
    <div className="userManagementContainer">
      <h1>User Management</h1>
      <UserList/>
    </div>
  );
};

export default UserManagement;

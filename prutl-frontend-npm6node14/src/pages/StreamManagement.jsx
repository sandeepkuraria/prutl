// prutl-frontend-npm6node14/src/pages/StreamManagement.jsx

import React from 'react';
import StreamList from '../components/streamManagement/StreamList.jsx';

const StreamManagement = () => {
  return (
    <div className="streamManagementContainer">
      <h1>Stream Management</h1>
      <StreamList />
    </div>
  );
};

export default StreamManagement;

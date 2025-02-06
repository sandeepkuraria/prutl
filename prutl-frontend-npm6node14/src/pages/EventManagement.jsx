// prutl-frontend-npm6node14/src/pages/EventManagement.jsx

import React from 'react';
import EventList from '../components/eventManagement/EventList.jsx';

const EventManagement = () => {
  return (
    <div className="eventManagementContainer">
      <h1>Event Management</h1>
      <EventList />
    </div>
  );
};

export default EventManagement;

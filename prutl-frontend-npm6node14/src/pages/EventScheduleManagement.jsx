// prutl-frontend-npm6node14/src/pages/EventScheduleManagement.jsx

import React from 'react';
import EventScheduleList from '../components/eventScheduleManagement/EventScheduleList.jsx';

const EventScheduleManagement = () => {
  return (
    <div className="eventScheduleManagementContainer">
      <h1>Event Schedule Management</h1>
      <EventScheduleList />
    </div>
  );
};

export default EventScheduleManagement;

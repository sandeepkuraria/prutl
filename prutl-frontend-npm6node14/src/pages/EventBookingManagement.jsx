// prutl-frontend-npm6node14/src/pages/EventBookingManagement.jsx

import React from 'react';
import EventBookingList from '../components/eventBookingManagement/EventBookingList.jsx';

const EventBookingManagement = () => {
  return (
    <div className="eventBookingManagementContainer">
      <h1>Event Booking Management</h1>
      <EventBookingList />
    </div>
  );
};

export default EventBookingManagement;

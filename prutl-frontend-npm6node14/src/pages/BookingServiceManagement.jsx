// src/pages/BookingServiceManagement.jsx

import React from 'react';
import BookingServiceList from '../components/bookingServiceManagement/BookingServiceList.jsx';

const BookingServiceManagement = () => {
  return (
    <div className="bookingServiceManagementContainer">
      <h1>Booking Service Management</h1>
      <BookingServiceList />
    </div>
  );
};

export default BookingServiceManagement;

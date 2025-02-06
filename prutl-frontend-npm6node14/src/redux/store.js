// prutl-frontend-npm6node14/src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice';
import userReducer from '../redux/slices/userSlice';
import membershipReducer from '../redux/slices/membershipSlice';
import organizationReducer from '../redux/slices/organizationSlice';
import eventReducer from '../redux/slices/eventSlice';
import competitionReducer from './slices/competitionSlice.js';
import eventScheduleReducer from './slices/eventScheduleSlice.js';
import streamReducer from './slices/streamSlice.js'; 
import participantReducer from './slices/participantSlice.js'; 
import sponsorReducer from './slices/sponsorSlice.js'; 
import teamReducer from './slices/teamSlice.js'; 
import committeeReducer from './slices/committeeSlice.js'; 
import committeeMemberReducer from './slices/committeeMemberSlice.js'; 
import awardReducer from './slices/awardSlice.js'; 
import scoreReducer from './slices/scoreSlice.js'; 
import sponsorshipReducer from './slices/sponsorshipSlice.js'; 
import passionFrameworkDimensionReducer from './slices/passionFrameworkDimensionSlice.js'; 
import dimensionScoreReducer from './slices/dimensionScoreSlice.js'; 
import userGroupReducer from './slices/userGroupSlice.js'; 
import familyReducer from './slices/familySlice.js'; 
import familyMemberReducer from './slices/familyMemberSlice.js'; 
import aiInsightReducer from './slices/aiInsightSlice.js'; 
import venueReducer from './slices/venueSlice.js'; 
import hallReducer from './slices/hallSlice.js'; 
import eventBookingReducer from './slices/eventBookingSlice.js'; 
import guestServiceReducer from './slices/guestServiceSlice.js'; 
import bookingServiceReducer from './slices/bookingServiceSlice.js';
import categoryReducer from './slices/categorySlice.js';
import roleReducer from './slices/roleSlice.js';
import teamMemberReducer from './slices/teamMemberSlice.js';
import prutlFrameworkDimensionReducer from './slices/prutlFrameworkDimensionSlice.js'; 
import vehicleReducer from './slices/vehicleSlice.js'; 
import parkingAreaReducer from './slices/parkingAreaSlice.js'; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    memberships: membershipReducer,
    organizations: organizationReducer,
    events: eventReducer,
    competitions: competitionReducer,
    eventSchedules: eventScheduleReducer,
    streams: streamReducer, 
    participants: participantReducer, 
    sponsors: sponsorReducer, 
    teams: teamReducer, 
    committees: committeeReducer, 
    committeeMembers: committeeMemberReducer, 
    awards: awardReducer, 
    scores: scoreReducer, 
    sponsorships: sponsorshipReducer, 
    passionFrameworkDimensions: passionFrameworkDimensionReducer, 
    dimensionScores: dimensionScoreReducer, 
    userGroups: userGroupReducer, 
    families: familyReducer, 
    familyMembers: familyMemberReducer, 
    aiInsights: aiInsightReducer, 
    venues: venueReducer, 
    halls: hallReducer, 
    eventBookings: eventBookingReducer, 
    guestServices: guestServiceReducer, 
    bookingServices: bookingServiceReducer, 
    categories: categoryReducer, 
    roles: roleReducer, 
    teamMembers: teamMemberReducer, 
    prutlFrameworkDimensions: prutlFrameworkDimensionReducer, 
    vehicles: vehicleReducer, 
    parkingAreas: parkingAreaReducer, 
  },
});

export default store;

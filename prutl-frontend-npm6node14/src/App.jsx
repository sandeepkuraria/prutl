//prutl-frontend-npm6node14/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Footer from './components/common/Footer';
import ProjectCollaboration from './pages/ProjectCollaboration';
import AboutUs from './pages/AboutUs';
import Navbar from './components/common/Navbar';
import UserManagement from './pages/UserManagement';
import MembershipManagement from './pages/MembershipManagement';
import OrganizationManagement from './pages/OrganizationManagement';
import EventManagement from './pages/EventManagement';
import CompetitionManagement from './pages/CompetitionManagement';
import EventScheduleManagement from './pages/EventScheduleManagement';
import StreamManagement from './pages/StreamManagement';
import ParticipantManagement from './pages/ParticipantManagement';
import SponsorManagement from './pages/SponsorManagement';
import TeamManagement from './pages/TeamManagement';
import CommitteeManagement from './pages/CommitteeManagement';
import CommitteeMemberManagement from './pages/CommitteeMemberManagement';
import AwardManagement from './pages/AwardManagement';
import ScoreManagement from './pages/ScoreManagement';
import SponsorshipManagement from './pages/SponsorshipManagement';
import PassionFrameworkDimensionManagement from './pages/PassionFrameworkDimensionManagement';
import DimensionScoreManagement from './pages/DimensionScoreManagement';
import UserGroupManagement from './pages/UserGroupManagement';
import FamilyManagement from './pages/FamilyManagement';
import FamilyMemberManagement from './pages/FamilyMemberManagement';
import AIInsightManagement from './pages/AIInsightManagement';
import VenueManagement from './pages/VenueManagement';
import HallManagement from './pages/HallManagement';
import EventBookingManagement from './pages/EventBookingManagement';
import GuestServiceManagement from './pages/GuestServiceManagement';
import BookingServiceManagement from './pages/BookingServiceManagement';
import CategoryManagement from './pages/CategoryManagement';
import RoleManagement from './pages/RoleManagement';
import TeamMemberManagement from './pages/TeamMemberManagement';
import PrutlFrameworkDimensionManagement from './pages/PrutlFrameworkDimensionManagement';
import Dashboard from './pages/Dashboard';
import VehicleManagement from './pages/VehicleManagement';
import ParkingAreaManagement from './pages/ParkingAreaManagement';
// import PrutlHome from "./pages/PrutlHome";



const App = () => {

  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={<PrutlHome />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projectCollaboration" element={<ProjectCollaboration />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/user-management" element={<UserManagement/>} />
          <Route path="/membership-management" element={<MembershipManagement/>} />
          <Route path="/organization-management" element={<OrganizationManagement/>} />
          <Route path="/event-management" element={<EventManagement/>} />
          <Route path="/competition-management" element={<CompetitionManagement/>} />
          <Route path="/event-schedule-management" element={<EventScheduleManagement/>} />
          <Route path="/stream-management" element={<StreamManagement/>} />
          <Route path="/participants-management" element={<ParticipantManagement/>} />
          <Route path="/sponsors-management" element={<SponsorManagement/>} />
          <Route path="/teams-management" element={<TeamManagement/>} />
          <Route path="/committees-management" element={<CommitteeManagement/>} />
          <Route path="/committee-members-management" element={<CommitteeMemberManagement/>} />
          <Route path="/awards-management" element={<AwardManagement/>} />
          <Route path="/scores-management" element={<ScoreManagement/>} />
          <Route path="/sponsorships-management" element={<SponsorshipManagement/>} />
          <Route path="/passion-framework-dimensions-management" element={<PassionFrameworkDimensionManagement/>} />
          <Route path="/dimension-scores-management" element={<DimensionScoreManagement/>} />
          <Route path="/user-groups-management" element={<UserGroupManagement/>} />
          <Route path="/families-management" element={<FamilyManagement/>} />
          <Route path="/family-members-management" element={<FamilyMemberManagement/>} />
          <Route path="/ai-insights-management" element={<AIInsightManagement/>} />
          <Route path="/venues-management" element={<VenueManagement/>} />
          <Route path="/halls-management" element={<HallManagement/>} />
          <Route path="/event-bookings-management" element={<EventBookingManagement/>} />
          <Route path="/guest-services-management" element={<GuestServiceManagement/>} />
          <Route path="/booking-services-management" element={<BookingServiceManagement/>} />
          <Route path="/categories-management" element={<CategoryManagement/>} />
          <Route path="/roles-management" element={<RoleManagement/>} />
          <Route path="/team-members-management" element={<TeamMemberManagement/>} />
          <Route path="/prutl-framework-dimensions-management" element={<PrutlFrameworkDimensionManagement/>} />
          <Route path="/vehicles-management" element={<VehicleManagement/>} />
          <Route path="/parking-areas-management" element={<ParkingAreaManagement/>} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;

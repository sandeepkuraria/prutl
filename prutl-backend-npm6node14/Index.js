//Index.js
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const { connectDB } = require('./config/database');
const errorHandler = require('./middleware/errorHandler');


const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const membershipRoutes = require('./routes/membershipRoutes');
const organizationRoutes = require('./routes/organizationRoutes');
const eventRoutes = require('./routes/eventRoutes');
const competitionRoutes = require('./routes/competitionRoutes');
const eventScheduleRoutes = require('./routes/eventScheduleRoutes');
const streamRoutes = require('./routes/streamRoutes');
const participantRoutes = require('./routes/participantRoutes');
const sponsorRoutes = require('./routes/sponsorRoutes');
const teamRoutes = require('./routes/teamRoutes');
const committeeRoutes = require('./routes/committeeRoutes'); 
const committeeMemberRoutes = require('./routes/committeeMemberRoutes'); 
const awardRoutes = require('./routes/awardRoutes'); 
const scoreRoutes = require('./routes/scoreRoutes'); 
const sponsorshipRoutes = require('./routes/sponsorshipRoutes');
const passionFrameworkDimensionRoutes = require('./routes/passionFrameworkDimensionRoutes'); 
const dimensionScoreRoutes = require('./routes/dimensionScoreRoutes');
const userGroupRoutes = require('./routes/userGroupRoutes');
const familiesRoutes = require('./routes/familyRoutes'); 
const familyMemberRoutes = require('./routes/familyMemberRoutes'); 
const aiInsightRoutes = require('./routes/aiInsightRoutes');
const eventBookingRoutes = require('./routes/eventBookingRoutes'); 
const venueRoutes = require('./routes/venueRoutes'); 
const guestServiceRoutes = require('./routes/guestServiceRoutes'); 
const bookingServiceRoutes = require('./routes/bookingServiceRoutes'); 
const hallRoutes = require('./routes/hallRoutes'); 
const categoryRoutes = require('./routes/categoryRoutes'); 
const roleRoutes = require('./routes/roleRoutes'); 
const teamMemberRoutes = require('./routes/teamMemberRoutes'); 
const prutlFrameworkDimensionRoutes = require('./routes/prutlFrameworkDimensionRoutes'); 
const vehiclesRoutes = require("./routes/vehiclesRoutes");
const parkingAreaRoutes = require("./routes/parkingAreaRoutes");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/prutl-api/users', userRoutes);
app.use('/prutl-api/auth', authRoutes);
app.use('/prutl-api/memberships', membershipRoutes);
app.use('/prutl-api/organizations', organizationRoutes);
app.use('/prutl-api/events', eventRoutes);
app.use('/prutl-api/competitions', competitionRoutes);
app.use('/prutl-api/event-schedules', eventScheduleRoutes);
app.use('/prutl-api/streams', streamRoutes);
app.use('/prutl-api/participants', participantRoutes);
app.use('/prutl-api/sponsors', sponsorRoutes);
app.use('/prutl-api/teams', teamRoutes);
app.use('/prutl-api/committees', committeeRoutes); 
app.use('/prutl-api/committee-members', committeeMemberRoutes); 
app.use('/prutl-api/awards', awardRoutes); 
app.use('/prutl-api/scores', scoreRoutes); 
app.use('/prutl-api/sponsorships', sponsorshipRoutes);
app.use('/prutl-api/passion-framework-dimensions', passionFrameworkDimensionRoutes); 
app.use('/prutl-api/dimension-scores', dimensionScoreRoutes);
app.use('/prutl-api/user-groups', userGroupRoutes);
app.use('/prutl-api/families', familiesRoutes); 
app.use('/prutl-api/family-members', familyMemberRoutes);
app.use('/prutl-api/ai-insights', aiInsightRoutes);
app.use('/prutl-api/event-bookings', eventBookingRoutes);
app.use('/prutl-api/venues', venueRoutes); 
app.use('/prutl-api/guest-services', guestServiceRoutes); 
app.use('/prutl-api/booking-services', bookingServiceRoutes); 
app.use('/prutl-api/halls', hallRoutes);  
app.use('/prutl-api/categories', categoryRoutes);  
app.use('/prutl-api/roles', roleRoutes);  
app.use('/prutl-api/team-members', teamMemberRoutes);  
app.use('/prutl-api/prutl-framework-dimensions', prutlFrameworkDimensionRoutes);
app.use("/prutl-api/vehicles", vehiclesRoutes);
app.use("/prutl-api/parking-areas", parkingAreaRoutes);

// Error-handling middleware (should be the last middleware)
app.use(errorHandler);

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
console.log('Static files served from:', path.join(__dirname, 'uploads'));

// test API to test whether API is working or not.
app.get('/prutl-api/test', (req, res) => {
    res.send('API is running!');
});


const startServer = async () => {
    try {
        await connectDB(); // Establish database connection
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1); // Exit process on error
    }
};

startServer();

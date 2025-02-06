// const Sequelize = require('sequelize');
// const sequelize = require('../config/database.js');

// const User = sequelize.define('user', {
//   user_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   user_code: { type: Sequelize.STRING, unique: true },
//   name: Sequelize.STRING,
//   email: { type: Sequelize.STRING, unique: true },
//   password: Sequelize.STRING,
//   phone_number: Sequelize.STRING,
//   user_type: Sequelize.STRING,
//   membership_id: Sequelize.INTEGER,
//   usergroup_id: Sequelize.INTEGER,
//   referrer_id: Sequelize.INTEGER,
//   city: Sequelize.STRING,
//   county: Sequelize.STRING,
//   state: Sequelize.STRING,
//   country: Sequelize.STRING,
//   pin_code: Sequelize.STRING,
//   remark: Sequelize.TEXT,
// });

// const Membership = sequelize.define('membership', {
//   membership_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   membership_type: Sequelize.STRING,
//   start_date: Sequelize.DATE,
//   end_date: Sequelize.DATE,
//   payment_status: Sequelize.STRING,
//   remark: Sequelize.TEXT,
// });

// const Organization = sequelize.define('organization', {
//   org_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   org_code: { type: Sequelize.STRING, unique: true },
//   org_name: Sequelize.STRING,
//   org_type: Sequelize.STRING,
//   address: Sequelize.STRING,
//   phone_number: Sequelize.STRING,
//   contact_person: Sequelize.STRING,
//   city: Sequelize.STRING,
//   county: Sequelize.STRING,
//   state: Sequelize.STRING,
//   country: Sequelize.STRING,
//   pin_code: Sequelize.STRING,
//   remark: Sequelize.TEXT,
// });

// const Event = sequelize.define('event', {
//   event_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   event_code: { type: Sequelize.STRING, unique: true },
//   event_name: Sequelize.STRING,
//   start_date: Sequelize.DATE,
//   end_date: Sequelize.DATE,
//   location: Sequelize.STRING,
//   description: Sequelize.TEXT,
//   remark: Sequelize.TEXT,
// });

// const Competition = sequelize.define('competition', {
//   competition_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   competition_code: { type: Sequelize.STRING, unique: true },
//   event_id: Sequelize.INTEGER,
//   category: Sequelize.STRING,
//   type: Sequelize.STRING,
//   start_date: Sequelize.DATE,
//   end_date: Sequelize.DATE,
//   location: Sequelize.STRING,
//   remark: Sequelize.TEXT,
// });

// const EventSchedule = sequelize.define('eventSchedule', {
//   schedule_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   competition_id: Sequelize.INTEGER,
//   start_time: Sequelize.TIME,
//   end_time: Sequelize.TIME,
//   remark: Sequelize.TEXT,
// });

// const Stream = sequelize.define('stream', {
//   stream_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   competition_id: Sequelize.INTEGER,
//   stream_url: Sequelize.STRING,
//   stream_start_time: Sequelize.DATE,
//   stream_end_time: Sequelize.DATE,
//   remark: Sequelize.TEXT,
// });

// const Participant = sequelize.define('participant', {
//   participant_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   user_id: Sequelize.INTEGER,
//   competition_id: Sequelize.INTEGER,
//   org_id: Sequelize.INTEGER,
//   remark: Sequelize.TEXT,
// });

// const Team = sequelize.define('team', {
//   team_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   team_code: { type: Sequelize.STRING, unique: true },
//   team_name: Sequelize.STRING,
//   sponsor_id: Sequelize.INTEGER,
//   competition_id: Sequelize.INTEGER,
//   remark: Sequelize.TEXT,
// });

// const Committee = sequelize.define('committee', {
//   committee_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   event_id: Sequelize.INTEGER,
//   committee_name: Sequelize.STRING,
//   committee_type: Sequelize.STRING,
//   remark: Sequelize.TEXT,
// });

// const CommitteeMember = sequelize.define('committeeMember', {
//   committee_member_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   user_id: Sequelize.INTEGER,
//   committee_id: Sequelize.INTEGER,
//   remark: Sequelize.TEXT,
// });

// const Award = sequelize.define('award', {
//   award_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   award_name: Sequelize.STRING,
//   award_date: Sequelize.DATE,
//   recipient_id: Sequelize.INTEGER,
//   remark: Sequelize.TEXT,
// });

// const Score = sequelize.define('score', {
//   score_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   user_id: Sequelize.INTEGER,
//   team_id: Sequelize.INTEGER,
//   score_value: Sequelize.FLOAT,
//   assessment_date: Sequelize.DATE,
//   remark: Sequelize.TEXT,
// });

// const Sponsor = sequelize.define('sponsor', {
//   sponsor_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   sponsor_name: Sequelize.STRING,
//   contact_info: Sequelize.STRING,
//   phone_number: Sequelize.STRING,
//   sponsorship_amount: Sequelize.DECIMAL,
//   remark: Sequelize.TEXT,
// });

// const Sponsorship = sequelize.define('sponsorship', {
//   sponsorship_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   sponsor_id: Sequelize.INTEGER,
//   team_id: Sequelize.INTEGER,
//   event_id: Sequelize.INTEGER,
//   amount: Sequelize.DECIMAL,
//   sponsorship_date: Sequelize.DATE,
//   remark: Sequelize.TEXT,
// });

// const PassionDimension = sequelize.define('passionDimension', {
//   dimension_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   dimension_name: Sequelize.STRING,
//   description: Sequelize.TEXT,
//   remark: Sequelize.TEXT,
// });

// const DimensionScore = sequelize.define('dimensionScore', {
//   dimension_score_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   user_id: Sequelize.INTEGER,
//   dimension_id: Sequelize.INTEGER,
//   score_value: Sequelize.FLOAT,
//   assessment_date: Sequelize.DATE,
//   remark: Sequelize.TEXT,
// });

// const UserGroup = sequelize.define('userGroup', {
//   usergroup_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   group_code: { type: Sequelize.STRING, unique: true },
//   group_name: Sequelize.STRING,
//   description: Sequelize.TEXT,
//   remark: Sequelize.TEXT,
// });

// const Family = sequelize.define('family', {
//   family_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   family_code: { type: Sequelize.STRING, unique: true },
//   family_name: Sequelize.STRING,
//   address: Sequelize.STRING,
//   phone_number: Sequelize.STRING,
//   contact_person: Sequelize.STRING,
//   city: Sequelize.STRING,
//   county: Sequelize.STRING,
//   state: Sequelize.STRING,
//   country: Sequelize.STRING,
//   pin_code: Sequelize.STRING,
//   remark: Sequelize.TEXT,
// });

// const FamilyMember = sequelize.define('familyMember', {
//   family_member_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   family_id: Sequelize.INTEGER,
//   user_id: Sequelize.INTEGER,
//   relationship: Sequelize.STRING,
//   remark: Sequelize.TEXT,
// });

// const AIInsight = sequelize.define('aiInsight', {
//   insight_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   user_id: Sequelize.INTEGER,
//   insight_type: Sequelize.STRING,
//   insight_data: Sequelize.TEXT,
//   insight_date: Sequelize.DATE,
//   remark: Sequelize.TEXT,
// });

// const EventBooking = sequelize.define('eventBooking', {
//   booking_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   booking_code: { type: Sequelize.STRING, unique: true },
//   event_id: Sequelize.INTEGER,
//   venue_id: Sequelize.INTEGER,
//   user_id: Sequelize.INTEGER,
//   booking_date: Sequelize.DATE,
//   num_of_seats: Sequelize.INTEGER,
//   total_cost: Sequelize.DECIMAL,
//   remark: Sequelize.TEXT,
// });

// const Venue = sequelize.define('venue', {
//   venue_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   venue_code: { type: Sequelize.STRING, unique: true },
//   venue_name: Sequelize.STRING,
//   address: Sequelize.STRING,
//   seating_capacity: Sequelize.INTEGER,
//   phone_number: Sequelize.STRING,
//   contact_person: Sequelize.STRING,
//   city: Sequelize.STRING,
//   county: Sequelize.STRING,
//   state: Sequelize.STRING,
//   country: Sequelize.STRING,
//   pin_code: Sequelize.STRING,
//   remark: Sequelize.TEXT,
// });

// const GuestService = sequelize.define('guestService', {
//   service_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   service_code: { type: Sequelize.STRING, unique: true },
//   service_name: Sequelize.STRING,
//   description: Sequelize.TEXT,
//   cost_per_unit: Sequelize.DECIMAL,
//   remark: Sequelize.TEXT,
// });

// const BookingService = sequelize.define('bookingService', {
//   booking_service_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   booking_id: Sequelize.INTEGER,
//   service_id: Sequelize.INTEGER,
//   quantity: Sequelize.INTEGER,
//   total_cost: Sequelize.DECIMAL,
//   remark: Sequelize.TEXT,
// });

// module.exports = {
//   sequelize,
//   User,
//   Membership,
//   Organization,
//   Event,
//   Competition,
//   EventSchedule,
//   Stream,
//   Participant,
//   Team,
//   Committee,
//   CommitteeMember,
//   Award,
//   Score,
//   Sponsor,
//   Sponsorship,
//   PassionDimension,
//   DimensionScore,
//   UserGroup,
//   Family,
//   FamilyMember,
//   AIInsight,
//   EventBooking,
//   Venue,
//   GuestService,
//   BookingService
// };

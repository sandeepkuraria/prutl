//models/eventScheduleModel.js
const db = require('../config/database');

// Create a new event schedule entry
const createEventSchedule = async (schedule) => {
  const { competition_id, start_time, end_time, remark } = schedule;
  const query = `
    INSERT INTO event_schedule (competition_id, start_time, end_time, remark)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const values = [competition_id, start_time, end_time, remark];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Get all event schedule entries
const getAllEventSchedules = async () => {
  const query = 'SELECT * FROM event_schedule';
  const { rows } = await db.pool.query(query);
  return rows;
};

// Get an event schedule entry by ID
const getEventScheduleById = async (id) => {
  const query = 'SELECT * FROM event_schedule WHERE schedule_id = $1';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

// Update an event schedule entry
const updateEventSchedule = async (id, schedule) => {
  const { competition_id, start_time, end_time, remark } = schedule;
  const query = `
    UPDATE event_schedule
    SET competition_id = $1, start_time = $2, end_time = $3, remark = $4, updated_at = CURRENT_TIMESTAMP
    WHERE schedule_id = $5
    RETURNING *
  `;
  const values = [competition_id, start_time, end_time, remark, id];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Delete an event schedule entry
const deleteEventSchedule = async (id) => {
  const query = 'DELETE FROM event_schedule WHERE schedule_id = $1 RETURNING *';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

module.exports = {
  createEventSchedule,
  getAllEventSchedules,
  getEventScheduleById,
  updateEventSchedule,
  deleteEventSchedule,
};

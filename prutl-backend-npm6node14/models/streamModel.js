//models/streamModel.js

const db = require('../config/database');

// Create a new stream entry
const createStream = async (stream) => {
  const { competition_id, stream_url, stream_start_time, stream_end_time, remark } = stream;
  const query = `
    INSERT INTO stream (competition_id, stream_url, stream_start_time, stream_end_time, remark)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  const values = [competition_id, stream_url, stream_start_time, stream_end_time, remark];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Get all stream entries
const getAllStreams = async () => {
  const query = 'SELECT * FROM stream';
  const { rows } = await db.pool.query(query);
  return rows;
};

// Get a stream entry by ID
const getStreamById = async (id) => {
  const query = 'SELECT * FROM stream WHERE stream_id = $1';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

// Update a stream entry
const updateStream = async (id, stream) => {
  const { competition_id, stream_url, stream_start_time, stream_end_time, remark } = stream;
  const query = `
    UPDATE stream
    SET competition_id = $1, stream_url = $2, stream_start_time = $3, stream_end_time = $4, remark = $5, updated_at = CURRENT_TIMESTAMP
    WHERE stream_id = $6
    RETURNING *
  `;
  const values = [competition_id, stream_url, stream_start_time, stream_end_time, remark, id];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Delete a stream entry
const deleteStream = async (id) => {
  const query = 'DELETE FROM stream WHERE stream_id = $1 RETURNING *';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

module.exports = {
  createStream,
  getAllStreams,
  getStreamById,
  updateStream,
  deleteStream,
};

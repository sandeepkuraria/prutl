const db = require('../config/database');

// Create a new competition
const createCompetition = async (competition) => {
  const {
    event_id,
    category_id,
    passion_dimension_id,
    prutl_dimension_id,
    venue_id,
    competition_name,
    type,
    start_date,
    end_date,
    location,
    remark,
  } = competition;

  // Remove competition_code from the query and values as it will be auto-generated
  const query = `
    INSERT INTO competitions (event_id, category_id, passion_dimension_id, prutl_dimension_id, venue_id, competition_name, type, start_date, end_date, location, remark)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *
  `;
  const values = [
    event_id,
    category_id,
    passion_dimension_id,
    prutl_dimension_id,
    venue_id,
    competition_name,
    type,
    start_date,
    end_date,
    location,
    remark,
  ];

  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Get all competitions
const getAllCompetitions = async () => {
  const query = 'SELECT * FROM competitions';
  const { rows } = await db.pool.query(query);
  return rows;
};

// Get a competition by ID
const getCompetitionById = async (id) => {
  const query = 'SELECT * FROM competitions WHERE competition_id = $1';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

// Update a competition
const updateCompetition = async (id, competition) => {
  const {
    event_id,
    category_id,
    passion_dimension_id,
    prutl_dimension_id,
    venue_id,
    competition_name,
    type,
    start_date,
    end_date,
    location,
    remark,
  } = competition;

  // Do not update competition_code, as it should be managed by the trigger/sequence
  const query = `
    UPDATE competitions
    SET event_id = $1, category_id = $2, passion_dimension_id = $3, prutl_dimension_id = $4, venue_id = $5, competition_name = $6, type = $7, start_date = $8, end_date = $9, location = $10, remark = $11, updated_at = CURRENT_TIMESTAMP
    WHERE competition_id = $12
    RETURNING *
  `;
  const values = [
    event_id,
    category_id,
    passion_dimension_id,
    prutl_dimension_id,
    venue_id,
    competition_name,
    type,
    start_date,
    end_date,
    location,
    remark,
    id,
  ];

  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Delete a competition
const deleteCompetition = async (id) => {
  const query = 'DELETE FROM competitions WHERE competition_id = $1 RETURNING *';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

module.exports = {
  createCompetition,
  getAllCompetitions,
  getCompetitionById,
  updateCompetition,
  deleteCompetition,
};


// //models/competitionModel.js
// const db = require('../config/database');

// // Create a new competition
// const createCompetition = async (competition) => {
//   const { competition_code, event_name, category, passion_dimension, prutl_dimension, competition_name, type, start_date, end_date, location, remark } = competition;
//   const query = `
//     INSERT INTO competitions (competition_code, event_name, category, passion_dimension, prutl_dimension, competition_name, type, start_date, end_date, location, remark)
//     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
//     RETURNING *
//   `;
//   const values = [competition_code, event_name, category, passion_dimension, prutl_dimension, competition_name, type, start_date, end_date, location, remark];
//   const { rows } = await db.pool.query(query, values);
//   return rows[0];
// };

// // Get all competitions
// const getAllCompetitions = async () => {
//   const query = 'SELECT * FROM competitions';
//   const { rows } = await db.pool.query(query);
//   return rows;
// };

// // Get a competition by ID
// const getCompetitionById = async (id) => {
//   const query = 'SELECT * FROM competitions WHERE competition_id = $1';
//   const { rows } = await db.pool.query(query, [id]);
//   return rows[0];
// };

// // Update a competition
// const updateCompetition = async (id, competition) => {
//   const { competition_code, event_name, category,passion_dimension, prutl_dimension, competition_name, type, start_date, end_date, location, remark } = competition;
//   const query = `
//     UPDATE competitions
//     SET competition_code = $1, event_name = $2, category = $3, passion_dimension = $4, prutl_dimension = $5, competition_name = $6, type = $7, start_date = $8, end_date = $9, location = $10, remark = $11, updated_at = CURRENT_TIMESTAMP
//     WHERE competition_id = $12
//     RETURNING *
//   `;
//   const values = [competition_code, event_name, category, passion_dimension, prutl_dimension, competition_name, type, start_date, end_date, location, remark, id];
//   const { rows } = await db.pool.query(query, values);
//   return rows[0];
// };

// // Delete a competition
// const deleteCompetition = async (id) => {
//   const query = 'DELETE FROM competitions WHERE competition_id = $1 RETURNING *';
//   const { rows } = await db.pool.query(query, [id]);
//   return rows[0];
// };

// module.exports = {
//   createCompetition,
//   getAllCompetitions,
//   getCompetitionById,
//   updateCompetition,
//   deleteCompetition,
// };

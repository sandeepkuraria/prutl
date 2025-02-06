//models/aiInsightModel.js
const db = require('../config/database');

// Create a new AI Insight
const createAIInsight = async (aiInsight) => {
  const { user_id, insight_type, insight_data, insight_date, remark } = aiInsight;
  const query = `
    INSERT INTO ai_insights (user_id, insight_type, insight_data, insight_date, remark)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  const values = [user_id, insight_type, insight_data, insight_date, remark];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Get all AI Insights
const getAllAIInsights = async () => {
  const query = 'SELECT * FROM ai_insights';
  const { rows } = await db.pool.query(query);
  return rows;
};

// Get an AI Insight by ID
const getAIInsightById = async (id) => {
  const query = 'SELECT * FROM ai_insights WHERE insight_id = $1';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

// Update an AI Insight
const updateAIInsight = async (id, aiInsight) => {
  const { user_id, insight_type, insight_data, insight_date, remark } = aiInsight;
  const query = `
    UPDATE ai_insights
    SET user_id = $1, insight_type = $2, insight_data = $3, insight_date = $4, remark = $5, updated_at = CURRENT_TIMESTAMP
    WHERE insight_id = $6
    RETURNING *
  `;
  const values = [user_id, insight_type, insight_data, insight_date, remark, id];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Delete an AI Insight
const deleteAIInsight = async (id) => {
  const query = 'DELETE FROM ai_insights WHERE insight_id = $1 RETURNING *';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

module.exports = {
  createAIInsight,
  getAllAIInsights,
  getAIInsightById,
  updateAIInsight,
  deleteAIInsight,
};

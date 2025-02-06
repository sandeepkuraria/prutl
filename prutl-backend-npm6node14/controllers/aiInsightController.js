// //controllers/aiInsightController.js

const AIInsight = require('../models/aiInsightModel');

// Create a new AI Insight
const createAIInsight = async (req, res, next) => {
  try {
    const aiInsight = await AIInsight.createAIInsight(req.body);
    res.status(201).json(aiInsight);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Get all AI Insights
const getAllAIInsights = async (req, res, next) => {
  try {
    const aiInsights = await AIInsight.getAllAIInsights();
    res.json(aiInsights);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Get an AI Insight by ID
const getAIInsightById = async (req, res, next) => {
  try {
    const aiInsight = await AIInsight.getAIInsightById(req.params.id);
    if (!aiInsight) {
      const error = new Error('AI Insight not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(aiInsight);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Update an AI Insight
const updateAIInsight = async (req, res, next) => {
  try {
    const aiInsight = await AIInsight.updateAIInsight(req.params.id, req.body);
    if (!aiInsight) {
      const error = new Error('AI Insight not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(aiInsight);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Delete an AI Insight
const deleteAIInsight = async (req, res, next) => {
  try {
    const aiInsight = await AIInsight.deleteAIInsight(req.params.id);
    if (!aiInsight) {
      const error = new Error('AI Insight not found');
      error.statusCode = 404;
      throw error;
    }
    res.json({ message: 'AI Insight deleted successfully' });
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

module.exports = {
  createAIInsight,
  getAllAIInsights,
  getAIInsightById,
  updateAIInsight,
  deleteAIInsight,
};

// //controllers/aiInsightController.js
// const AIInsight = require('../models/aiInsightModel');

// // Create a new AI Insight
// const createAIInsight = async (req, res) => {
//   try {
//     const aiInsight = await AIInsight.createAIInsight(req.body);
//     res.status(201).json(aiInsight);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get all AI Insights
// const getAllAIInsights = async (req, res) => {
//   try {
//     const aiInsights = await AIInsight.getAllAIInsights();
//     res.json(aiInsights);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get an AI Insight by ID
// const getAIInsightById = async (req, res) => {
//   try {
//     const aiInsight = await AIInsight.getAIInsightById(req.params.id);
//     if (!aiInsight) {
//       return res.status(404).json({ message: 'AI Insight not found' });
//     }
//     res.json(aiInsight);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update an AI Insight
// const updateAIInsight = async (req, res) => {
//   try {
//     const aiInsight = await AIInsight.updateAIInsight(req.params.id, req.body);
//     if (!aiInsight) {
//       return res.status(404).json({ message: 'AI Insight not found' });
//     }
//     res.json(aiInsight);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete an AI Insight
// const deleteAIInsight = async (req, res) => {
//   try {
//     const aiInsight = await AIInsight.deleteAIInsight(req.params.id);
//     if (!aiInsight) {
//       return res.status(404).json({ message: 'AI Insight not found' });
//     }
//     res.json({ message: 'AI Insight deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   createAIInsight,
//   getAllAIInsights,
//   getAIInsightById,
//   updateAIInsight,
//   deleteAIInsight,
// };

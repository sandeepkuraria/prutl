// controllers/streamController.js
const Stream = require('../models/streamModel');

// Create a new stream entry
const createStream = async (req, res, next) => {
  try {
    const stream = await Stream.createStream(req.body);
    res.status(201).json(stream);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Get all stream entries
const getAllStreams = async (req, res, next) => {
  try {
    const streams = await Stream.getAllStreams();
    res.json(streams);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Get a stream entry by ID
const getStreamById = async (req, res, next) => {
  try {
    const stream = await Stream.getStreamById(req.params.id);
    if (!stream) {
      const error = new Error('Stream not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(stream);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Update a stream entry
const updateStream = async (req, res, next) => {
  try {
    const stream = await Stream.updateStream(req.params.id, req.body);
    if (!stream) {
      const error = new Error('Stream not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(stream);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Delete a stream entry
const deleteStream = async (req, res, next) => {
  try {
    const stream = await Stream.deleteStream(req.params.id);
    if (!stream) {
      const error = new Error('Stream not found');
      error.statusCode = 404;
      throw error;
    }
    res.json({ message: 'Stream deleted successfully' });
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

module.exports = {
  createStream,
  getAllStreams,
  getStreamById,
  updateStream,
  deleteStream,
};


// //controllers/streamController.js
// const Stream = require('../models/streamModel');

// // Create a new stream entry
// const createStream = async (req, res) => {
//   try {
//     const stream = await Stream.createStream(req.body);
//     res.status(201).json(stream);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get all stream entries
// const getAllStreams = async (req, res) => {
//   try {
//     const streams = await Stream.getAllStreams();
//     res.json(streams);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get a stream entry by ID
// const getStreamById = async (req, res) => {
//   try {
//     const stream = await Stream.getStreamById(req.params.id);
//     if (!stream) {
//       return res.status(404).json({ message: 'Stream not found' });
//     }
//     res.json(stream);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update a stream entry
// const updateStream = async (req, res) => {
//   try {
//     const stream = await Stream.updateStream(req.params.id, req.body);
//     if (!stream) {
//       return res.status(404).json({ message: 'Stream not found' });
//     }
//     res.json(stream);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete a stream entry
// const deleteStream = async (req, res) => {
//   try {
//     const stream = await Stream.deleteStream(req.params.id);
//     if (!stream) {
//       return res.status(404).json({ message: 'Stream not found' });
//     }
//     res.json({ message: 'Stream deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   createStream,
//   getAllStreams,
//   getStreamById,
//   updateStream,
//   deleteStream,
// };

// errorHandler.js
const errorHandler = (err, req, res, next) => {
    // Default to 500 for any server error if no statusCode is set
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';
  
    // Log the error details for debugging purposes (e.g., using a logger)
    console.error(err);
  
    // Handle specific types of common errors
  
    // Validation errors or bad request
    if (err.name === 'ValidationError' || err.statusCode === 400) {
      statusCode = 400;
      message = 'Bad Request: Validation failed or invalid payload';
    }
  
    // Unauthorized errors (e.g., invalid token)
    if (err.name === 'UnauthorizedError' || err.statusCode === 401) {
      statusCode = 401;
      message = 'Unauthorized: Authentication failed';
    }
  
    // Forbidden errors (e.g., user does not have the required permissions)
    if (err.statusCode === 403) {
      statusCode = 403;
      message = 'Forbidden: You do not have the necessary permissions';
    }
  
    // Resource not found errors
    if (err.statusCode === 404) {
      statusCode = 404;
      message = 'Resource Not Found: The requested resource does not exist';
    }
  
    // Validation errors (for unprocessable entity, e.g., 422)
    if (err.statusCode === 422) {
      statusCode = 422;
      message = 'Validation Error: Invalid input or data processing issue';
    }
  
    // Internal server errors (generic server issues)
    if (statusCode === 500) {
      message = 'Internal Server Error: Something went wrong on our end';
    }
  
    // Return the error response
    res.status(statusCode).json({
      success: false,
      error: {
        code: statusCode,
        message: message,
        details: err.details || null // Add more error details if available
      }
    });
  };
  
  module.exports = errorHandler;
  

// // errorHandler.js
// const errorHandler = (err, req, res, next) => {
//     const statusCode = err.statusCode || 500; // Default to 500 for any server error
//     const message = err.message || 'Internal Server Error';
  
//     // Log the error if necessary (e.g., using a logger like winston or console)
//     console.error(err);
  
//     // Respond with the error message
//     res.status(statusCode).json({
//       success: false,
//       error: {
//         code: statusCode,
//         message: message,
//         details: err.details || null
//       }
//     });
//   };
  
//   module.exports = errorHandler;
  
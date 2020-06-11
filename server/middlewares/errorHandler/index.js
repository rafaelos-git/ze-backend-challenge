const {
  ResourceNotFound,
  NotCoveredArea,
} = require('./customExceptions');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err instanceof ResourceNotFound) {
    return res.status(404).json({
      error: true,
      message: err.message,
    });
  }

  if (err instanceof NotCoveredArea) {
    return res.status(404).json({
      error: true,
      message: err.message,
    });
  }

  /* Uncaught error */
  // eslint-disable-next-line no-console
  console.error(err);
  return res.status(500).json({
    error: true,
    message: 'Internal Server Error',
  });
};

module.exports = () => errorHandler;

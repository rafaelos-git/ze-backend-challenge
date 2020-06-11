/* eslint-disable no-console */
const mongoose = require('mongoose');
const {
  ResourceNotFound,
  NotCoveredArea,
} = require('./customExceptions');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err instanceof ResourceNotFound) {
    return res.status(404).json({
      error: true,
      type: 'ResourceNotFound',
      messages: [err.message],
    });
  }

  if (err instanceof NotCoveredArea) {
    return res.status(404).json({
      error: true,
      type: 'NotCoveredArea',
      messages: [err.message],
    });
  }

  if (err instanceof mongoose.Error) {
    const messages = [];
    let errorName;

    // eslint-disable-next-line
    for (errorName in err.errors) {
      messages.push(err.errors[errorName].message);
    }

    return res.status(400).json({
      error: true,
      type: 'ValidationError',
      messages,
    });
  }

  if (err.name === 'MongoError') {
    return res.status(400).json({
      error: true,
      type: 'MongoError',
      messages: [err.message],
    });
  }

  /* Uncaught error */
  console.error(err);
  return res.status(500).json({
    error: true,
    type: 'UnknownError',
    messages: ['Internal Server Error'],
  });
};

module.exports = () => errorHandler;

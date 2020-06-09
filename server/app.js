const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

// Init db

// Init repositories

// Init services

// Init controllers

// Init routes

const { conn, connectDb } = require('./db');

module.exports = (router) => {
  const app = express();

  // secure apps by setting some HTTP headers
  app.use(helmet());

  // enable CORS - Cross Origin Resource Sharing
  app.use(cors());

  // parse body params and attache them to req.body
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: false,
    }),
  );

  // routes
  app.use(router);

  // error handler
  /* eslint no-unused-vars: 0 */
  app.use((err, req, res, next) => {
    console.error(err);
    res
      .status(err.status || 500)
      .json({ error: true, msg: err.detail || err.message });
  });

  return app;
};

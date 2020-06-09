const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

// Dependency Injection
const mongo = require('./database');
const factoryModels = require('./models');
const factoryRepositories = require('./repositories');
const factoryServices = require('./services');
const factoryControllers = require('./controllers');
const factoryRouters = require('./routers');
const { createRoutes } = require('./routers/routes');

class App {
  constructor() {
    this.app = express();

    // secure apps by setting some HTTP headers
    this.app.use(helmet());

    // enable CORS - Cross Origin Resource Sharing
    this.app.use(cors());

    // parse body params and attache them to req.body
    this.app.use(bodyParser.json());
    this.app.use(
      bodyParser.urlencoded({
        extended: false,
      }),
    );

    this._initApp();

    // error handler
    this.app.use((err, req, res, next) => {
      console.error(err);
      res
        .status(err.status || 500)
        .json({ error: true, message: err.detail || err.message });
    });
  }

  _initApp() {
    const models = factoryModels(mongo);
    const repositories = factoryRepositories(models);
    const services = factoryServices(repositories);
    const controllers = factoryControllers(services);
    const routers = factoryRouters(controllers);
    this.app.use('/api', createRoutes(routers));
  }

  create() {
    return this.app;
  }
}

module.exports = new App().create();

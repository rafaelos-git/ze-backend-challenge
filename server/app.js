const express = require('express');
const middlewares = require('./middlewares');
const docs = require('./docs');

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

    // Add middlewares before routes
    this.app.use(middlewares.preMiddlewares());

    // Serve docs
    this.app.use('/docs', docs.serve, docs.spec);

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

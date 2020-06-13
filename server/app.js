require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});
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
    this.app.use(middlewares.before());

    // Serve docs
    this.app.use('/docs', docs.serve, docs.spec);

    // Init app
    this._initApp();

    // Add middlewares after routes
    this.app.use(middlewares.after());
  }

  _initApp() {
    const models = factoryModels(mongo);
    const repositories = factoryRepositories(models);
    const services = factoryServices(repositories);
    const controllers = factoryControllers(services);
    const routers = factoryRouters(controllers);
    this.app.use(createRoutes(routers));
  }

  create() {
    return this.app;
  }
}

module.exports = new App().create();

const { Router } = require('express');

const createRoutes = (routers) => new Router()
  .use('/v1/pdvs', routers.pdvsRouter)
  .use('*', (req, res) => res.status(404).send('You are lost'));

module.exports = {
  createRoutes,
};

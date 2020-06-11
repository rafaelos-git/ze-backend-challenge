const { Router } = require('express');

class PdvRouter {
  constructor({ pdvController }) {
    this.pdvController = pdvController;
  }

  create() {
    return new Router()
      .get('/:id', this.pdvController.getById.bind(this.pdvController))
      .get('/nearest/:lng/:lat', this.pdvController.getNearest.bind(this.pdvController))
      .post('/', this.pdvController.create.bind(this.pdvController));
  }
}

module.exports = PdvRouter;

const { Router } = require('express');

class PdvsRoutes {
  constructor({ pdvsController }) {
    this.pdvsController = pdvsController;
  }

  create() {
    return new Router()
      .get('/:id', this.pdvsController.getById.bind(this.pdvsController))
      .get('/nearest/search', this.pdvsController.searchPartnes.bind(this.pdvsController))
      .post('/', this.pdvsController.create.bind(this.pdvsController));
  }
}

module.exports = PdvsRoutes;

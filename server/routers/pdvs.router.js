const { Router } = require('express');

class PdvsRoutes {
  constructor({ pdvsController }) {
    this.pdvsController = pdvsController;
  }

  create() {
    return new Router()
      .get('/:id', this.pdvsController.getById.bind(this.pdvsController));
  }
}

module.exports = PdvsRoutes;

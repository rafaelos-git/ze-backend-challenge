class PdvsController {
  constructor({ pdvService }) {
    this.pdvService = pdvService;
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const pdv = await this.pdvService.getById.execute({ id });
      res.json(pdv);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = PdvsController;

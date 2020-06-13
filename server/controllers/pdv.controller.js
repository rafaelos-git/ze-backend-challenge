class PdvController {
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

  async create(req, res, next) {
    try {
      const {
        coverageArea,
        address,
        tradingName,
        ownerType,
        ownerName,
        document,
      } = req.body;

      const newPdv = await this.pdvService.create.execute({
        coverageArea,
        address,
        tradingName,
        ownerType,
        ownerName,
        document,
      });

      res.json(newPdv);
    } catch (e) {
      next(e);
    }
  }

  async getNearest(req, res, next) {
    try {
      const { lng, lat } = req.params;

      const nearestPdv = await this.pdvService.getNearest.execute({ lng, lat });

      res.json(nearestPdv);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = PdvController;

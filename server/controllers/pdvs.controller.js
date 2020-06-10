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

  async create(req, res, next) {
    try {
      const {
        id,
        coverageArea,
        address,
        tradingName,
        ownerType,
        ownerName,
        document,
      } = req.body;

      const newPdv = await this.pdvService.create.execute({
        id,
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

  async searchPartnes(req, res, next) {
    try {
      const { lng, lat } = req.query;

      const partnes = await this.pdvService.searchNearestPartner.execute({ lng, lat });

      res.json(partnes);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = PdvsController;

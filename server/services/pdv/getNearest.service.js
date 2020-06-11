const { NotCoveredArea } = require('../../middlewares/errorHandler/customExceptions');

class GetNearestService {
  constructor({ pdvRepository }) {
    this.pdvRepository = pdvRepository;
  }

  async execute({ lng, lat }) {
    const nearestPdv = await this.pdvRepository.getNearest({
      lng: parseFloat(lng),
      lat: parseFloat(lat),
    });

    if (!nearestPdv) {
      throw new NotCoveredArea();
    }

    const {
      distance,
      ...nearestPdvWithoutDist
    } = nearestPdv;

    return { ...nearestPdvWithoutDist };
  }
}

module.exports = GetNearestService;

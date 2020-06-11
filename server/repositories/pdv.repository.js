class PdvsRepository {
  constructor({ Pdv }) {
    this.Pdv = Pdv;
  }

  async findOne(params) {
    return this.Pdv.findOne(params);
  }

  async create(pdv) {
    return this.Pdv.create(pdv);
  }


  async getNearest({ lng, lat }) {
    const [nearestPdv] = await this.Pdv.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [lng, lat] },
          distanceField: 'distance',
          spherical: true,
          query: { coverageArea: { $geoIntersects: { $geometry: { type: 'Point', coordinates: [lng, lat] } } } },
        },
      },
      { $sort: { distance: 1 } },
      { $limit: 1 },
    ]);

    return nearestPdv;
  }

  async getNextId() {
    const pdvsQt = await this.Pdv.countDocuments();
    const nextId = pdvsQt + 1;
    return nextId.toString();
  }
}

module.exports = PdvsRepository;

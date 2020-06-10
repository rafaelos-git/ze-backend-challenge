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


  async searchNearestPartner({ lng, lat }) {
    const [partner] = await this.Pdv.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [lng, lat] },
          distanceField: 'distance',
          spherical: true,
        },
      },
      { $match: { coverageArea: { $geoIntersects: { $geometry: { type: 'Point', coordinates: [lng, lat] } } } } },
      { $sort: { distance: 1 } },
      { $limit: 1 },
    ]);

    return partner;
  }

  async getNextId() {
    const pdvsQt = await this.Pdv.countDocuments();
    const nextId = pdvsQt + 1;
    return nextId.toString();
  }
}

module.exports = PdvsRepository;

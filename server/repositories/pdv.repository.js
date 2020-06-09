class PdvsRepository {
  constructor({ Pdv }) {
    this.Pdv = Pdv;
  }

  async findOne(params) {
    return this.Pdv.findOne(params);
  }
}

module.exports = PdvsRepository;

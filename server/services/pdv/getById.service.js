class PdvsGetByIdService {
  constructor({ pdvRepository }) {
    this.pdvRepository = pdvRepository;
  }

  async execute({ id }) {
    return this.pdvRepository.findOne({ id });
  }
}

module.exports = PdvsGetByIdService;

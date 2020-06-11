class CreateService {
  constructor({ pdvRepository }) {
    this.pdvRepository = pdvRepository;
  }

  async execute({
    id,
    coverageArea,
    address,
    tradingName,
    ownerType,
    ownerName,
    document,
  }) {
    const pdv = await this.pdvRepository.create({
      id: id || await this.pdvRepository.getNextId(),
      coverageArea,
      address,
      tradingName,
      ownerType,
      ownerName,
      document,
    });

    return pdv;
  }
}

module.exports = CreateService;
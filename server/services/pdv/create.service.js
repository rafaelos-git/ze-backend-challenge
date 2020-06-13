class CreateService {
  constructor({ pdvRepository }) {
    this.pdvRepository = pdvRepository;
  }

  async execute({
    coverageArea,
    address,
    tradingName,
    ownerType,
    ownerName,
    document,
  }) {
    const pdv = await this.pdvRepository.create({
      id: await this.pdvRepository.getNextId(),
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

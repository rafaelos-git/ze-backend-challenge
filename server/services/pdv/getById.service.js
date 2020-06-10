class PdvsGetByIdService {
  constructor({ pdvRepository }) {
    this.pdvRepository = pdvRepository;
  }

  async execute({ id }) {
    const parsedId = id.toString();
    const pdv = await this.pdvRepository.findOne({ id: parsedId });

    if (!pdv) {
      throw new Error(`Can not find pdv with id: ${id}`);
    }

    return pdv;
  }
}

module.exports = PdvsGetByIdService;

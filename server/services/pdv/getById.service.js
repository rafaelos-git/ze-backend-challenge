const { ResourceNotFound } = require('../../middlewares/errorHandler/customExceptions');

class GetByIdService {
  constructor({ pdvRepository }) {
    this.pdvRepository = pdvRepository;
  }

  async execute({ id }) {
    const parsedId = parseInt(id, 10);
    const pdv = await this.pdvRepository.findOne({ id: parsedId });

    if (!pdv) {
      throw new ResourceNotFound(id);
    }

    return pdv;
  }
}

module.exports = GetByIdService;

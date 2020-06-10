class SearchPartnes {
  constructor({ pdvRepository }) {
    this.pdvRepository = pdvRepository;
  }

  async execute({ lng, lat }) {
    return this.pdvRepository.searchPartnes({
      lng: parseFloat(lng),
      lat: parseFloat(lat),
    });
  }
}

module.exports = SearchPartnes;

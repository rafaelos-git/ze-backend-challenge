class SearchNearestPartner {
  constructor({ pdvRepository }) {
    this.pdvRepository = pdvRepository;
  }

  async execute({ lng, lat }) {
    const partner = await this.pdvRepository.searchNearestPartner({
      lng: parseFloat(lng),
      lat: parseFloat(lat),
    });

    if (!partner) {
      throw Error('There is no partner that cover this location');
    }
    const {
      distance,
      ...partnerWithoutDistance
    } = partner;

    return { ...partnerWithoutDistance };
  }
}

module.exports = SearchNearestPartner;

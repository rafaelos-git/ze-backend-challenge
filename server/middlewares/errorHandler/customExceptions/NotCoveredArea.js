class NotCoveredArea extends Error {
  constructor() {
    super('There is no pdv that cover this area');
  }
}

module.exports = NotCoveredArea;

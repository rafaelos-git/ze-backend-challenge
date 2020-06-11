class ResourceNotFound extends Error {
  constructor(id) {
    super(`Can not find PDV with id: ${id}`);
  }
}

module.exports = ResourceNotFound;

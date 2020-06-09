/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const fs = require('fs');

const factoryModels = (database) => {
  const modelsFileNames = fs.readdirSync('./server/models');

  let models = {};
  modelsFileNames.forEach((modelName) => {
    const parsedName = modelName.split('.')[0];

    if (parsedName !== 'index') {
      const Model = require(`./${parsedName}.model`);
      const model = new Model(database);
      const exportedName = parsedName.charAt(0).toUpperCase() + parsedName.slice(1);
      models = { ...models, [exportedName]: model.create() };
    }
  });

  return models;
};

module.exports = factoryModels;

/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const fs = require('fs');

const factoryRepositories = (models) => {
  const repositoriesFileNames = fs.readdirSync('./server/repositories');

  let repositores = {};
  repositoriesFileNames.forEach((repositoryName) => {
    const parsedName = repositoryName.split('.')[0];

    if (parsedName !== 'index') {
      const Repository = require(`./${parsedName}.repository`);
      const repository = new Repository(models);
      const exportedName = `${parsedName}Repository`;
      repositores = { ...repositores, [exportedName]: repository };
    }
  });

  return repositores;
};

module.exports = factoryRepositories;

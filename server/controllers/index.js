/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const fs = require('fs');

const factoryControllers = (services) => {
  const controllersFileNames = fs.readdirSync('./server/controllers');

  let controllers = {};
  controllersFileNames.forEach((controllerName) => {
    const parsedName = controllerName.split('.')[0];

    if (parsedName !== 'index') {
      const Controller = require(`./${parsedName}.controller`);
      const controller = new Controller(services);
      const exportedName = `${parsedName}Controller`;
      controllers = { ...controllers, [exportedName]: controller };
    }
  });

  return controllers;
};

module.exports = factoryControllers;

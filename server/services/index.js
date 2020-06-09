/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const fs = require('fs');

const factoryServices = (repositories) => {
  const servicesDirNames = fs.readdirSync('./server/services');

  let services = {};
  // Create a service with each direcotry name
  servicesDirNames.forEach((dirName) => {
    if (dirName !== 'index.js') {
      const serviceName = `${dirName}Service`;
      const serviceFilesNames = fs.readdirSync(`./server/services/${dirName}`);
      services = { ...services, [serviceName]: {} };

      // Add microservices to created service
      serviceFilesNames.forEach((fileName) => {
        const parsedName = fileName.split('.')[0];
        const ServiceClass = require(`./${dirName}/${parsedName}.service`);
        const serviceClass = new ServiceClass(repositories);
        services[serviceName] = { ...services[serviceName], [parsedName]: serviceClass };
      });
    }
  });

  return services;
};

module.exports = factoryServices;

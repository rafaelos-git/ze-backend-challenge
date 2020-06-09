/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const fs = require('fs');

const factoryRouters = (controllers) => {
  const routesFileNames = fs.readdirSync('./server/routers');

  let routers = {};
  routesFileNames.forEach((routeName) => {
    const parsedName = routeName.split('.')[0];

    if (parsedName !== 'index' && parsedName !== 'routes') {
      const Router = require(`./${parsedName}.router`);
      const router = new Router(controllers);
      const exportedName = `${parsedName}Router`;
      routers = { ...routers, [exportedName]: router.create() };
    }
  });

  return routers;
};

module.exports = factoryRouters;

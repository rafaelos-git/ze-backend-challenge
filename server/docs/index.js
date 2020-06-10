const fs = require('fs');
const path = require('path');
const swaggerUI = require('swagger-ui-express');

const swaggerFile = fs.readFileSync(path.resolve(__dirname, './swaggerFile.json'));

module.exports = {
  serve: swaggerUI.serve,
  spec: swaggerUI.setup(JSON.parse(swaggerFile)),
};

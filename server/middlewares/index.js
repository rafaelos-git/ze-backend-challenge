const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

morgan.token('body', (req) => JSON.stringify(req.body));

const preMiddlewares = () => [
  // secure apps by setting some HTTP headers
  helmet(),

  // enable CORS - Cross Origin Resource Sharing
  cors(),

  // parse body params and attache them to req.body
  bodyParser.json(),
  bodyParser.urlencoded({
    extended: false,
  }),

  // Log requests
  morgan('dev'),
  morgan('Body: :body'),
];

module.exports = {
  preMiddlewares,
};

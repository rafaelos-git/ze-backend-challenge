const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const errorHandler = require('./errorHandler');

morgan.token('body', (req) => JSON.stringify(req.body));

const before = () => [
  // secure apps by setting some HTTP headers
  helmet(),

  // enable CORS - Cross Origin Resource Sharing
  cors(),

  // parse body params and attache them to req.body
  bodyParser.json(),
  bodyParser.urlencoded({
    extended: false,
  }),

  // log requests
  morgan('Req body: :body'),
  morgan('dev'),
];

const after = () => [
  // error handlers
  errorHandler(),
];

module.exports = {
  before,
  after,
};

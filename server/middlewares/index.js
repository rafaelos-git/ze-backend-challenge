const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const errorHandler = require('./errorHandler');

morgan.token('params', (req) => JSON.stringify(req.params));
morgan.token('body', (req) => JSON.stringify(req.body));

const before = () => {
  const middlewares = [
    // secure apps by setting some HTTP headers
    helmet(),

    // enable CORS - Cross Origin Resource Sharing
    cors(),

    // parse body params and attache them to req.body
    bodyParser.json(),
    bodyParser.urlencoded({
      extended: false,
    }),
  ];

  if (process.env.NODE_ENV !== 'test') {
    // Log requests
    middlewares.push(
      morgan('Req params: :params'),
      morgan('Req body: :body'),
      morgan('dev'),
    );
  }

  return middlewares;
};

const after = () => [
  // error handlers
  errorHandler(),
];

module.exports = {
  before,
  after,
};

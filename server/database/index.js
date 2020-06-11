const mongoose = require('mongoose');

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${process.env.DB_URL}`);
});

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

if (process.env.DB_USER) {
  mongoOptions.user = process.env.DB_USER;
}

if (process.env.DB_PASS) {
  mongoOptions.pass = process.env.DB_PASS;
}

if (process.env.DB_NAME) {
  mongoOptions.dbName = process.env.DB_NAME;
}

mongoose.connect(process.env.DB_URL, mongoOptions);

module.exports = mongoose;

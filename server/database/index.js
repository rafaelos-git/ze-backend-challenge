const mongoose = require('mongoose');

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${process.env.DB_URL}`);
});

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

module.exports = mongoose;

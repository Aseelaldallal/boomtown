const mongoose = require('mongoose');
const seedDB = require('./seed');

mongoose.Promise = global.Promise; // Get promises from Node
console.log("DB", process.env.BOOMTOWN_DB_URI);
mongoose.connect(
  process.env.BOOMTOWN_DB_URI || 'mongodb://localhost:27017/boomtown'
);

mongoose.connection.on(
  'error',
  console.error.bind(console, 'connection error:')
);

mongoose.connection.once('open', function() {
  console.log('Connected to DB');
  //seedDB();
});

module.exports = mongoose;

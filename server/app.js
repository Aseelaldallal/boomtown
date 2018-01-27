// =============================================================================
// BASIC SETUP
// =============================================================================

// Get Packages
const mongoose = require('./db/mongoose'),
  express = require('express'),
  bodyParser = require('body-parser');

// Get Express Instance
const app = express();

// Port
const PORT = process.env.PORT || 3001;

// =============================================================================
// LISTEN
// =============================================================================

app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});

// // Routes
// let itemRoutes = require('./routes/item');

// // configure app to use bodyParser()
// // this will let us get the data from a POST
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// // REGISTER OUR ROUTES -------------------------------
// // all of our routes will be prefixed with /
// app.use('/items', itemRoutes);

// // START THE SERVER
// // =============================================================================

// app.listen(3001, function() {
//   console.log('Listening!');
// });

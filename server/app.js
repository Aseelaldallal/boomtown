// =============================================================================
// SETUP
// =============================================================================

// Port
const PORT = process.env.PORT || 3001;

// Get Packages
const mongoose = require('./db/mongoose'),
  express = require('express'),
  bodyParser = require('body-parser');

// Get Express Instance
const app = express();

// =============================================================================
// MIDDLEWARE
// =============================================================================

// Parse client request body - turn it into JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

// =============================================================================
// ROUTE SETUP
// =============================================================================

// Get Routes
let itemRoutes = require('./routes/item');
let userRoutes = require('./routes/user');

// Register Routes
app.use('/items', itemRoutes); // All routes inside itemRoutes are now prefixed with /items
app.use('/users', userRoutes);

// =============================================================================
// LISTEN
// =============================================================================

app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});


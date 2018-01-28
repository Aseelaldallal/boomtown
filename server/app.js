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

// Get Routes
let itemRoutes = require('./routes/item');

// =============================================================================
// MIDDLEWARE
// =============================================================================

// Parse client request body - turn it into JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Register Routes
app.use('/items', itemRoutes); // All routes inside itemRoutes are now prefixed with /items

// =============================================================================
// LISTEN
// =============================================================================

app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});


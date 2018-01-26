// BASE SETUP
// =============================================================================

// Call the packages we need
let express = require('express'); // call express
let bodyParser = require('body-parser');

// define our app using express
let app = express(); 

// Routes
let itemRoutes = require('./routes/item');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /
app.use('/items', itemRoutes);

// START THE SERVER
// =============================================================================

app.listen(3001, function() {
  console.log('Listening!');
});

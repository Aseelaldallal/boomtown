// BASE SETUP
// =============================================================================

// call the packages we need
let express = require('express'); // call express
let app = express(); // define our app using express
let bodyParser = require('body-parser');
let itemRoutes = require('./routes/item');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// var port = 3001; // set our port

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /
app.use('/items', itemRoutes);

// START THE SERVER
// =============================================================================
// app.listen(port);
// console.log('Magic happens on port ' + port);

app.listen(3001, function() {
  console.log('Event App Server Has Started!');
});

// =============================================================================
// SETUP
// =============================================================================

// Port
const PORT = process.env.PORT || 3001;

// Get Packages
const mongoose = require('./db/mongoose'),
  express = require('express'),
  bodyParser = require('body-parser'),
  passport = require('./config/passport'), // automatically requires index.js
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  morgan = require('morgan'),
  flash = require('connect-flash');

// Get Express Instance
const app = express();

// =============================================================================
// MIDDLEWARE
// =============================================================================

// Parse client request body - turn it into JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add headers
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONT_END_URL);
  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type, Authorization'
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

// Log every request to the console
app.use(morgan('dev'));

// Read Cookies (Needed for Auth)
app.use(cookieParser());

// Configure for Passport
app.use(
  session({
    secret: 'kittens',
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session()); // persistent login session
app.use(flash()); // use connect-flash for flash messages stored in session

// =============================================================================
// ROUTE SETUP
// =============================================================================

// Get Routes
let authRoutes = require('./routes/auth');
let itemRoutes = require('./routes/item');
let userRoutes = require('./routes/user');

// Register Routes
app.use('/items', itemRoutes); // All routes inside itemRoutes are now prefixed with /items
app.use('/users', userRoutes);
app.use('/', authRoutes);

// =============================================================================
// LISTEN
// =============================================================================

app.listen(PORT, function() {
  console.log(`Server started on port ${PORT}`);
});

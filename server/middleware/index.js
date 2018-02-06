// ====================================================================
// SETUP
// ====================================================================
const indicative = require('indicative');
const sanitizeHtml = require('sanitize-html');
var middlewareObj = {};

// ====================================================================
// Validate Registration Form
// ====================================================================

middlewareObj.validateRegisterationForm = function(req, res, next) {
  trim(req);
  const rules = {
    email: 'required|email|max:120',
    password: 'required|min:7|max:120',
    fullname: 'required',
    bio: 'required|min:50|max:200'
  };
  const messages = {
    'email.required': 'You must enter an email address',
    'email.email': 'The email address you entered is invalid',
    'email.max': 'Sorry, our db does not store emails longer than 120 chars',
    'password.required': 'You must enter a password',
    'password.min': 'Choose a password that is at least 7 characters long',
    'password.max': 'Seriously? Choose a password that is less than 120 chars',
    'fullname.required': 'You must enter your full name',
    'bio.required': 'You must enter something about yourself',
    'bio.min': 'Your bio must be at least 50 chars long',
    'bio.max': 'Your bio cannot be more than 200 chars long'
  };
  const data = {
    email: req.body.email,
    password: req.body.password,
    fullname: req.body.fullname,
    bio: req.body.bio
  };
  validate(data, rules, messages, req, res, next);
};

// ====================================================================
// Validate Login Form
// ====================================================================

middlewareObj.validateRegisterationForm = function(req, res, next) {
  trim(req);
  const rules = {
    email: 'required|email',
    password: 'required'
  };
  const messages = {
    'email.required': 'You must enter an email address',
    'email.email': 'The email address you entered is invalid',
    'password.required': 'You must enter a password'
  };
  const data = {
    email: req.body.email,
    password: req.body.password
  };
  validate(data, rules, messages, req, res, next);
};

// ====================================================================
// Sanitize HTML
// ====================================================================

// Sanitize html: https://www.npmjs.com/package/sanitize-html
middlewareObj.sanitizeUserInput = function(req, res, next) {
  for (var key in req.body) {
    if (req.body[key]) {
      req.body[key] = sanitizeHtml(req.body[key], {
        allowedTags: [],
        allowedAttributes: []
      });
    }
  }
  return next();
};

// ====================================================================
// Helper Methods
// ====================================================================

// Validate
function validate(data, rules, messages, req, res, next) {
  indicative
    .validateAll(data, rules, messages)
    .then(function() {
      // validation success
      return next();
    })
    .catch(function(errors) {
      // validation fail
      var validationErrors = getValidationErrors(errors);
      res.status(400).send({ messages: validationErrors });
    });
}

// Errors in an array of objects. Each object has a field, validation, and message. This function
// extracts message from each object, and compiles them into one string. It then returns the string.
function getValidationErrors(errors) {
  var messages = [];
  errors.forEach(function(msgObject) {
    messages.push(msgObject.message);
  });
  return messages;
}

// Trim user input -- Import for use with sanitize
function trim(req) {
  for (var key in req.body) {
    req.body[key] = req.body[key].trim();
    if (req.body[key] == '') {
      req.body[key] = null;
    }
  }
}

// ====================================================================
// EXPORT
// ====================================================================

module.exports = middlewareObj;

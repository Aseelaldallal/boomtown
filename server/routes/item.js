/***************************************************/
/********************* SETUP ***********************/
/***************************************************/

var express = require('express'),
  Item = require('../models/item'),
  router = express.Router();

/* ----------------- INDEX ROUTE ----------------- */

// Display All Items
router.get('/', function(req, res) {
  res.send('Index');
});

/* ----------------- NEW ROUTE ----------------- */
// NOT WORKING
// NOT REQUIRED
// Display form to create item
router.get('/new', function(req, res) {
  res.send('new route');
});

/* ----------------- SHOW ROUTE ----------------- */

// NOT REQUIRED
// Display item with id itemid
router.get('/:itemid', function(req, res) {
  console.log(req.params);
  res.send('Show route');
});

/* ----------------- CREATE ROUTE ----------------- */

// Create item and add to db
router.post('/', function(req, res) {
  res.send('Create route');
});

/* ----------------- EDIT ROUTE ----------------- */

// NOT WORKING
// NOT REQUIRED
// Display form to edit item
router.get(':itemid/edit', function(req, res) {
  console.log(req.params);
  res.send('edit route');
});

/* ----------------- UPDATE ROUTE ----------------- */

// NOT REQUIRED
// Update item
router.put('/:itemid', function(req, res) {
  console.log(req.params);
  res.send('update route');
});

/* ----------------- DESTROY ROUTE ----------------- */

// DELETE ITEM
router.delete('/:itemid', function(req, res) {
  console.log(req.params);
  res.send('delete route');
});

/* ----------------- EXPORT  ----------------- */

module.exports = router;

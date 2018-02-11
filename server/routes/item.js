// ===============================================
// SETUP
// ===============================================

var express = require('express'),
  Item = require('../models/item'),
  passport = require('../config/passport/');
router = express.Router();

// ===============================================
// Index: Display All Items
// ===============================================

router.get('/', function(req, res) {
  Item.find({})
    .populate('itemowner')
    .then(foundItems => {
      res.status(200).send(foundItems);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// ===============================================
// Create: Add Item
// ===============================================

router.post('/', (req, res) => {
  const item = new Item(req.body);
  item
    .save()
    .then(newItem => {
      res.send(newItem); // REPLACE THIS
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// ===============================================
// Update: Update Item
// ===============================================

// This doesn't need to be this long. However, did 3 checks:
// 1. User doesn't own item he/she trying to borrow
// 2. Item is available for borrowing (and they didn't borrow it themselves)
// The checks made method long
router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const borrowerId = req.user._id.toString();
    const itemBeingBorrowed = req.params.id;
    Item.findById({ _id: itemBeingBorrowed })
      .then(foundItem => {
        checkThatUserCanBorrowItem(foundItem, borrowerId, res);
        let userCanBorrowItem = checkThatUserCanBorrowItem(
          foundItem,
          borrowerId,
          res
        );
        if (userCanBorrowItem.canBorrow) {
          foundItem.borrower = borrowerId;
          foundItem
            .save()
            .then(updatedItem => {
              console.log(updatedItem);
              res.status(200).send(updatedItem);
            })
            .catch(err =>
              res.status(400).send({ message: 'something went wrong' })
            );
        } else {
          res.status(400).send({ message: userCanBorrowItem.message });
        }
      })
      .catch(err => {
        res.send(err);
      });
  }
);

// ===============================================
// Helper Methods
// ===============================================

const checkThatUserCanBorrowItem = (foundItem, borrowerId, res) => {
  if (foundItem.itemowner.toString() === borrowerId) {
    return { canBorrow: false, message: "You can't borrow your own item" };
  } else if (foundItem.borrower !== null) {
    if (foundItem.borrower.toString() === borrowerId) {
      return { canBorrow: false, message: 'You already borrowed this item!' };
    } else {
      return {
        canBorrow: false,
        message: 'This item is currently being borrowed by someone else'
      };
    }
  }
  return { canBorrow: true };
};

// ===============================================
// Export
// ===============================================

module.exports = router;

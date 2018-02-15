// ===============================================
// SETUP
// ===============================================

var express = require('express'),
  Item = require('../models/item'),
  User = require('../models/user'),
  passport = require('../config/passport/'),
  aws = require('aws-sdk'),
  multer = require('multer'),
  multerS3 = require('multer-s3'),
  router = express.Router();

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: 'ca-central-1'
});

var s3 = new aws.S3();

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    key: function(req, file, cb) {
      var fileExtension = file.originalname.split('.')[1];
      var path =
        'uploads/' +
        file.originalname.split('.')[0] +
        Date.now() +
        '.' +
        fileExtension;
      cb(null, path);
    }
  })
});

const S3_UPLOAD_PATH = 'https://s3.ca-central-1.amazonaws.com/aseelboomtown/';

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

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  upload.array('image', 1),
  (req, res) => {
    const item = new Item();
    item.title = req.body.title;
    item.description = req.body.description;
    item.tags = req.body.tags.split(',');
    item.imageurl = S3_UPLOAD_PATH + req.files[0].key;
    item.created = new Date();
    item.itemowner = req.user._id;
    item.borrower = null;
    item
      .save()
      .then(newItem => {
        User.findByIdAndUpdate(
          req.user._id,
          { $push: { itemsowned: newItem._id } },
          { new: true }
        ).then(updatedUser => {});
        return newItem;
      })
      .then(newItem => {
        res.status(200).send(newItem);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }
);

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
              res.status(200).send(updatedItem);
            })
            .catch(err => {
              res.status(400).send({ message: 'something went wrong' });
            });
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

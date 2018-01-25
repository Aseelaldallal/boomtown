var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageurl: {
    type: String,
    required: true
  },
  tags: [
    {
      type: String,
      required: true
    }
  ],
  itemowner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  available: {
    type: Boolean,
    default: true
  },
  borrower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: null
  }
});

module.exports = mongoose.model('item', ItemSchema);

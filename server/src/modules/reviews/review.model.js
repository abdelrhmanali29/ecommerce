const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  description: {
    type: String,
    required: [true, 'Review can not be empty.'],
    trim: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
});

//plugins
reviewSchema.plugin(uniqueValidator);

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;

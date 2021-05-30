const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
    },
    description: {
      type: String,
    },
    offer: {
      type: Number,
    },
    rating: {
      type: Number,
    },
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Review',
      },
    ],
    // resources: [
    //   {
    //     name: { type: String },
    //     url: { type: String },
    //   },
    // ],
    // category: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Category',
    //   required: true,
    // },
    // shop: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Shop',
    //   required: true,
    // },
    updatedAt: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

//plugins
productSchema.plugin(uniqueValidator);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;

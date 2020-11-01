const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    productName: { type: String, required: true, trim: true, maxlength: 60 },
    productDescription: { type: String, trim: true },
    productPrice: { type: Number, required: true },
    productCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    productQty: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

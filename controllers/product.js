const Product = require('../Model/product');

exports.create = async (req, res) => {
  console.log('req.body', req.body);
  console.log('req.file', req.file);
  const { filename } = req.file;
  const {
    productName,
    productDescription,
    productPrice,
    productCategory,
    productQty,
  } = req.body;

  try {
    let product = new Product();
    product.fileName = filename;
    product.productName = productName;
    product.productDescription = productDescription;
    product.productPrice = productPrice;
    product.productCategory = productCategory;
    product.productQty = productQty;
    await product.save();
    res.status(200).json({
      successMessage: `${productName} was created`,
      product,
    });
  } catch (err) {
    console.log('Product Database connection error');
    res.status(500).json({
      errorMessage: 'Please try again later',
    });
  }
};

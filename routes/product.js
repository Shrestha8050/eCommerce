const express = require('express');
const { authenticateJWT } = require('../middleWare/authenticator');
const upload = require('../middleWare/multer');
const productController = require('../controllers/product');
const router = express.Router();

router.post(
  '/',
  authenticateJWT,
  upload.single('productImage'),
  productController.create
);

module.exports = router;

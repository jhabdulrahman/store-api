const express = require('express');
const router = express.Router();
const { getAllProducts, getAllProductsStatic, deleteProduct, updateProduct } = require('../controllers/products.controller');

router.route('/').get(getAllProducts);
router.route('/static').get(getAllProductsStatic);
router.route('/:id').patch(updateProduct).delete(deleteProduct);
module.exports = router;
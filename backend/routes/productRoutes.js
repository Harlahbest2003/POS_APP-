const express = require('express');
const router = express.Router();
const { createProduct, updateProduct, deleteProduct, getProducts, getProduct } = require('../controllers/productController');
const upload = require('../config/multer');

router.get('/', getProducts);
router.post('/', upload.single('image'), createProduct);
router.get('/:id', getProduct);
router.put('/:id', upload.single('image'), updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;

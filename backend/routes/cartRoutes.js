const express = require('express');
const router = express.Router();
const { addToCart, viewCart, removeFromCart } = require('../controllers/cartController');
const authenticate = require('../middleware/authenticate');

router.post('/', authenticate, addToCart);
router.get('/', authenticate, viewCart);
router.delete('/:productId', authenticate, removeFromCart);

module.exports = router;

const express = require('express');
const { getCart, addToCart, updateCart, removeFromCart } = require('../controllers/cart');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

router.get('/', authenticate, getCart);
router.post('/', authenticate, addToCart);
router.put('/:id', authenticate, updateCart);
router.delete('/:id', authenticate, removeFromCart);

module.exports = router;
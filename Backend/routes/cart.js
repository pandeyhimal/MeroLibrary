const express = require('express');
const auth = require('../middleware/auth');
const { addToCart, getCart, removeFromCart, updateCartItem } = require('../controllers/cartController');

const router = express.Router();

router.post('/add', auth, addToCart);
router.get('/', auth, getCart);
router.delete('/:itemId', auth, removeFromCart);
router.put('/:itemId', auth, updateCartItem);

module.exports = router; 
const Cart = require('../models/Cart');

exports.addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { bookId, quantity = 1, rentalPeriod = 7, isRental = true } = req.body;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    const existingItem = cart.items.find(item => item.bookId.toString() === bookId);
    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.rentalPeriod = rentalPeriod;
      existingItem.isRental = isRental;
    } else {
      cart.items.push({ bookId, quantity, rentalPeriod, isRental });
    }
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId }).populate('items.bookId');
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found.' });
    cart.items = cart.items.filter(item => item._id.toString() !== req.params.itemId);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { quantity, rentalPeriod, isRental } = req.body;
    const cart = await Cart.findOne({ userId: req.userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found.' });
    const item = cart.items.id(req.params.itemId);
    if (!item) return res.status(404).json({ message: 'Item not found.' });
    if (quantity !== undefined) item.quantity = quantity;
    if (rentalPeriod !== undefined) item.rentalPeriod = rentalPeriod;
    if (isRental !== undefined) item.isRental = isRental;
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
}; 
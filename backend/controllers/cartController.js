// controllers/cartController.js
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Add item to cart
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  if (!productId || quantity <= 0) {
    return res.status(400).json({ message: 'Product ID and quantity are required.' });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const cart = await Cart.findOne({ userId });
    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity = quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
      await cart.save();
    } else {
      const newCart = new Cart({
        userId,
        items: [{ productId, quantity }]
      });
      await newCart.save();
    }
    res.status(200).json({ message: 'Item added to cart' });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ message: 'Error adding item to cart', error });
  }
};

// View cart
const viewCart = async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error viewing cart:', error);
    res.status(500).json({ message: 'Error viewing cart', error });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);
      await cart.save();
      res.status(200).json({ message: 'Item removed from cart' });
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ message: 'Error removing item from cart', error });
  }
};

module.exports = { addToCart, viewCart, removeFromCart };

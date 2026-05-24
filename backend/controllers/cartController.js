const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get user's cart
const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate('products.product');

  if (cart) {
    res.json(cart);
  } else {
    res.status(404).json({ message: 'Cart not found' });
  }
};

// Add to cart
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    cart = new Cart({
      user: req.user.id,
      products: [],
      totalPrice: 0,
    });
  }

  const existingProductIndex = cart.products.findIndex((item) => item.product.toString() === productId);
  if (existingProductIndex >= 0) {
    cart.products[existingProductIndex].quantity += quantity;
  } else {
    cart.products.push({ product: productId, quantity });
  }

  cart.totalPrice = cart.products.reduce((total, item) => total + item.quantity * product.price, 0);
  await cart.save();
  res.json(cart);
};

// Remove from cart
const removeFromCart = async (req, res) => {
  const productId = req.params.id;

  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  cart.products = cart.products.filter((item) => item.product.toString() !== productId);
  cart.totalPrice = cart.products.reduce((total, item) => total + item.quantity * item.product.price, 0);
  await cart.save();

  res.json(cart);
};

module.exports = { getCart, addToCart, removeFromCart };
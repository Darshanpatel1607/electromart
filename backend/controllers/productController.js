const Product = require('../models/Product');

// Get all products
const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

// Get product by ID
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

// Create a product
const createProduct = async (req, res) => {
  const { name, brand, category, price, stock, description, specifications, warranty } = req.body;

  const product = new Product({
    name,
    brand,
    category,
    price,
    stock,
    description,
    specifications,
    warranty,
    images: req.body.images || [],
    rating: req.body.rating || 0,
    discountPrice: req.body.discountPrice || 0,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

// Update a product
const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = req.body.name || product.name;
    product.brand = req.body.brand || product.brand;
    product.category = req.body.category || product.category;
    product.price = req.body.price || product.price;
    product.discountPrice = req.body.discountPrice || product.discountPrice;
    product.stock = req.body.stock || product.stock;
    product.description = req.body.description || product.description;
    product.specifications = req.body.specifications || product.specifications;
    product.warranty = req.body.warranty || product.warranty;
    product.images = req.body.images || product.images;
    product.rating = req.body.rating || product.rating;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
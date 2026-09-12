const Product = require('../models/Product');

async function getProducts(req, res) {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const result = await Product.find(filter);

    res.status(200).json({ count: result.length, products: result });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
}

async function getProductById(req, res) {
  try {
    const { id } = req.params;
    let product = null;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(id);
    }
    if (!product && !isNaN(Number(id))) {
      product = await Product.findOne({ sourceId: Number(id) });
    }
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    if (error.name === 'CastError') return res.status(404).json({ message: 'Product not found' });
    res.status(500).json({ message: 'Failed to fetch product', error: error.message });
  }
}

async function createProduct(req, res) {
  try {
    const { title, description, price, category } = req.body;

    // We still let the schema (required + min: 0) do the validating,
    // but Product.create() is where that validation actually runs.
    const newProduct = await Product.create({ title, description, price, category });
    res.status(201).json(newProduct);
  } catch (error) {
    if (error.name === 'ValidationError') return res.status(400).json({ message: error.message });
    res.status(500).json({ message: 'Failed to create product', error: error.message });
  }
}

async function replaceProduct(req, res) {
  try {
    const { title, description, price, category } = req.body;
    if (!title || !description || price === undefined || !category) {
      return res.status(400).json({ message: 'PUT requires title, description, price, and category' });
    }

    const updated = await Product.findOneAndReplace(
      { _id: req.params.id },
      { title, description, price, category },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(updated);
  } catch (error) {
    if (error.name === 'CastError') return res.status(404).json({ message: 'Product not found' });
    if (error.name === 'ValidationError') return res.status(400).json({ message: error.message });
    res.status(500).json({ message: 'Failed to replace product', error: error.message });
  }
}

async function updateProduct(req, res) {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(updated);
  } catch (error) {
    if (error.name === 'CastError') return res.status(404).json({ message: 'Product not found' });
    if (error.name === 'ValidationError') return res.status(400).json({ message: error.message });
    res.status(500).json({ message: 'Failed to update product', error: error.message });
  }
}

async function deleteProduct(req, res) {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.status(204).send();
  } catch (error) {
    if (error.name === 'CastError') return res.status(404).json({ message: 'Product not found' });
    res.status(500).json({ message: 'Failed to delete product', error: error.message });
  }
}

module.exports = { getProducts, getProductById, createProduct, replaceProduct, updateProduct, deleteProduct };

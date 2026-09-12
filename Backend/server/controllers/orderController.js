const mongoose = require('mongoose');
const Order = require('../models/Order');
const Product = require('../models/Product');

async function createOrder(req, res) {
  try {
    const { product: productId, shippingAddress } = req.body;

    if (!productId || !shippingAddress) {
      return res.status(400).json({ message: 'Product and shipping address are required' });
    }

    let foundProduct;
    if (mongoose.Types.ObjectId.isValid(productId)) {
      foundProduct = await Product.findById(productId);
    }
    if (!foundProduct && !isNaN(Number(productId))) {
      foundProduct = await Product.findOne({ sourceId: Number(productId) });
    }

    if (!foundProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const order = await Order.create({
      user: req.user?._id || null,
      product: foundProduct._id,
      shippingAddress
    });

    res.status(201).json({
      message: 'Order placed successfully',
      order
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to place order', error: error.message });
  }
}

async function getOrders(req, res) {
  try {
    const filter = req.user ? { user: req.user._id } : {};
    const orders = await Order.find(filter).populate('product');
    res.status(200).json({ count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
}

module.exports = { createOrder, getOrders };

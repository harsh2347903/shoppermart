const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'testToken');
      req.user = await User.findById(decoded.userId);
    } catch {
      // ignore token parse error for optional auth
    }
  }
  next();
}

router.route('/')
  .post(optionalAuth, orderController.createOrder)
  .get(optionalAuth, orderController.getOrders);

module.exports = router;

const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const requestLogger = require('./middleware/requestLogger');
const notFound = require('./middleware/notFound');

const app = express();

// Built-in middleware reads JSON request bodies and places the result in req.body.
app.use(express.json());
app.use(cors());

// Custom middleware runs for every request and logs useful request information.
app.use(requestLogger);

// Simple routes are useful for checking that the server is available.
app.get('/', (req, res) => res.json({ message: 'MERN Shop API is running' }));

app.get('/about', (req, res) => {
  res.json({ message: 'This API demonstrates beginner Express.js concepts.' });
});

// Router middleware keeps resource routes in their own files.
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

// This belongs last: it handles requests that did not match a route above.
app.use(notFound);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
});

module.exports = app;

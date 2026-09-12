function requestLogger(req, res, next) {
  console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`);

  // next() passes control to the next middleware or route handler.
  next();
}

module.exports = requestLogger;

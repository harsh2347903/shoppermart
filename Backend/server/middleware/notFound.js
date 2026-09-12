function notFound(req, res) {
  res.status(404).json({
    message: `Route ${req.method} ${req.originalUrl} was not found`
  });
}

module.exports = notFound;

function errorMiddleware(error, req, res, next) {
  const statusCode = error.statusCode || 500
  return res.status(statusCode).json({ message: error.message })
}

module.exports = errorMiddleware

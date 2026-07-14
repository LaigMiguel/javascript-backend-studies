const AppError = require('../errors/appError')

function errorMiddleware(error, req, res, next) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message })
  }
  console.error(error)
  return res.status(500).json({ message: 'Internal Server Error' })
}

module.exports = errorMiddleware

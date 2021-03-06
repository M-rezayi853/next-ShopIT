import ErrorHandler from '../utils/errorHandler'

const onError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500

  let error = { ...err }

  error.message = err.message || 'خطای سرور داخلی'

  // Wrong mongoose object id error
  if (err.name === 'CastError') {
    const message = `منبع پیدا نشد. نامعتبر: ${err.path}`
    error = new ErrorHandler(message, 400)
  }

  // Handling mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((value) => value.message)
    error = new ErrorHandler(message, 400)
  }

  // Handling mongoose duplicate key errors
  if (err.code && err.code == 11000) {
    const message = `تکراری ${Object.keys(err.keyValue)} وارد شد`
    error = new ErrorHandler(message, 400)
  }

  res.status(err.statusCode).json({
    success: false,
    error,
    message: error.message || 'خطای سرور داخلی',
    stack: error.stack,
  })
}

export default onError

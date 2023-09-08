const { NODE_ENV } = require('../util/config')

const ErrorHandler = (err, _req, res) => {
  const errStatus = err.status || 500
  const errMessage = err.message || 'Internal Server Error'
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: NODE_ENV === 'production' ? {} : err.stack
  })
}

module.exports = ErrorHandler

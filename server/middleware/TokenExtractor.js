const {SECRET} = require('../util/config')
const jwt = require('jsonwebtoken')

const TokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      try {
        req.token = jwt.verify(authorization.substring(7), SECRET)
      } catch {
        return res.status(401).json({error: 'token invalid'})
      }
  } else {
     return res.status(401).json({error: 'token missing'})
  }
  next()
}

module.exports = TokenExtractor
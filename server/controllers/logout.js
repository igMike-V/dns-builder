const router = require('express').Router()
//const SessionExtractor = require('../middleware/SessionExtractor')

router.post('/', async (req, res) => {
  const token = req.cookies['token']
  if (!token) {
    return res
      .status(401)
      .send({
        error: 'Unauthorized',
        message: 'No active session found on this device'
      })
  }
  res.clearCookie('token').status(200).send({ message: 'Logged out' })
})

module.exports = router

const { User } = require('../models')
const sessionService = require('../util/sessionService')
const router = require('express').Router()

const SessionExtractor = require('../middleware/SessionExtractor')

const bcrypt = require('bcrypt')

router.get('/', SessionExtractor, async (req, res) => {
  if(!req.userAuth || !req.userAuth.loggedIn) {
    return res.status(401).send({ error: 'Unauthorized', message: 'No active session found on this device' })
  }
  res.status(200).send({name: req.userAuth.user.name, email: req.userAuth.user.email})
})

router.post('/', async (req, res) => {
  const body = req.body
  try {
    const user = await User.findOne({ where: { email: body.email } })
    const passwordCorrect = await bcrypt.compare(body.password, user.password)

    if (!(user && passwordCorrect && !user.disabled)) {
      return res.status(401).json({
        error: 'invalid email or password'
      })
    }

    const session = await sessionService.createSession(user.id)

    res
      .cookie('token', session.sid, { 
        httpOnly: true,
        sameSite: 'none',
        secure: true
      }).status(200).json({ name: user.name, email: user.email })
  } catch (err) {
    return res.status(401).json({
      error: 'invalid email or password'
    })
  }
})

module.exports = router
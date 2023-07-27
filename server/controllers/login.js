const { User } = require('../models')
const router = require('express').Router()

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const { SECRET } = require('../util/config')

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

    const userForToken = {
      email: user.email,
      id: user.id
    }

    const token = jwt.sign(userForToken, SECRET)

    res.status(200).send({ token, email: user.email, name: user.name })
  } catch (err) {
    return res.status(401).json({
      error: 'invalid email or password'
    })
  }
})

module.exports = router
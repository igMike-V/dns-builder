const { User } = require("../models")
const router = require('express').Router()
const bcrypt = require('bcrypt')

router.get('/', async (_req, res) => {
  try {
    const users = await User.findAll()
    res.send(users)
  } catch (err) {
    console.log(err.message)
  }
})

router.post('/', async (req, res) => {
  try {  
    const { password } = req.body
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const user = await User.create({ ...req.body, password: hashedPassword })
    res.json(user)
  } catch (err) {
    console.log(err.message)
  }
})

router.put('/:id', async (req, res) => {
  if (req.body.password) {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
    req.body.password = hashedPassword
  }
  try {
    const { id } = req.params
    const user = await User.findByPk(id)
    await user.update(req.body)
    res.json(user)
  } catch (err) {
    console.log(err.message)
  } 
})

module.exports = router
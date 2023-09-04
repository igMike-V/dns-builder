const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const { PORT, FRONTEND_URL } = require('./util/config')
const { connectToDatabase } = require('./util/db')

//const ErrorHandler = require('./middleware/ErrorHandler')

/* Import routers object from controllers/index.js */
const Routers = require('./controllers/')
const { max } = require('./models/user')

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}))

app.use(express.json())
app.use(bodyParser.json())
app.use(cookieParser())

/* Routes */
Routers.forEach(({ endpoint, router }) => {
  console.log(`Registering endpoint: ${endpoint}`)
  app.use(endpoint, router)
})

/* Final middleware for errors */
//app.use(ErrorHandler)

const start = async () => {
  const maxRetries = 5
  const retryDelay = 5000
  await connectToDatabase(maxRetries, retryDelay) 
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    console.log(`http://localhost:${PORT}`)
    console.log(`FRONTEND: ${FRONTEND_URL}`)
  })
}

start()

const { User } = require("../models")
const router = require('express').Router()
const bcrypt = require('bcrypt')

const getNumberOfuser = async () => { 
  const user = await User.findAndCountAll()
  console.log(user.count)
  return user.count
}
const numUsers = getNumberOfuser()

const createDemoUser = async () => {
  console.log(`Creating Default user (demouser)`);
  await User.create({
    name: 'demouser',
    email: 'demo@demo.com',
    password: await bcrypt.hash('demopassword', 10)
  })
}

if (numUsers === 0) {
  createDemoUser()
}
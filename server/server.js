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

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true
  })
)

app.use(express.json())
app.use(bodyParser.json())
app.use(cookieParser())

/* Routes */
Routers.forEach(({ endpoint, router, middleware }) => {
  console.log(`Registering endpoint: ${endpoint}`)
  if (middleware) {
    app.use(endpoint, middleware, router)
  } else {
    app.use(endpoint, router)
  }
})

/* Final middleware for errors */
//app.use(ErrorHandler)

//dealing with first run and adding a demo user
const { User } = require('./models')
const bcrypt = require('bcrypt')

const getNumberOfuser = async () => {
  const user = await User.findAndCountAll()
  return user.count
}

const firstRun = async () => {
  const numUsers = await getNumberOfuser()
  console.log('number of users: ', numUsers)
  if (numUsers === 0) {
    console.log('Creating Demo User')
    createDemoUser()
  } else {
    console.log('Demo user exists')
  }
}

const createDemoUser = async () => {
  console.log(`Creating Default user (demouser)`)
  await User.create({
    name: 'demouser',
    email: 'demo@demo.com',
    password: await bcrypt.hash('demopassword', 10)
  })
}

// Get it started!
const start = async () => {
  const maxRetries = 5
  const retryDelay = 5000
  await connectToDatabase(maxRetries, retryDelay)
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    console.log(`http://localhost:${PORT}`)
    console.log(`FRONTEND: ${FRONTEND_URL}`)
  })
  firstRun()
}

start()

const express = require('express')
const app = express()

const bodyParser = require('body-parser')

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const ErrorHandler = require('./middleware/ErrorHandler')

/* Routers */
const {
  homeRouter,
  usersRouter,
  loginRouter
 } = require('./controllers/')

app.use(bodyParser.json())


/* Routes */
app.use('/', homeRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

/* Final middleware for errors */
//app.use(ErrorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    console.log(`http://localhost:${PORT}`)
  })
}

start()
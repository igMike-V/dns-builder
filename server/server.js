const express = require('express')
const app = express()

const bodyParser = require('body-parser')

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const ErrorHandler = require('./middleware/ErrorHandler')

/* Import routers object from controllers/index.js */
const Routers = require('./controllers/')

app.use(bodyParser.json())

/* Routes */
Routers.forEach(({ endpoint, router }) => {
  console.log(`Registering endpoint: ${endpoint}`)
  app.use(endpoint, router)
})

/* Final middleware for errors */
app.use(ErrorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    console.log(`http://localhost:${PORT}`)
  })
}

start()
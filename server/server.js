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

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
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
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    console.log(`http://localhost:${PORT}`)
    console.log(`FRONTEND: ${FRONTEND_URL}`)
  })
}

start()
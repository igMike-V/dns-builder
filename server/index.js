const express = require('express')
const app = express()

const bodyParser = require('body-parser')

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

app.use(bodyParser.json())
app.get('/', (_req, res) => {
  res.send('DNS Helper API is go!')
})

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    console.log(`http://localhost:${PORT}`)
  })
}

start()
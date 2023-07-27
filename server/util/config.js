require('dotenv').config()

module.exports = {
  DATABASE_URL: process.env.DATABASE_URL,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  PORT: process.env.PORT || 3000,
}
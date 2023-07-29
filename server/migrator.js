// migrator.js
const Sequelize = require('sequelize');
const { DATABASE_URL, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = require('./util/config')
const { Umzug, SequelizeStorage } = require('umzug')

const sequelize = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  {
    host: DATABASE_URL,
    port: DB_PORT,
    dialect: 'mariadb'
  }
)


const umzug = new Umzug({
  migrations: {
    glob: 'migrations/*.js',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
})

exports.umzug = umzug

if (require.main === module) {
  umzug.runAsCLI()
}
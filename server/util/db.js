const Sequelize = require('sequelize');
const { DATABASE_URL, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = require('./config')
const { Umzug, SequelizeStorage } = require('umzug')
console.log(DB_NAME)

const runMigrations = async () => {
  const migrator = new Umzug({
    migrations: {
      glob: 'migrations/*.js',
    },
    storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
    context: sequelize.getQueryInterface(),
    logger: console,
  })
  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  })
}

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

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    console.log('Connection to Database has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    return process.exit(1)
  }
  return null
}

module.exports = { connectToDatabase, sequelize }
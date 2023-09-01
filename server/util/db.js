const Sequelize = require('sequelize');
const { DATABASE_URL, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = require('./config')
const { Umzug, SequelizeStorage } = require('umzug')
console.log('DATABASE_URL', DATABASE_URL)
console.log('DB_USER', DB_USER)
console.log('DB_PASSWORD', DB_PASSWORD)
console.log('DB_NAME', DB_NAME) 
console.log('DB_PORT', DB_PORT)

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

const sequelize = new Sequelize(DATABASE_URL);



const connectToDatabase = async (maxRetries, retryDelay) => {
  let retries = 0
  while (retries < maxRetries) {
    try {
      await sequelize.authenticate()
      await runMigrations()
      console.log('Connection to Database has been established successfully.')
      return
    } catch (error) {
      console.error('Unable to connect to the database:', error)
      retries++
      console.log(`Retrying in ${retryDelay}ms`)
      await new Promise((resolve) => setTimeout(resolve, retryDelay))
    }
  }
  console.error(`Failed to establish database connection after ${maxRetries} retries.`);
  process.exit(1);
}

module.exports = { connectToDatabase, sequelize }
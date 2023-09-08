const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('sites', 'ip', {
      type: DataTypes.STRING,
      allowNull: false
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('sites', 'ip')
  }
}

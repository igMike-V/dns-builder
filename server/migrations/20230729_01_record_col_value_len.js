const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    return queryInterface.changeColumn('records', 'value', {
      type: DataTypes.STRING(500),
      allowNull: true
    })
  },
  down: async ({ context: queryInterface }) => {
    return queryInterface.changeColumn('records', 'value', {
      type: DataTypes.STRING,
      allowNull: true
    })
  }
}
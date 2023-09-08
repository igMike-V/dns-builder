const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    return queryInterface.changeColumn('records', 'description', {
      type: DataTypes.STRING(500),
      allowNull: true
    })
  },
  down: async ({ context: queryInterface }) => {
    return queryInterface.changeColumn('records', 'description', {
      type: DataTypes.STRING,
      allowNull: true
    })
  }
}

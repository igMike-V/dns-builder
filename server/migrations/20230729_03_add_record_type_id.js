const { DataTypes } = require ('sequelize')

module.exports = {
  up: async ({context: queryInterface}) => {
    await queryInterface.addColumn('records', 'record_type_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'record_types',
        key: 'id'
      }
    })
  }, 
  down: async ({ context: queryInterface }) => {
      await queryInterface.removeColumn('records', 'record_type_id')
  }
}
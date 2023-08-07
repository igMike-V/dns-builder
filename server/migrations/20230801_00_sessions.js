const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
   await queryInterface.createTable('sessions', {
    sid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: function (){
        return new Date(Date.now() + 60 * 60 * 1000)
      }
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    }
   })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('sessions')

  }
}
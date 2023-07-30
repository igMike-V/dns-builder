const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
   await queryInterface.createTable('site_records', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    site_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'sites', key: 'id' }
    },
    record_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'records', key: 'id' }
    },
   })

   await queryInterface.createTable('site_templates', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    site_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'sites', key: 'id' }
    },
    template_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'templates', key: 'id' }
    },
   })

   await queryInterface.createTable('template_records', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    record_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'records', key: 'id' }
    },
    template_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'templates', key: 'id' }
    },
   })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('site_records')
    await queryInterface.dropTable('site_templates')
    await queryInterface.dropTable('template_records')
  }
}
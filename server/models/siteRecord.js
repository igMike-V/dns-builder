const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class SiteRecord extends Model {}

SiteRecord.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  siteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'sites', key: 'id' }
  },
  recordId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'records', key: 'id' }
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'siteRecord'
})

module.exports = SiteRecord
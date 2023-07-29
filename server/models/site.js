const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class Site extends Model {}

Site.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  domain: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'site'
})

module.exports = Site
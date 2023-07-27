const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class Site extends Model {}

Site.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'site'
})

module.exports = Site
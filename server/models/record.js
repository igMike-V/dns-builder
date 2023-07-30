const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class Record extends Model {}

Record.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  lookupString: {
    type: DataTypes.STRING,
    allowNull: true
  },
  hostName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ttl: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  recordTypeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {model: 'recordTypes', key: 'id'}
  }
},{
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'record'
})
 
module.exports = Record
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class Session extends Model {};

Session.init({
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
      return new Date(Date.now() + 240 * 60 * 1000)
    }
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: 'users', key: 'id' }
  }
}, 
{
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'session'
});

module.exports = Session
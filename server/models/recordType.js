const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class RecordType extends Model {}

RecordType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'recordType'
  }
)

module.exports = RecordType

const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class TemplateRecord extends Model {}

TemplateRecord.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    templateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'templates', key: 'id' }
    },
    recordId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'records', key: 'id' }
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'templateRecord'
  }
)

module.exports = TemplateRecord

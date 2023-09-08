const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class Template extends Model {}

Template.init(
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
    timestamps: true,
    modelName: 'template'
  }
)

module.exports = Template

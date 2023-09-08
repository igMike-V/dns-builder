const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class SiteTemplate extends Model {}

SiteTemplate.init(
  {
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
    templateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'templates', key: 'id' }
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'siteTemplates'
  }
)

module.exports = SiteTemplate

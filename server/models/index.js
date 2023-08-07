const User = require("./user")
const Site = require("./site")
const Template = require("./template")
const Record = require("./record")
const RecordType = require("./recordType")
const SiteRecord = require("./siteRecord")
const SiteTemplate = require("./siteTemplate")
const TemplateRecord = require("./templateRecord")
const Session = require("./session")


Record.belongsTo(RecordType)

Record.belongsToMany(Site, { through: SiteRecord })
Site.belongsToMany(Record, { through: SiteRecord })

Template.belongsToMany(Site, { through: SiteTemplate })
Site.belongsToMany(Template, { through: SiteTemplate })

Record.belongsToMany(Template, { through: TemplateRecord })
Template.belongsToMany(Record, { through: TemplateRecord })

Session.belongsTo(User)

module.exports = { 
  User,
  Site,
  Template,
  Record,
  RecordType,
  SiteRecord,
  SiteTemplate,
  TemplateRecord,
  Session
} 
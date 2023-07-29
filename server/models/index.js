const User = require("./user")
const Site = require("./site")
const Template = require("./template")
const Record = require("./record")
const RecordType = require("./recordType")

Record.hasOne(RecordType)

module.exports = { 
  User,
  Site,
  Template,
  Record,
  RecordType
} 
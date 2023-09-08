const { DataTypes } = require('sequelize')

// populate record_types with DNS record types
module.exports = {
  up: async ({ context: queryInterface }) => {
    return queryInterface.bulkInsert('record_types', [
      {
        name: 'A'
      },
      {
        name: 'AAAA'
      },
      {
        name: 'CNAME'
      },
      {
        name: 'MX'
      },
      {
        name: 'TXT'
      },
      {
        name: 'SRV'
      }
    ])
  },
  down: async ({ context: queryInterface }) => {
    return queryInterface.bulkDelete('record_types', null, {})
  }
}

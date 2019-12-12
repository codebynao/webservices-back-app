'use strict'
module.exports = {
  up: function(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('client', 'is_deleted', {
        type: Sequelize.TINYINT(1),
        defaultValue: 0
      }),
      queryInterface.bulkUpdate('client', {
        is_deleted: 0
      })
    ])
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn('client', 'is_deleted')
  }
}

'use strict'
module.exports = {
  up: function(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('commande', 'is_deleted', {
        type: Sequelize.TINYINT(1),
        defaultValue: 0
      }),
      queryInterface.bulkUpdate('commande', {
        is_deleted: 0
      })
    ])
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn('commande', 'is_deleted')
  }
}

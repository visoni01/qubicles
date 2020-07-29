'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('x_qod_categories', [
      {
        category_name: 'Accounting'
      },
      {
        category_name: 'Client Services'
      },
      {
        category_name: 'Customer Service'
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('x_qod_categories')
  }
}

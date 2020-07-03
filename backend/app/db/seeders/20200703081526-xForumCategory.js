'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const date = new Date()
    await queryInterface.bulkInsert('x_forum_categories', [
      {
        category_title: 'Announcements',
        owner_id: 5,
        is_public: true,
        created_on: date
      },
      {
        category_title: 'Best Practices for Customer Service',
        owner_id: 5,
        is_public: true,
        created_on: date
      },
      {
        category_title: 'Public Category',
        owner_id: 5,
        is_public: true,
        created_on: date
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('x_forum_categories')
    // await queryInterface.bulkDelete('x_forum_categories', null, {})
  }
}

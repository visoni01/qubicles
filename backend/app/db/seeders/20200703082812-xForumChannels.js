'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const date = new Date()
    await queryInterface.bulkInsert('x_forum_channels', [
      {
        channel_title: 'General Announcements',
        owner_id: 5,
        client_id: 12,
        category_id: 1,
        is_public: true,
        is_company_ann: true,
        created_on: date
      },
      {
        channel_title: 'Hiring the Right People',
        owner_id: 5,
        client_id: 12,
        category_id: 2,
        is_public: true,
        is_company_ann: true,
        created_on: date
      },
      {
        channel_title: 'Managing Customer Expectations',
        owner_id: 5,
        client_id: 12,
        category_id: 2,
        is_public: true,
        is_company_ann: true,
        created_on: date
      },
      {
        channel_title: 'Perfecting First Impressions',
        owner_id: 5,
        client_id: 12,
        category_id: 2,
        is_public: true,
        is_company_ann: true,
        created_on: date
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('x_forum_channels')
    // await queryInterface.bulkDelete('x_forum_channels', null, {})
  }
}

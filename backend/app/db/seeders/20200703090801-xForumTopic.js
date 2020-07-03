'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const date = new Date()
    await queryInterface.bulkInsert('x_forum_topics', [
      {
        topic_title: 'New schedule during covid-19 pandemic',
        owner_id: 5,
        channel_id: 1,
        is_public: true,
        is_flagged: true,
        created_on: date
      },
      {
        topic_title: 'Welcome our new director of changing the world',
        owner_id: 5,
        channel_id: 1,
        is_public: true,
        is_flagged: true,
        created_on: date
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('x_forum_topics')
    // await queryInterface.bulkDelete('x_forum_topics', null, {})
  }
}

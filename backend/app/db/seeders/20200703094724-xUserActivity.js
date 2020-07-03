'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const date = new Date()
    await queryInterface.bulkInsert('x_user_activities', [
      {
        user_id: 5,
        record_type: 'client',
        record_id: 12,
        activity_type: 'rating',
        activity_value: '4',
        activity_custom: 'Very Good',
        activity_permission: 'public',
        created_on: date
      },
      {
        user_id: 6,
        record_type: 'client',
        record_id: 12,
        activity_type: 'rating',
        activity_value: '5',
        activity_custom: 'Super Awesome',
        activity_permission: 'public',
        created_on: date
      },
      {
        user_id: 7,
        record_type: 'client',
        record_id: 12,
        activity_type: 'like',
        activity_value: '1',
        activity_custom: '',
        activity_permission: 'public',
        created_on: date
      },
      {
        user_id: 5,
        record_type: 'client',
        record_id: 12,
        activity_type: 'subscribe',
        activity_value: '1',
        activity_custom: '',
        activity_permission: 'public',
        created_on: date
      },
      {
        user_id: 6,
        record_type: 'client',
        record_id: 12,
        activity_type: 'subscribe',
        activity_value: '1',
        activity_custom: '',
        activity_permission: 'public',
        created_on: date
      },
      {
        user_id: 7,
        record_type: 'client',
        record_id: 12,
        activity_type: 'subscribe',
        activity_value: '1',
        activity_custom: '',
        activity_permission: 'public',
        created_on: date
      },
      {
        user_id: 7,
        record_type: 'client',
        record_id: 12,
        activity_type: 'like',
        activity_value: '1',
        activity_custom: '',
        activity_permission: 'public',
        created_on: date
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('x_user_activities')
    // await queryInterface.bulkDelete('x_forum_topics', null, {})
  }
}

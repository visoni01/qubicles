'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('x_qod_applications', [
      {
        user_id: 1,
        client_id: 1,
        job_id: 1,
        cover_letter: '',
        video_pitch_url: '',
        status_reason: ''
      },
      {
        user_id: 2,
        client_id: 1,
        job_id: 2,
        cover_letter: '',
        video_pitch_url: '',
        status_reason: ''
      },
      {
        user_id: 1,
        client_id: 1,
        job_id: 2,
        cover_letter: '',
        video_pitch_url: '',
        status_reason: ''
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('x_qod_applications')
  }
}

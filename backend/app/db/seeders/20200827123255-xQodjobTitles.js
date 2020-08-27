'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('x_qod_job_titles', [
      {
        job_title_id: 1,
        job_title_name: 'Customer Service Representative'
      },
      {
        job_title_id: 2,
        job_title_name: 'Call Center Agent'
      },
      {
        job_title_id: 3,
        job_title_name: 'Call Center Manager'
      },
      {
        job_title_id: 4,
        job_title_name: 'Sales Account Advisors'
      },
      {
        job_title_id: 5,
        job_title_name: 'Retail Sales Consultant'
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('x_qod_job_titles')
  }
}

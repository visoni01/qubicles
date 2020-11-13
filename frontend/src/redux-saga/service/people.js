import apiClient from '../../utils/apiClient'

class People {
  static async fetchJobCategories({ searchKeyword, categoryId }) {
    const url = '/jobs'
    const queryParams = {}
    let response
    if (searchKeyword && searchKeyword.trim()) {
      queryParams.search_keyword = searchKeyword
    }

    if (categoryId) {
      queryParams.category_id = categoryId
    }

    if (queryParams.search_keyword || queryParams.category_id) {
      response = await apiClient.getRequest(url, null, queryParams)
    } else {
      response = await apiClient.getRequest(url)
    }
    return response
  }

  static async deleteJob({ jobId }) {
    const response = await apiClient.deleteRequest(`jobs/${ jobId }`)
    return response
  }

  static async addJob(payload) {
    const response = await apiClient.postRequest('/jobs', payload)
    return response
  }

  static async getJobCategoriesAndTitles(payload) {
    const response = await apiClient.getRequest('/jobs/job-fields')
    return response
  }

  static async updateJob({ jobId, ...payload }) {
    const response = await apiClient.putRequest(`/jobs/${ jobId }`, payload)
    return response
  }

  // New job section

  static async addNewJob(payload) {
    const response = await apiClient.postRequest('/jobs/add-new-job', payload)
    return response
  }

  static async getJobCategoriesTitlesAndSkills(payload) {
    const response = await apiClient.getRequest('/jobs/new/job-fields')
    return response
  }

  static async getJobById(jobId) {
    const response = await apiClient.getRequest(`/jobs/job/${ jobId }`)
    return response
  }
}

export default People

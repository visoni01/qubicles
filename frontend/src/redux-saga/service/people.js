import apiClient from '../../utils/apiClient'

class People {
  static async fetchJobCategories({ searchKeyword }) {
    const url = '/jobs'
    let response
    if (searchKeyword.trim()) {
      response = await apiClient.getRequest(url, null, { search_keyword: searchKeyword })
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

  static async getJobById(jobId) {
    const response = await apiClient.getRequest(`/jobs/job/${ jobId }`)
    return response
  }

  static async updateJob({ jobId, ...payload }) {
    const response = await apiClient.putRequest(`/jobs/${ jobId }`, payload)
    return response
  }
}

export default People

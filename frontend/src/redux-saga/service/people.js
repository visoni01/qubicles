import apiClient from '../../utils/apiClient'

class People {
  static async fetchJobCategories({ searchKeyword }) {
    const url = '/job/category'
    let response
    if (searchKeyword.trim()) {
      response = await apiClient.getRequest(url, null, { search_keyword: searchKeyword })
    } else {
      response = await apiClient.getRequest(url)
    }
    return response
  }

  static async deleteJob({ jobId }) {
    const response = await apiClient.deleteRequest(`/job/category/jobs/${ jobId }`)
    return response
  }

  static async deleteJob({ jobId }) {
    const response = await apiClient.deleteRequest(`/job/category/jobs/${ jobId }`)
    return response
  }
}

export default People

import apiClient from '../../utils/apiClient'

class People {
  static async fetchJobCategories() {
    const { data } = await apiClient.getRequest('/job/category')
    return data
  }

  static async deleteJob({ jobId }) {
    const response = await apiClient.deleteRequest(`/job/category/jobs/${ jobId }`)
    return response
  }
}

export default People

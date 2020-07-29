import apiClient from '../../utils/apiClient'

class People {
  static async fetchJobCategories() {
    const { data } = await apiClient.getRequest('/job/category')
    return data
  }
}

export default People

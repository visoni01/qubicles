import apiClient from '../../utils/apiClient'

class Forum {
  static async fetchCategories() {
    const { data } = await apiClient.getRequest('/forum')
    return data.result
  }
}

export default Forum

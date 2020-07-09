import apiClient from '../../utils/apiClient'

class Forum {
  static async fetchCategories() {
    const {data} = await apiClient.getRequest('/forum')
    return data.data
  }

  static async fetchChannel({ channelId }) {
    const { data } = await apiClient.getRequest(`/forum/channel/${ channelId }`)
    return data.data
  }
}

export default Forum

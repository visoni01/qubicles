import apiClient from '../../utils/apiClient'
import topicData from '../../components/CommunicationForums/topicData'

class Forum {
  static async fetchCategories() {
    const { data } = await apiClient.getRequest('/forum')
    return data.data
  }

  static async fetchChannel({ channelId }) {
    const { data } = await apiClient.getRequest(`/forum/channel/${ channelId }`)
    return data.data
  }

  static async fetchTopic({ topicId }) {
    return topicData
  }
}

export default Forum

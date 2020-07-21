import apiClient from '../../utils/apiClient'

class Forum {
  static async fetchCategories() {
    const { data } = await apiClient.getRequest('/forum')
    return data
  }

  static async fetchChannel({ channelId }) {
    const { data } = await apiClient.getRequest(`/forum/channel/${ channelId }`)
    return data
  }

  static async fetchTopic({ topicId }) {
    const { data } = await apiClient.getRequest(`/forum/topic/${ topicId }`)
    return data.data
  }

  static async postTopicActivity({ activityType, payload }) {
    const { data } = await apiClient.postRequest(`/forum/topic/activity/${ activityType }`, payload)
    return data.data
  }
}

export default Forum

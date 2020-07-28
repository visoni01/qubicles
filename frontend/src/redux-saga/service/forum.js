import apiClient from '../../utils/apiClient'

class Forum {
  static async fetchCategories() {
    const response = await apiClient.getRequest('/forum')
    return response
  }

  static async fetchChannel({ channelId }) {
    const response = await apiClient.getRequest(`/forum/channel/${ channelId }`)
    return response
  }

  static async fetchTopic({ topicId }) {
    const response = await apiClient.getRequest(`/forum/topic/${ topicId }`)
    return response
  }

  static async postTopicActivity({ activityType, payload }) {
    const response = await apiClient.postRequest(`/forum/topic/activity/${ activityType }`, payload)
    return response
  }
}

export default Forum

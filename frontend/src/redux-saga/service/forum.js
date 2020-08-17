import apiClient from '../../utils/apiClient'

class Forum {
  static async fetchCategories({ searchKeyword, limit, offset }) {
    const url = '/forum'
    let response
    if (searchKeyword) {
      response = await apiClient.getRequest(url, null, { search_keyword: searchKeyword, limit, offset })
    } else {
      response = await apiClient.getRequest(url, null, { limit, offset })
    }
    return response
  }

  static async fetchChannel({ channelId, searchKeyword }) {
    const url = `/forum/channel/${ channelId }`
    let response
    if (searchKeyword) {
      response = await apiClient.getRequest(url, null, { search_keyword: searchKeyword })
    } else {
      response = await apiClient.getRequest(url)
    }
    return response
  }

  static async fetchChannelTopicsList({ channelId, searchKeyword }) {
    const url = `/forum/channelTopicsList/${ channelId }`
    let response
    if (searchKeyword) {
      response = await apiClient.getRequest(url, null, { search_keyword: searchKeyword })
    } else {
      response = await apiClient.getRequest(url)
    }
    return response
  }

  static async fetchTopic({ topicId }) {
    const response = await apiClient.getRequest(`/forum/topic/${ topicId }`)
    return response
  }

  static async addTopicComment({ payload }) {
    const response = await apiClient.postRequest('/forum/topic/activity/reply', payload)
    return response
  }

  static async likeTopic({ payload }) {
    const response = await apiClient.postRequest('/forum/topic/activity/like', payload)
    return response
  }

  static async unlikeTopic({ payload }) {
    const response = await apiClient.postRequest('/forum/topic/activity/unlike', payload)
    return response
  }

  static async addNewCategory(payload) {
    const response = await apiClient.postRequest('/forum/categories', payload)
    return response
  }

  static async deleteCategory({ categoryId }) {
    const response = await apiClient.deleteRequest(`/forum/categories/${ categoryId }`)
    return response
  }

  static async addNewChannel(payload) {
    const response = await apiClient.postRequest('/forum/channel', payload)
    return response
  }

  static async deleteTopic({ topicId }) {
    const response = await apiClient.deleteRequest(`/forum/topics/${ topicId }`)
    return response
  }

  static async deleteTopicComment({ postId }) {
    const response = await apiClient.deleteRequest(`/forum/topics/posts/${ postId }`)
    return response
  }

  static async addNewTopic(payload) {
    const response = await apiClient.postRequest('/forum/topics', payload)
    return response
  }

  static async deleteChannel({ channelId }) {
    const response = await apiClient.deleteRequest(`/forum/channel/${ channelId }`)
  }

  static async likeTopicComment({ postId }) {
    const response = await apiClient.postRequest(`/forum/topics/posts/${ postId }/like`)
    return response
  }

  static async unlikeTopicComment({ postId }) {
    const response = await apiClient.postRequest(`/forum/topics/posts/${ postId }/unlike`)
    return response
  }

  static async updateTopic({
    topicId, ...payload
  }) {
    const response = await apiClient.putRequest(`/forum/topics/${ topicId }`, payload)
  }

  static async updateCategory(payload) {
    const response = await apiClient.putRequest(`/forum/categories/${ payload.categoryId }`, payload)
    return response
  }
}

export default Forum

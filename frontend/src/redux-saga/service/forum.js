import apiClient, { axiosInst } from '../../utils/apiClient'

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
    await apiClient.deleteRequest(`/forum/channel/${ channelId }`)
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
    await apiClient.putRequest(`/forum/topics/${ topicId }`, payload)
  }

  static async updateCategory(payload) {
    const response = await apiClient.putRequest(`/forum/categories/${ payload.categoryId }`, payload)
    return response
  }

  static async updateChannel(payload) {
    const response = await apiClient.putRequest(`/forum/channel/${ payload.channel_id }`, payload)
    return response
  }

  static async updateComment(data) {
    const { postId, postData } = data
    await apiClient.putRequest(`/forum/topics/posts/${ postId }`, { post_data: postData })
  }

  static async imageUpload({ data }) {
    const response = await axiosInst({
      method: 'post',
      url: '/forum/image',
      data,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response
  }

  static async getAllGroups() {
    const response = await apiClient.getRequest('/newForum/groups')
    return response
  }

  static async addGroup(data) {
    const response = await apiClient.postRequest('/newForum/groups', data)
    return response
  }

  static async getGroupTopics(groupId) {
    const response = await apiClient.getRequest(`/newForum/groups/${ groupId }/topics`)
    return response
  }

  static async addGroupTopic({ groupId, ...data }) {
    const response = await apiClient.postRequest(`/newForum/groups/${ groupId }/topics`, data)
    return response
  }

  static async getTopicComments(topicId) {
    const response = await apiClient.getRequest(`/newForum/topics/${ topicId }/comments`)
    return response
  }

  static async postTopicComment({ topicId, ...data }) {
    const response = await apiClient.postRequest(`/newForum/topics/${ topicId }/comments`, data)
    return response
  }
}

export default Forum

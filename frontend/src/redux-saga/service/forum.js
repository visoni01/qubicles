import apiClient, { axiosInst } from '../../utils/apiClient'

class Forum {
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
    const response = await apiClient.getRequest('/forum/groups')
    return response
  }

  static async addGroup(data) {
    const response = await apiClient.postRequest('/forum/groups', data)
    return response
  }

  static async getGroupTopics({ groupId, limit, offset }) {
    const response = await apiClient.getRequest(`/forum/groups/${ groupId }/topics`, null, { limit, offset })
    return response
  }

  static async addGroupTopic({ groupId, ...data }) {
    const response = await apiClient.postRequest(`/forum/groups/${ groupId }/topics`, data)
    return response
  }

  static async getTopicComments({ topicId, limit, offset }) {
    const response = await apiClient.getRequest(`/forum/topics/${ topicId }/comments`, null, { limit, offset })
    return response
  }

  static async topicActivity({ topicId, ...data }) {
    const response = await apiClient.postRequest(`/forum/topics/${ topicId }/activity`, data)
    return response
  }

  static async postTopicComment({ topicId, ...data }) {
    const response = await apiClient.postRequest(`/forum/topics/${ topicId }/comments`, data)
    return response
  }
}

export default Forum

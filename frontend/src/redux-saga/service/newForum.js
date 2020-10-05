import apiClient from '../../utils/apiClient'

class Forum {
  //  Group API's
  static async addNewGroup({ payload }) {
    const response = await apiClient.postRequest('/newForum/group/create', payload)
    return response
  }

  static async getAllGroups() {
    const response = await apiClient.getRequest('/newForum/groups')
    return response
  }

  static async getOneGroup({ groupId }) {
    const response = await apiClient.getRequest(`/newForum/group/${ groupId }`)
    return response
  }

  static async updateGroup({ payload, groupId }) {
    const response = await apiClient.putRequest(`/newForum/group/update/${ groupId }`, payload)
    return response
  }

  static async deleteGroup({ groupId }) {
    const response = await apiClient.getRequest(`/newForum/group/delete${ groupId }`)
    return response
  }
}

export default Forum

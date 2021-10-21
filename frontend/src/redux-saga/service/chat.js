import apiClient from '../../utils/apiClient'

const Chat = class {
  static getAllChats = async (payload) => {
    const response = await apiClient.getRequest('/chat', null, payload)
    return response
  }

  static createNewChat = async (payload) => {
    const response = await apiClient.postRequest('/chat/new-chat', payload)
    return response
  }

  static createNewGroup = async (payload) => {
    const response = await apiClient.postRequest('/chat/new-group', payload)
    return response
  }

  static getChatSuggestions = async (payload) => {
    const response = await apiClient.getRequest('/chat/suggested-users', null, payload)
    return response
  }

  static getChatMessages = async ({ conversationId, ...payload }) => {
    const response = await apiClient.getRequest(`/chat/${ conversationId }`, null, payload)
    return response
  }

  static addPeople = async ({ conversationId, ...payload }) => {
    const response = await apiClient.putRequest(`/chat/${ conversationId }/group`, payload)
    return response
  }

  static removePerson = async ({ conversationId, candidateId, updatedOn }) => {
    const response = await apiClient.deleteRequest(`/chat/${ conversationId }/candidate/${ candidateId }`,
      { updated_on: updatedOn })
    return response
  }

  static changeGroupName = async ({ conversationId, ...payload }) => {
    const response = await apiClient.putRequest(`/chat/${ conversationId }/group-name`, payload)
    return response
  }

  static getChatData = async ({ conversationId }) => {
    const response = await apiClient.getRequest(`/chat/${ conversationId }/chat-data`)
    return response
  }

  static markChatAsRead = async ({ conversationId }) => {
    const response = await apiClient.putRequest(`/chat/${ conversationId }/mark-as-read`)
    return response
  }

  static markChatAsUnread = async ({ conversationId }) => {
    const response = await apiClient.putRequest(`/chat/${ conversationId }/mark-as-unread`)
    return response
  }

  static deleteChat = async ({ conversationId }) => {
    const response = await apiClient.putRequest(`/chat/${ conversationId }/delete-chat`)
    return response
  }
}

export default Chat

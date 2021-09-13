/* eslint-disable no-unused-vars */
import {
  chats, members as suggestions, popupChats, userList,
} from '../../containers/Chat/testData'
import apiClient from '../../utils/apiClient'

// WIP - Call APIs
const Chat = class {
  static getAllChats = async (payload) => {
    const response = await apiClient.getRequest('/chat', null, payload)
    return response
  }

  static getChatData = async ({ conversationId }) => {
    const response = await apiClient.getRequest(`/chat/chat-data/${ conversationId }`)
    return response
  }

  static getChatMessages = async ({ conversationId, ...payload }) => {
    const response = await apiClient.getRequest(`/chat/${ conversationId }`, null, payload)
    return response
  }

  static createNewChat = async (payload) => {
    const response = await apiClient.postRequest('/chat', payload)
    return response
  }

  static createNewGroup = async (payload) => {
    const response = await apiClient.postRequest('/chat/new-group', payload)
    return response
  }

  static addPeople = async ({ conversationId, ...payload }) => {
    const response = await apiClient.putRequest(`/chat/group/${ conversationId }`, payload)
    return response
  }

  static removePerson = async ({ conversationId, candidateId }) => {
    const response = await apiClient.deleteRequest(`/chat/group/${ conversationId }/candidate/${ candidateId }`)
    return response
  }

  static changeGroupName = async ({ conversationId, ...payload }) => {
    const response = await apiClient.putRequest(`/chat/group/${ conversationId }/group-name`, payload)
    return response
  }

  static markChatAsUnread = async ({ conversationId }) => {
    const response = await apiClient.putRequest(`/chat/${ conversationId }/mark-as-unread`)
    return response
  }

  static markChatAsRead = async ({ conversationId }) => {
    const response = await apiClient.putRequest(`/chat/${ conversationId }/read`)
    return response
  }

  static getChatSuggestions = async (payload) => {
    const response = await apiClient.getRequest('/chat/suggested-users', null, payload)
    return response
  }
}

export default Chat

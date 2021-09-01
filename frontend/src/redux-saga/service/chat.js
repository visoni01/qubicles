/* eslint-disable no-unused-vars */
import {
  chats, members as suggestions, popupChats, userList,
} from '../../containers/Chat/testData'
import apiClient from '../../utils/apiClient'

// WIP - Call APIs
const Chat = class {
  static getAllChats = async ({ offset, searchKeyword }) => ({
    data: userList,
  })

  static getChatData = async ({ conversationId }) => ({
    data: chats[ conversationId - 1 ] || chats[ 0 ],
  })

  static getChatMessages = async ({ conversationId, offset }) => ({
    data: chats[ conversationId - 1 ].chats || chats[ 0 ].chats,
  })

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

  }

  static markChatAsUnread = async ({ conversationId }) => {

  }

  static markChatAsRead = async ({ conversationId }) => {

  }

  static createNewPopup = async ({ conversationId }) => popupChats[ conversationId - 1 ] || popupChats[ 0 ]

  // eslint-disable-next-line arrow-body-style
  static getChatSuggestions = async ({ offset, searchKeyword }) => {
    return { data: { users: suggestions, count: 10 } }
  }

  static changeGroupName = async ({ conversationId, newGroupName }) => {

  }
}

export default Chat

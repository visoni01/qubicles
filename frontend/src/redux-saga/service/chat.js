/* eslint-disable no-unused-vars */
import {
  chats, members as suggestions, popupChats, userList,
} from '../../containers/Chat/testData'
import apiClient from '../../utils/apiClient'

let nextConversationId = userList.length

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

  static createNewGroup = async ({ title, members }) => {
    nextConversationId += 1
    chats.push({
      conversationId: nextConversationId,
      isGroup: true,
      groupName: title,
      data: [],
      candidatesInfo: members,
    })
    return { data: { conversationId: nextConversationId } }
  }

  static addPeople = async ({ conversationId, members }) => {

  }

  static removePerson = async ({ conversationId, candidateId }) => {

  }

  static markChatAsUnread = async ({ conversationId }) => {

  }

  static markChatAsRead = async ({ conversationId }) => {

  }

  static createNewChat = async ({ candidateId }) => {
    const response = await apiClient.postRequest(
      '/chat',
      { candidate_id: candidateId },
    )

    return response
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

/* eslint-disable no-unused-vars */
import {
  chats, members as suggestions, popupChats, userList,
} from '../../containers/Chat/testData'

let nextConversationId = userList.length

// WIP - Call APIs
const Chat = class {
  static getAllChats = async () => ({
    data: userList,
  })

  static getChatById = async ({ conversationId }) => ({
    data: chats[ conversationId - 1 ] || chats[ 0 ],
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

  static createNewChat = async ({ candidate }) => {
    nextConversationId += 1
    chats.push({
      conversationId: nextConversationId,
      isGroup: false,
      data: [],
      candidatesInfo: [ candidate ],
    })
    return { data: { conversationId: nextConversationId } }
  }

  static createNewPopup = async ({ conversationId }) => popupChats[ conversationId - 1 ] || popupChats[ 0 ]

  // eslint-disable-next-line arrow-body-style
  static getChatSuggestions = async ({ offset, searchKeyword }) => {
    return { data: { users: suggestions, count: 10 } }
  }
}

export default Chat

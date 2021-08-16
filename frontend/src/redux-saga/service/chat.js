import { chats, popupChats, userList } from '../../containers/Chat/testData'

let nextConversationId = userList.length

// WIP - Call APIs
const Chat = class {
  static getAllChats = async () => ({
    data: userList,
  })

  static getChatById = async ({ conversationId }) => ({
    data: chats[ conversationId - 1 ] || chats[ 0 ],
  })

  // eslint-disable-next-line no-unused-vars
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

  // eslint-disable-next-line no-unused-vars
  static addPeople = async ({ conversationId, members }) => {

  }

  // eslint-disable-next-line no-unused-vars
  static removePerson = async ({ conversationId, candidateId }) => {

  }

  // eslint-disable-next-line no-unused-vars
  static markChatAsUnread = async ({ conversationId }) => {

  }

  // eslint-disable-next-line no-unused-vars
  static markChatAsRead = async ({ conversationId }) => {

  }

  // eslint-disable-next-line no-unused-vars
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
}

export default Chat

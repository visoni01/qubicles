import { chats, userList } from '../../containers/Chat/testData'

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
}

export default Chat

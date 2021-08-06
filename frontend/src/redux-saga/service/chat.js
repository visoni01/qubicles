import { chats, userList } from '../../containers/Chat/testData'

// WIP - Call APIs
const Chat = class {
  static getAllChats = async () => ({
    data: userList,
  })

  static getChatById = async ({ conversationId }) => ({
    data: chats[ conversationId - 1 ],
  })
}

export default Chat

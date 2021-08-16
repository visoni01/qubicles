import allChatsReducer from './allChats'
import currentChatReducer from './currentChat'
import chatPopupsReducer from './chatPopups'

const chatReducers = {
  allChats: allChatsReducer,
  currentChat: currentChatReducer,
  chatPopups: chatPopupsReducer,
}

export default chatReducers
export * from './allChats'
export * from './currentChat'
export * from './chatPopups'

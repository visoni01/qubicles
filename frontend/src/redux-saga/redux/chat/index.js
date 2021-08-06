import allChatsReducer from './allChats'
import currentChatReducer from './currentChat'

const chatReducers = {
  allChats: allChatsReducer,
  currentChat: currentChatReducer,
}

export default chatReducers
export * from './allChats'
export * from './currentChat'

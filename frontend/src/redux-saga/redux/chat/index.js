import allChatsReducer from './allChats'
import currentChatReducer from './currentChat'
import chatPopupsReducer from './chatPopups'
import chatSuggestionsReducer from './chatSuggestions'

const chatReducers = {
  allChats: allChatsReducer,
  currentChat: currentChatReducer,
  chatPopups: chatPopupsReducer,
  chatSuggestions: chatSuggestionsReducer,
}

export default chatReducers
export * from './allChats'
export * from './currentChat'
export * from './chatPopups'
export * from './chatSuggestions'

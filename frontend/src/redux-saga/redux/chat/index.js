import allChatsReducer from './allChats'
import chatDataReducer from './chatData'
import chatSuggestionsReducer from './chatSuggestions'

const chatReducers = {
  allChats: allChatsReducer,
  chatData: chatDataReducer,
  chatSuggestions: chatSuggestionsReducer,
}

export default chatReducers
export * from './allChats'
export * from './chatData'
export * from './chatSuggestions'

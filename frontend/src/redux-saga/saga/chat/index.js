import allChats from './allChats'
import chatData from './chatData'
import chatSuggestions from './chatSuggestions'

const chatWatcherFunctions = [
  () => allChats(),
  () => chatData(),
  () => chatSuggestions(),
]

export default chatWatcherFunctions

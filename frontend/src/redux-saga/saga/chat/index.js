import allChats from './allChats'
import currentChat from './currentChat'
import chatPopups from './chatPopups'
import chatSuggestions from './chatSuggestions'

const chatWatcherFunctions = [
  () => allChats(),
  () => currentChat(),
  () => chatPopups(),
  () => chatSuggestions(),
]

export default chatWatcherFunctions

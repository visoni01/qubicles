import allChats from './allChats'
import currentChat from './currentChat'

const chatWatcherFunctions = [
  () => allChats(),
  () => currentChat(),
]

export default chatWatcherFunctions

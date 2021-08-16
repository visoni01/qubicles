import allChats from './allChats'
import currentChat from './currentChat'
import chatPopups from './chatPopups'

const chatWatcherFunctions = [
  () => allChats(),
  () => currentChat(),
  () => chatPopups(),
]

export default chatWatcherFunctions

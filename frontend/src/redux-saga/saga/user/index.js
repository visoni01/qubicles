import signup from './signup'
import postSignup from './postSignup'
import login from './login'
import handleInvite from './invitePage'
import userData from './userData'
import notifications from './notifications'
import searchUsers from './searchUsers'

const userWatcherFunctions = [
  () => signup(),
  () => postSignup(),
  () => login(),
  () => handleInvite(),
  () => userData(),
  () => notifications(),
  () => searchUsers(),
]

export default userWatcherFunctions

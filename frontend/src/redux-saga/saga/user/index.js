import signup from './signup'
import postSignup from './postSignup'
import login from './login'
import handleInvite from './invitePage'
import userData from './userData'
import notifications from './notifications'

const userWatcherFunctions = [
  () => signup(),
  () => postSignup(),
  () => login(),
  () => handleInvite(),
  () => userData(),
  () => notifications(),
]

export default userWatcherFunctions

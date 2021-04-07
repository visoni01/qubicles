import signup from './signup'
import postSignup from './postSignup'
import login from './login'
import handleInvite from './invitePage'
import userData from './userData'

const userWatcherFunctions = [
  () => signup(),
  () => postSignup(),
  () => login(),
  () => handleInvite(),
  () => userData(),
]

export default userWatcherFunctions

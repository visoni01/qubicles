import signup from './signup'
import postSignup from './postSignup'
import login from './login'
import handleInvite from './invitePage'

const userWatcherFunctions = [
  () => signup(),
  () => postSignup(),
  () => login(),
  () => handleInvite(),
]

export default userWatcherFunctions

import emailVerification from './emailVerification'
import checkrInvitation from './checkrAuthentication'
import sendVerificationMail from './sendVerificationMail'
import signupWithInvite from './inviteDetails'
import forgetPassword from './forgetPassword'
import resetPassword from './resetPassword'

const authWatcherFunctions = [
  () => emailVerification(),
  () => checkrInvitation(),
  () => sendVerificationMail(),
  () => signupWithInvite(),
  () => forgetPassword(),
  () => resetPassword(),
]

export default authWatcherFunctions

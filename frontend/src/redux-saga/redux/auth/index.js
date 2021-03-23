import emailVerificationReducer from './emailVerification'
import sendVerificationMail from './sendVerificationMail'
import signupWithInviteReducer from './inviteDetails'
import forgetPasswordMailReducer from './forgetPasswordMail'
import resetPasswordReducer from './resetPassword'
import checkrAuthentication from './checkrAuthentication'

const authReducers = {
  emailVerification: emailVerificationReducer,
  verification: sendVerificationMail,
  signupWithInvite: signupWithInviteReducer,
  forgetPasswordMail: forgetPasswordMailReducer,
  resetPassword: resetPasswordReducer,
  checkr: checkrAuthentication,
}

export default authReducers
export * from './emailVerification'
export * from './sendVerificationMail'
export * from './inviteDetails'
export * from './forgetPasswordMail'
export * from './resetPassword'
export * from './checkrAuthentication'

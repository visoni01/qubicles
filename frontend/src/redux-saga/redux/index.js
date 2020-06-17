import { combineReducers } from '@reduxjs/toolkit'
import signupReducer from './signup'
import emailVerificationReducer from './emailVerification'
import postSignUpReducer from './postSignup'
import invitePageReducer from './invitePage'
import loginReducer from './login'

const rootReducer = combineReducers( {
  signup: signupReducer,
  emailVerification: emailVerificationReducer,
  postSignUp: postSignUpReducer,
  invitePage: invitePageReducer,
  login: loginReducer,
} )

export default rootReducer

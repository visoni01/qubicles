import { combineReducers } from '@reduxjs/toolkit'
import signupReducer from './signup'
import emailVerificationReducer from './emailVerification'
import postSignUpReducer from './postSignup'
import invitePageReducer from './invitePage'

const rootReducer = combineReducers( {
  signup: signupReducer,
  emailVerification: emailVerificationReducer,
  postSignUp: postSignUpReducer,
  invitePage: invitePageReducer,
} )

export default rootReducer

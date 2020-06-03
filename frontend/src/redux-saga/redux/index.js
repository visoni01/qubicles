import { combineReducers } from '@reduxjs/toolkit'
import signupReducer from './signup'
import emailVerificationReducer from './emailVerification'
import postSignUpReducer from './postSignup'

const rootReducer = combineReducers( {
  signup: signupReducer,
  emailVerification: emailVerificationReducer,
  postSignUp: postSignUpReducer,
} )

export default rootReducer

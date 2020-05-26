import { combineReducers } from '@reduxjs/toolkit'
import signupReducer from './signup'
import emailVerificationReducer from './emailVerification'

const rootReducer = combineReducers( {
  signup: signupReducer,
  emailVerification: emailVerificationReducer,
} )

export default rootReducer

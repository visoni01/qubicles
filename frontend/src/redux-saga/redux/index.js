import { combineReducers } from '@reduxjs/toolkit'
import signupReducer from './signup'

const rootReducer = combineReducers( {
  signup: signupReducer,
} )

export default rootReducer

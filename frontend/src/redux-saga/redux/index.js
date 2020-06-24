import { combineReducers } from '@reduxjs/toolkit'
import signupReducer from './signup'
import emailVerificationReducer from './emailVerification'
import postSignUpReducer from './postSignup'
import invitePageReducer from './invitePage'
import loginReducer from './login'
import announcementReducer from './dashboard/announcement'
import dashboardReducer from './dashboard'

const rootReducer = combineReducers( {
  signup: signupReducer,
  emailVerification: emailVerificationReducer,
  postSignUp: postSignUpReducer,
  invitePage: invitePageReducer,
  login: loginReducer,
  dashboad: dashboardReducer,
  announcement: announcementReducer,
} )

export default rootReducer

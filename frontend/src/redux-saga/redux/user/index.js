import loginReducer from './login'
import signupReducer from './signup'
import postSignUpReducer from './postSignup'
import invitePageReducer from './invitePage'
import userDataReducer from './userData'
import notificationsReducer from './notifications'
import searchUsersReducer from './searchUsers'

const userReducers = {
  login: loginReducer,
  signup: signupReducer,
  postSignUp: postSignUpReducer,
  invitePage: invitePageReducer,
  userData: userDataReducer,
  notifications: notificationsReducer,
  searchUsers: searchUsersReducer,
}

export default userReducers
export * from './login'
export * from './signup'
export * from './postSignup'
export * from './invitePage'
export * from './userData'
export * from './notifications'
export * from './searchUsers'

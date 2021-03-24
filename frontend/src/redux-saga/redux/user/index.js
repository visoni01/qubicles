import loginReducer from './login'
import signupReducer from './signup'
import postSignUpReducer from './postSignup'
import invitePageReducer from './invitePage'

const userReducers = {
  login: loginReducer,
  signup: signupReducer,
  postSignUp: postSignUpReducer,
  invitePage: invitePageReducer,
}

export default userReducers
export * from './login'
export * from './signup'
export * from './postSignup'
export * from './invitePage'

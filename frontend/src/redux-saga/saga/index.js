import { all } from 'redux-saga/effects'

import signup from './signup'
import emailVerification from './emailVerification'
import postSignup from './postSignup'
import inviteRequest from './invitepage'
import login from './login'
import dashboard from './dashboard'
import announcement from './dashboard/announcement'

export default function* rootSaga() {
  yield all( [
    signup(),
    emailVerification(),
    postSignup(),
    inviteRequest(),
    login(),
    dashboard(),
    announcement(),
  ] )
}

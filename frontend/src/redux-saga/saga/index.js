import { all } from 'redux-saga/effects'

import signup from './signup'
import emailVerification from './emailVerification'
import postSignup from './postSignup'
import inviteRequest from './invitepage'

export default function* rootSaga() {
  yield all( [ signup(), emailVerification(), postSignup(), inviteRequest() ] )
}

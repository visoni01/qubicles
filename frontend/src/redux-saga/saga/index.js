import { all } from 'redux-saga/effects'

import signup from './signup'
import emailVerification from './emailVerification'

export default function* rootSaga() {
  yield all( [ signup(), emailVerification() ] )
}

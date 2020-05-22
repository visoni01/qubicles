import { takeEvery, put } from 'redux-saga/effects'
import apiClient from '../../utils/requests'
import { emailVerificationStart, emailVerificationFailure, emailVerificationSuccessful } from '../redux/emailVerification'

function* emailVerificationWatcher() {
  yield takeEvery( emailVerificationStart.type, emailVerificationWorker )
}

function* emailVerificationWorker(action) {
  try {
    console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCcccc", action)
    const data = yield apiClient.emailVerification(action.payload)
    yield put(emailVerificationSuccessful())
  } catch(e) {
    console.log("===", e)
    yield put(emailVerificationFailure())
  }
}

export default emailVerificationWatcher

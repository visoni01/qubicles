import { takeEvery, put } from 'redux-saga/effects'
import apiClient from '../../utils/apiClient'
import {
  emailVerificationStart,
  emailVerificationFailure,
  emailVerificationSuccessful,
} from '../redux/emailVerification'

function* emailVerificationWatcher() {
  yield takeEvery(emailVerificationStart.type, emailVerificationWorker)
}

function* emailVerificationWorker(action) {
  try {
    yield apiClient.emailVerification(action.payload)
    yield put(emailVerificationSuccessful())
  } catch (e) {
    yield put(emailVerificationFailure())
  }
}

export default emailVerificationWatcher

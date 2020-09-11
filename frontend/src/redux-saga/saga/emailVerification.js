import { takeEvery, put } from 'redux-saga/effects'
import apiClient from '../../utils/apiClient'
import {
  emailVerificationStart,
  emailVerificationFailure,
  emailVerificationSuccessful,
} from '../redux/emailVerification'
import { startLoader, stopLoader } from '../redux/loader'
import { showErrorMessage } from '../redux/snackbar'

function* emailVerificationWatcher() {
  yield takeEvery(emailVerificationStart.type, emailVerificationWorker)
}

function* emailVerificationWorker(action) {
  try {
    yield put(startLoader())
    yield apiClient.emailVerification(action.payload)
    yield put(emailVerificationSuccessful())
    yield put(stopLoader())
  } catch (e) {
    yield put(showErrorMessage({ msg: e.errMsg }))
    yield put(emailVerificationFailure())
    yield put(stopLoader())
  }
}

export default emailVerificationWatcher

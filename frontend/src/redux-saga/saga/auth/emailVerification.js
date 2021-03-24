import { takeEvery, put } from 'redux-saga/effects'
import apiClient from '../../../utils/apiClient'
import {
  emailVerificationStart,
  emailVerificationFailure,
  emailVerificationSuccessful,
} from '../../redux/actions'
import { startLoader, stopLoader } from '../../redux/utils/loader'
import { showErrorMessage } from '../../redux/utils/snackbar'

function* emailVerificationWatcher() {
  yield takeEvery(emailVerificationStart.type, emailVerificationWorker)
}

function* emailVerificationWorker(action) {
  try {
    yield put(startLoader())
    const response = yield apiClient.emailVerification(action.payload)
    yield put(emailVerificationSuccessful(response.data))
    yield put(stopLoader())
  } catch (e) {
    yield put(showErrorMessage({ msg: e.errMsg }))
    yield put(emailVerificationFailure())
    yield put(stopLoader())
  }
}

export default emailVerificationWatcher

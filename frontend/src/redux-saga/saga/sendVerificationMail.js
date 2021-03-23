import { takeEvery, put } from 'redux-saga/effects'
import {
  sendVerificationMailStart,
  sendVerificationMailFailure,
  sendVerificationMailSuccessful,
} from '../redux/actions'
import { showErrorMessage } from '../redux/utils/snackbar'
import User from '../service/user'

function* sendVerificationMailWatcher() {
  yield takeEvery(sendVerificationMailStart.type, sendVerificationMailWorker)
}

function* sendVerificationMailWorker(action) {
  try {
    const { email } = action.payload
    yield User.sendVerificationMail(email)
    yield put(sendVerificationMailSuccessful())
  } catch (e) {
    yield put(showErrorMessage({ msg: e.errMsg }))
    yield put(sendVerificationMailFailure())
  }
}

export default sendVerificationMailWatcher

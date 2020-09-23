import { takeEvery, put } from 'redux-saga/effects'
import {
  resetPasswordStart,
  resetPasswordSuccessful,
  resetPasswordFailure,
} from '../redux/actions'
import { showErrorMessage, showSuccessMessage } from '../redux/snackbar'
import User from '../service/user'

function* resetPasswordWatcher() {
  yield takeEvery(resetPasswordStart.type, resetPasswordWorker)
}

function* resetPasswordWorker(action) {
  try {
    const data = action.payload
    console.log('data in resetPassword Saga:_--', data)
    yield User.resetPassword(data)
    yield put(resetPasswordSuccessful())
    yield put(showSuccessMessage({ msg: 'Password updated successfully' }))
  } catch (e) {
    yield put(showErrorMessage({ msg: e.errMsg }))
    yield put(resetPasswordFailure())
  }
}

export default resetPasswordWatcher

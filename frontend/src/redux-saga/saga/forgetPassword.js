import { takeEvery, put } from 'redux-saga/effects'
import {
  forgetPasswordMailStart,
  forgetPasswordMailFailure,
  forgetPasswordMailSuccessful,
} from '../redux/actions'
import { showErrorMessage } from '../redux/snackbar'
import User from '../service/user'

function* forgetPasswordMailWatcher() {
  yield takeEvery(forgetPasswordMailStart.type, forgetPasswordMailWorker)
}

function* forgetPasswordMailWorker(action) {
  try {
    const { email } = action.payload
    yield User.forgetPasswordMail(email)
    yield put(forgetPasswordMailSuccessful())
  } catch (e) {
    yield put(showErrorMessage({ msg: e.errMsg }))
    yield put(forgetPasswordMailFailure())
  }
}

export default forgetPasswordMailWatcher

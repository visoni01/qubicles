import { takeEvery, put } from 'redux-saga/effects'
import apiClient from '../../../utils/apiClient'
import {
  userSignupStart,
  userSignupFailure,
  userSignupSuccessful,
} from '../../redux/actions'
import { showErrorMessage } from '../../redux/utils/snackbar'

function* signupWatcher() {
  yield takeEvery(userSignupStart.type, signupWorker)
}

function* signupWorker(action) {
  try {
    const data = action && action.payload
    yield apiClient.signup(data)
    yield put(userSignupSuccessful())
  } catch (e) {
    yield put(showErrorMessage({ msg: e.errMsg }))
    yield put(userSignupFailure())
  }
}

export default signupWatcher

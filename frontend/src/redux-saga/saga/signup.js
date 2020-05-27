import { takeEvery, put } from 'redux-saga/effects'
import apiClient from '../../utils/apiClient'
import {
  userSignupStart,
  userSignupFailure,
  userSignupSuccessful,
} from '../redux/signup'

function* signupWatcher() {
  yield takeEvery( userSignupStart.type, signupWorker )
}

function* signupWorker( action ) {
  try {
    yield apiClient.signup( action.payload )
    yield put( userSignupSuccessful() )
  } catch ( e ) {
    yield put( userSignupFailure() )
  }
}

export default signupWatcher

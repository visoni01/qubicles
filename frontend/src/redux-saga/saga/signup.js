import { takeEvery, put } from 'redux-saga/effects'
import apiClient from '../../utils/apiClient'
import {
  userSignupStart,
  userSignupFailure,
  userSignupSuccessful,
} from '../redux/signup'

function* signupWatcher() {
  yield takeEvery(userSignupStart.type, signupWorker)
}

function* signupWorker(action) {
  try {
    const data = action && action.payload
    const inviteData = { // Temporary hard coded invite data, Will refactor it when invite functionaliy added to FE.
      with_invite: false,
      inviter_id: '',
    }
    Object.assign(data, inviteData)
    yield apiClient.signup(data)
    yield put(userSignupSuccessful())
  } catch (e) {
    yield put(userSignupFailure())
  }
}

export default signupWatcher

import { takeEvery, put } from 'redux-saga/effects'
import apiClient from '../../utils/apiClient'
import {
  postSignUpStepStart,
  postSignUpStepSuccessful,
  postSignUpStepFailure,
} from '../redux/postSignup'

function* postSignupStepWatcher() {
  yield takeEvery(postSignUpStepStart.type, postSignupStepWorker)
}

function* postSignupStepWorker(action) {
  try {
    const { type, step, data } = action.payload
    if (step === 1) data.user_code = type
    const response = yield apiClient.postSignUp(type, step, data)
    const inviteLink = response.data && response.data.result && response.data.result.inviteLink // temporary set up.
    yield put(postSignUpStepSuccessful({ step, data, inviteLink }))
  } catch (e) {
    yield put(postSignUpStepFailure())
  }
}

export default postSignupStepWatcher

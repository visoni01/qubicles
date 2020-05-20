import { takeEvery, put } from 'redux-saga/effects'
import { userSignupStart, userSignupFailure, userSignupSuccessful } from '../redux/signup'

function* signupWatcher() {
  yield takeEvery( userSignupStart.type, signupWorker )
}

function* signupWorker(action) {
  try {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2222", action)
    // yield put(userSignupSuccessful)
  } catch(e) {
    console.log("=======EEEE", e)
  }
}

export default signupWatcher

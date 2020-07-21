import { takeEvery, put } from 'redux-saga/effects'
import {
  userLoginStart,
  userLoginSuccessful,
  userLoginFailure,
} from '../redux/login'
import User from '../service/user'
import { getUserDetails } from '../../utils/common'
import { showSuccessMessage } from '../redux/snackbar'

function* loginWatcher() {
  yield takeEvery(userLoginStart.type, loginWorker)
}

function* loginWorker(action) {
  try {
    const data = action && action.payload
    const responseStatus = yield User.login(data)
    const userDetails = getUserDetails()
    yield put(showSuccessMessage({ msg: 'Successfully Logged in' }))
    yield put(userLoginSuccessful({ userDetails }))
  } catch (e) {
    yield put(userLoginFailure())
  }
}

export default loginWatcher

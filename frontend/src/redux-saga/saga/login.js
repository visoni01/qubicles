import { takeLatest, put } from 'redux-saga/effects'
import {
  userLoginStart,
  userLoginSuccessful,
  userUpdateStart,
  userUpdateSuccess,
  userLoginFailure,
} from '../redux/login'
import User from '../service/user'
import { getUserDetails } from '../../utils/common'
import { showSuccessMessage, showErrorMessage } from '../redux/snackbar'

function* loginWatcher() {
  yield takeLatest([ userLoginStart.type, userUpdateStart.type ], loginWorker)
}

// TODO: modify login to user
function* loginWorker(action) {
  try {
    switch (action.type) {
      case userLoginStart.type: {
        const data = action && action.payload
        yield User.login(data)
        const userDetails = getUserDetails()
        yield put(showSuccessMessage({ msg: `Welcome ${ userDetails && userDetails.full_name }` }))
        yield put(userLoginSuccessful({ userDetails }))
        break
      }
      case userUpdateStart.type: {
        const { role } = action.payload
        yield User.updateUser({ user_code: role })
        yield put(userUpdateSuccess())
        break
      }
      default:
        break
    }
  } catch (e) {
    yield put(showErrorMessage({ msg: e }))
    yield put(userLoginFailure())
  }
}

export default loginWatcher

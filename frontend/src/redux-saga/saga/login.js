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
import { startLoader, stopLoader } from '../redux/loader'
import { setShowVerifyMailButton } from '../redux/actions'

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
        yield put(startLoader())
        const { role } = action.payload
        yield User.updateUser({ user_code: role })
        yield put(userUpdateSuccess())
        yield put(stopLoader())
        break
      }
      default:
        break
    }
  } catch (e) {
    yield put(showErrorMessage({ msg: e.errMsg }))
    if (e.errCode === 'EMAIL_NOT_VERIFIED') {
      yield put(setShowVerifyMailButton())
    }
    yield put(userLoginFailure())
    yield put(stopLoader())
  }
}

export default loginWatcher

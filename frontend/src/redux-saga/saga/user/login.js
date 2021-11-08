import { takeLatest, put } from 'redux-saga/effects'
import {
  resetCompanyProfileSettingsData,
  setShowVerifyMailButton,
  userLoginStart,
  userLoginSuccessful,
  userUpdateStart,
  userUpdateSuccess,
  userLoginFailure,
  userLogoutSuccessful,
  resetAgentProfileSettingsData,
  clearStore,
} from '../../redux/actions'
import User from '../../service/user'
import { getUserDetails } from '../../../utils/common'
import { showSuccessMessage, showErrorMessage } from '../../redux/utils/snackbar'
import { startLoader, stopLoader } from '../../redux/utils/loader'
import WebSocket from '../../../socket'
import { USERS } from '../../../utils/constants'

function* loginWatcher() {
  yield takeLatest(
    [ userLoginStart.type, userUpdateStart.type, userLogoutSuccessful.type, clearStore.type ],
    loginWorker,
  )
}

// TODO: modify login to user
// eslint-disable-next-line complexity
function* loginWorker(action) {
  try {
    switch (action.type) {
      case userLoginStart.type: {
        const data = action && action.payload
        yield User.login(data)
        const userDetails = getUserDetails()
        yield put(showSuccessMessage({ msg: `Welcome ${ userDetails && userDetails.full_name }` }))
        yield put(userLoginSuccessful({ userDetails }))

        WebSocket.initialize({ userId: userDetails && userDetails.user_id })
        WebSocket.joinRoom(userDetails.user_id && userDetails.user_id.toString())
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
      case userLogoutSuccessful.type: {
        const { userType } = action.payload
        if (userType === USERS.AGENT) {
          yield put(resetAgentProfileSettingsData())
        } else {
          yield put(resetCompanyProfileSettingsData())
        }

        WebSocket.disconnect()
        break
      }
      case clearStore.type: {
        WebSocket.disconnect()
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

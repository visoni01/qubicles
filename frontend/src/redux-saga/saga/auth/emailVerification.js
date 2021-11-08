import { takeEvery, put } from 'redux-saga/effects'
import apiClient from '../../../utils/apiClient'
import { USERS } from '../../../utils/constants'
import {
  emailVerificationStart, emailVerificationFailure, emailVerificationSuccessful, agentProfileSettingsApiSuccess,
  updateCompanyProfileSettingsApiSuccess,
} from '../../redux/actions'
import { startLoader, stopLoader } from '../../redux/utils/loader'
import { showErrorMessage } from '../../redux/utils/snackbar'

function* emailVerificationWatcher() {
  yield takeEvery(emailVerificationStart.type, emailVerificationWorker)
}

function* emailVerificationWorker(action) {
  try {
    const { token, userType } = action.payload
    yield put(startLoader())
    const response = yield apiClient.emailVerification(token)
    yield put(emailVerificationSuccessful(response.data))
    if (userType) {
      if (userType === USERS.AGENT) {
        yield put(agentProfileSettingsApiSuccess({
          updatedData: {
            email: response.data.email,
          },
          verificationFlow: 'email',
        }))
      } else {
        yield put(updateCompanyProfileSettingsApiSuccess({
          updatedData: {
            email: response.data.email,
          },
        }))
      }
    }
    yield put(stopLoader())
  } catch (e) {
    yield put(showErrorMessage({ msg: e.errMsg }))
    yield put(emailVerificationFailure())
    yield put(stopLoader())
  }
}

export default emailVerificationWatcher

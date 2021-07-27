import { takeEvery, put } from 'redux-saga/effects'
import apiClient from '../../../utils/apiClient'
import { getNotificationMessage } from '../../../utils/common'
import {
  userSignupStart,
  userSignupFailure,
  userSignupSuccessful,
} from '../../redux/actions'
import { showErrorMessage } from '../../redux/utils/snackbar'
import WebSocket from '../../../socket'
import { SUBJECTS } from '../../../utils/messages'

function* signupWatcher() {
  yield takeEvery(userSignupStart.type, signupWorker)
}

function* signupWorker(action) {
  try {
    const data = action && action.payload
    const { data: userData } = yield apiClient.signup(data)

    if (data && data.inviter_id) {
      const message = getNotificationMessage({
        type: 'referral-signup',
        payload: {
          id: userData && userData.user_id,
          name: userData && userData.full_name,
        },
      })

      WebSocket.sendNotification({
        to: data && data.inviter_id,
        from: userData && userData.user_id,
        message,
        subject: SUBJECTS.REFER_USER,
      })
    }

    yield put(userSignupSuccessful())
  } catch (e) {
    yield put(showErrorMessage({ msg: e.errMsg }))
    yield put(userSignupFailure())
  }
}

export default signupWatcher

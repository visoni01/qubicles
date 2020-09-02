import { takeEvery, put } from 'redux-saga/effects'
import {
  checkrInvitationFetchingStart,
  checkrInvitationFetchingSuccessful,
  checkrInvitationFetchingFailure,
} from '../../redux/actions'
import { showErrorMessage, showSuccessMessage } from '../../redux/snackbar'
import User from '../../service/user'

function* checkrInvitationFetchingWatcherStart() {
  yield takeEvery(checkrInvitationFetchingStart.type, checkrInvitationFetchingWorker)
}

function* checkrInvitationFetchingWorker(action) {
  let msg
  try {
    const { data } = yield User.getCheckrInvitationLink()
    if (data.msg) msg = data.msg
    yield put(checkrInvitationFetchingSuccessful({
      invitationLink: data.checkrInvitationUrl,
      status: data.status,
    }))
  } catch (e) {
    yield put(showErrorMessage())
    yield put(checkrInvitationFetchingFailure())
  }
  if (msg) {
    yield put(showSuccessMessage({ msg }))
  }
}

export default checkrInvitationFetchingWatcherStart

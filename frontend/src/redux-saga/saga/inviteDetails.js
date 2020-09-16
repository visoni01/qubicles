import { takeEvery, put } from 'redux-saga/effects'
import User from '../service/user'
import {
  getInviterDetailsStart,
  getInviterDetailsSuccessful,
  getInviterDetailsFailure,
} from '../redux/actions'
import { showErrorMessage } from '../redux/snackbar'

function* getInviterDetailsStartWatcher() {
  yield takeEvery(getInviterDetailsStart.type, getInviterDetailsStartWorker)
}

function* getInviterDetailsStartWorker(action) {
  try {
    const { walletId } = action.payload
    const { data } = yield User.getInviterDetails(walletId)
    yield put(getInviterDetailsSuccessful({
      inviterId: data.inviter_id,
      withInvite: data.with_invite,
      fullName: data.full_name,
    }))
  } catch (e) {
    yield put(showErrorMessage())
    yield put(getInviterDetailsFailure())
  }
}

export default getInviterDetailsStartWatcher

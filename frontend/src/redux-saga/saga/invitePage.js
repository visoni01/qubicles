import { takeEvery, put } from 'redux-saga/effects'
import apiClient from '../../utils/apiClient'
import {
  inviteRequestStart,
  inviteRequestSuccessful,
  inviteRequestFailure,
} from '../redux/user/invitePage'
import { showErrorMessage } from '../redux/utils/snackbar'

function* inviteRequestWatcher() {
  yield takeEvery(inviteRequestStart.type, inviteRequestWorker)
}

function* inviteRequestWorker(action) {
  try {
    const { payload } = action
    let result
    switch (payload.type) {
      case 'invite-manual':
        result = yield apiClient.inviteRequest('post', payload)
        break
      case 'invite-with-google':
        result = yield apiClient.inviteRequest('get', payload)
        break
      default:
        break
    }
    const { message } = result
    yield put(inviteRequestSuccessful({ result: message, type: payload.type }))
  } catch (e) {
    yield put(showErrorMessage())
    yield put(inviteRequestFailure())
  }
}

export default inviteRequestWatcher

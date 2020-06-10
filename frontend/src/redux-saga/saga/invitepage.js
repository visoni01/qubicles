import { takeEvery, put } from 'redux-saga/effects'
import apiClient from '../../utils/apiClient'
import {
  inviteRequestStart,
  inviteRequestSuccessful,
  inviteRequestFailure,
} from '../redux/invitePage'

function* inviteRequestWatcher() {
  yield takeEvery( inviteRequestStart.type, inviteRequestWorker )
}

function* inviteRequestWorker( action ) {
  try {
    const { payload } = action
    let result
    switch (payload.type) {
      case 'inviteManual':
        result = yield apiClient.inviteRequest('post', payload)
        break;
      case 'inviteWithGoogle':
        result = yield apiClient.inviteRequest('get', payload)
      default:
        break;
    }
    yield put( inviteRequestSuccessful() )
  } catch ( e ) {
    yield put( inviteRequestFailure() )
  }
}

export default inviteRequestWatcher

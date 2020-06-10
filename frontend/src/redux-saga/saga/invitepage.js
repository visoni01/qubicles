import { takeEvery, put } from 'redux-saga/effects'
import apiClient from '../../utils/apiClient'
import {
  inviteRequestStart,
  inviteRequestSuccessful,
  inviteRequestFailure,
} from '../redux/emailVerification'

function* inviteRequestWatcher() {
  yield takeEvery( inviteRequestStart.type, inviteRequestWorker )
}

function* inviteRequestWorker( action ) {
  try {
    const { payload } = action
    yield apiClient.inviteRequest( payload )
    yield put( inviteRequestSuccessful() )
  } catch ( e ) {
    yield put( inviteRequestFailure() )
  }
}

export default inviteRequestWatcher

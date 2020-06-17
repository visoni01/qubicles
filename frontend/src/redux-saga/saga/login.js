import { takeEvery, put } from 'redux-saga/effects'
import apiClient from '../../utils/apiClient'
import {
  userLoginStart,
  userLoginSuccessful,
  userLoginFailure,
} from '../redux/login'

function* loginWatcher() {
  yield takeEvery( userLoginStart.type, loginWorker )
}

function* loginWorker( action ) {
  try {
    const data = action && action.payload
    yield apiClient.login( data )
    yield put( userLoginSuccessful() )
  } catch ( e ) {
    yield put( userLoginFailure() )
  }
}

export default loginWatcher

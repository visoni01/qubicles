import { takeEvery, put } from 'redux-saga/effects'
import {
  activeUserDataFetchingFailure,
  activeUserDataFetchingStart,
  activeUserDataFetchingSuccessful,
} from '../../redux/actions'
import Dashboard from '../../service/dashboard'
import { showErrorMessage } from '../../redux/utils/snackbar'

function* activeUserDataFetchingWatcherStart() {
  yield takeEvery(activeUserDataFetchingStart.type, activeUserDataFetchingWorker)
}

function* activeUserDataFetchingWorker() {
  try {
    const activeUsers = yield Dashboard.fetchActiveUsers()
    yield put(activeUserDataFetchingSuccessful({ activeUsers }))
  } catch (e) {
    yield put(showErrorMessage())
    yield put(activeUserDataFetchingFailure())
  }
}

export default activeUserDataFetchingWatcherStart

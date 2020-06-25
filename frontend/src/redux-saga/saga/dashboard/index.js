import { takeEvery, put } from 'redux-saga/effects'
import {
  dashboardDataFetchingStart,
  dashboardDataFetchingFailure,
  dashboardDataFetchingSuccessful,
  announcementDataFetchingStart,
} from '../../redux/actions'

function* dashboardWatcher() {
  yield takeEvery( dashboardDataFetchingStart.type, dashboardWorker )
}

function* dashboardWorker( action ) {
  try {
    // Fetching announcements data
    yield put( announcementDataFetchingStart() )
    // TODO: Call action for fetching job posting data
    // TODO: Call action for fetching active users data
    yield put( dashboardDataFetchingSuccessful() )
  } catch ( e ) {
    yield put( dashboardDataFetchingFailure() )
  }
}

export default dashboardWatcher

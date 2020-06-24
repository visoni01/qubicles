import { takeEvery, put } from 'redux-saga/effects'
import {
  dashboardDataFechingStart,
  dashboardDataFechingFailure,
  dashboardDataFechingSuccessful,
  announcementDataFechingStart,
} from '../../redux/actions'

function* dashboardWatcher() {
  yield takeEvery( dashboardDataFechingStart.type, dashboardWorker )
}

function* dashboardWorker( action ) {
  try {
    // Fetching announcements data
    yield put( announcementDataFechingStart() )
    // TODO: Call action for fetching job posting data
    // TODO: Call action for fetching active users data
    yield put( dashboardDataFechingSuccessful() )
  } catch ( e ) {
    yield put( dashboardDataFechingFailure() )
  }
}

export default dashboardWatcher

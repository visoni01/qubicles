import { takeEvery, put } from 'redux-saga/effects'
import {
  dashboardDataFetchingStart,
  dashboardDataFetchingFailure,
  dashboardDataFetchingSuccessful,
  announcementDataFetchingStart,
  communityRepDataFechingStart,
  jobPostingDataFetchingStart,
  activeUserDataFetchingStart,

} from '../../redux/actions'
import { showErrorMessage } from '../../redux/snackbar'

function* dashboardWatcher() {
  yield takeEvery(dashboardDataFetchingStart.type, dashboardWorker)
}

function* dashboardWorker(action) {
  try {
    // Fetching announcements data
    yield put(announcementDataFetchingStart())
    // TODO: Call action for fetching community reputation data
    yield put(communityRepDataFechingStart())
    // TODO: Call action for fetching job posting data
    yield put(jobPostingDataFetchingStart())
    // TODO: Call action for fetching active users data
    yield put(activeUserDataFetchingStart())

    yield put(dashboardDataFetchingSuccessful())
  } catch (e) {
    yield put(showErrorMessage())
    yield put(dashboardDataFetchingFailure())
  }
}

export default dashboardWatcher

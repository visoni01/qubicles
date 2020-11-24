import { takeEvery, put } from 'redux-saga/effects'
import {
  dashboardDataFetchingStart,
  dashboardDataFetchingFailure,
  dashboardDataFetchingSuccessful,
  announcementDataFetchingStart,
  communityRepDataFechingStart,
  jobPostingDataFetchingStart,
  activeUserDataFetchingStart,
  postDataFetchingStart,
  resetPostComments,
} from '../../redux/actions'
import { showErrorMessage } from '../../redux/snackbar'

function* dashboardWatcher() {
  yield takeEvery(dashboardDataFetchingStart.type, dashboardWorker)
}

function* dashboardWorker() {
  try {
    // Fetching announcements data
    yield put(announcementDataFetchingStart())
    // Calling action for fetching community reputation data
    yield put(communityRepDataFechingStart())
    // Calling action for fetching job posting data
    yield put(jobPostingDataFetchingStart())
    // Calling action for fetching active users data
    yield put(activeUserDataFetchingStart())
    // Calling action for fetching posts
    yield put(postDataFetchingStart())

    yield put(dashboardDataFetchingSuccessful())
    // reset post comments states
    yield put(resetPostComments())
  } catch (e) {
    yield put(showErrorMessage())
    yield put(dashboardDataFetchingFailure())
  }
}

export default dashboardWatcher

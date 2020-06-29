import { takeEvery, put } from 'redux-saga/effects'
import {
  jobPostingDataFetchingFailure,
  jobPostingDataFetchingStart,
  jobPostingDataFetchingSuccessful,
} from '../../redux/actions'
import Dashboard from '../../service/dashboard'

function* jobPostingDataFetchingWatcherStart() {
  yield takeEvery(jobPostingDataFetchingStart.type, jobPostingDataFetchingWorker)
}

function* jobPostingDataFetchingWorker() {
  try {
    const jobPostings = yield Dashboard.fetchJobPostings()
    yield put(jobPostingDataFetchingSuccessful({ jobPostings }))
  } catch (e) {
    yield put(jobPostingDataFetchingFailure())
  }
}

export default jobPostingDataFetchingWatcherStart

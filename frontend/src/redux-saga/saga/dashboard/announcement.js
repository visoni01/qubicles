import { takeEvery, put } from 'redux-saga/effects'
import {
  announcementDataFetchingStart,
  announcementDataFetchingSuccessful,
  announcementDataFetchingFailure,
} from '../../redux/actions'
import Dashboard from '../../service/dashboard'
import { showErrorMessage } from '../../redux/utils/snackbar'

function* announcementDataFetchingWatcherStart() {
  yield takeEvery(announcementDataFetchingStart.type, announcementDataFetchingWorker)
}

function* announcementDataFetchingWorker() {
  try {
    const { data } = yield Dashboard.fetchAnnouncement()
    yield put(announcementDataFetchingSuccessful({ announcements: data }))
  } catch (e) {
    yield put(showErrorMessage())
    yield put(announcementDataFetchingFailure())
  }
}

export default announcementDataFetchingWatcherStart

import { takeEvery, put } from 'redux-saga/effects'
import {
  announcementDataFetchingStart,
  announcementDataFetchingSuccessful,
  announcementDataFetchingFailure,
} from '../../redux/actions'
import Dashboard from '../../service/dashboard'

function* announcementDataFetchingWatcherStart() {
  yield takeEvery(announcementDataFetchingStart.type, announcementDataFetchingWorker)
}

function* announcementDataFetchingWorker(action) {
  try {
    const { data } = yield Dashboard.fetchAnnouncement()
    yield put(announcementDataFetchingSuccessful({ announcements: data }))
  } catch (e) {
    yield put(announcementDataFetchingFailure())
  }
}

export default announcementDataFetchingWatcherStart

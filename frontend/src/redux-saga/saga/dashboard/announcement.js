import { takeEvery, put } from 'redux-saga/effects'
import {
  announcementDataFechingStart,
  announcementDataFechingSuccessful,
  announcementDataFechingFailure,
} from '../../redux/actions'
import Dashboard from '../../service/dashboard'

function* announcementDataFechingWatcherStart() {
  yield takeEvery( announcementDataFechingStart.type, announcementDataFechingWorker )
}

function* announcementDataFechingWorker( action ) {
  try {
    const announcements = yield Dashboard.fetchAnnouncement()
    yield put( announcementDataFechingSuccessful( { announcements } ) )
  } catch ( e ) {
    yield put( announcementDataFechingFailure() )
  }
}

export default announcementDataFechingWatcherStart

import { takeEvery, put } from 'redux-saga/effects'
import {
  communityRepDataFechingStart,
  communityRepDataFechingSuccessful,
  communityRepDataFechingFailure,
} from '../../redux/actions'
import Dashboard from '../../service/dashboard'

function* communityRepDataFechingWatcherStart() {
  yield takeEvery(communityRepDataFechingStart.type, communityRepDataFechingWorker)
}

function* communityRepDataFechingWorker(action) {
  try {
    const communityRep = yield Dashboard.fetchCommunityRep()
    yield put(communityRepDataFechingSuccessful({ communityRep }))
  } catch (e) {
    yield put(communityRepDataFechingFailure())
  }
}

export default communityRepDataFechingWatcherStart

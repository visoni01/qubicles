import { takeEvery, put } from 'redux-saga/effects'
import {
  communityRepDataFechingStart,
  communityRepDataFechingSuccessful,
  communityRepDataFechingFailure,
} from '../../redux/actions'
import Dashboard from '../../service/dashboard'
import { showErrorMessage } from '../../redux/snackbar'

function* communityRepDataFechingWatcherStart() {
  yield takeEvery(communityRepDataFechingStart.type, communityRepDataFechingWorker)
}

function* communityRepDataFechingWorker(action) {
  try {
    const { data } = yield Dashboard.fetchCommunityRep()
    yield put(communityRepDataFechingSuccessful({ communityRep: data }))
  } catch (e) {
    yield put(showErrorMessage())
    yield put(communityRepDataFechingFailure())
  }
}

export default communityRepDataFechingWatcherStart

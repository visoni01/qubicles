import { takeEvery, put } from 'redux-saga/effects'
import {
  channelDataFetchingStart,
  channelDataFetchingSuccessful,
  channelDataFetchingFailure,
} from '../../../redux/actions'

import Forum from '../../../service/forum'
import { showErrorMessage } from '../../../redux/snackbar'

function* channelDataFetchingWatcherStart() {
  yield takeEvery(channelDataFetchingStart.type, channelDataFetchingWorker)
}

function* channelDataFetchingWorker(action) {
  try {
    const { channelId } = action.payload
    const { data } = yield Forum.fetchChannel({ channelId })
    yield put(channelDataFetchingSuccessful({ channelDetails: data }))
  } catch (e) {
    yield put(showErrorMessage())
    yield put(channelDataFetchingFailure())
  }
}

export default channelDataFetchingWatcherStart
import { takeEvery, put } from 'redux-saga/effects'
import {
  channelDetailsFetchingStart,
  channelDetailsFetchingSuccessful,
  channelDetailsFetchingFailure,
} from '../../../redux/actions'

import Forum from '../../../service/forum'
import { showErrorMessage } from '../../../redux/snackbar'

function* channelDetailsFetchingWatcherStart() {
  yield takeEvery(channelDetailsFetchingStart.type, channelDetailsFetchingWorker)
}

function* channelDetailsFetchingWorker(action) {
  try {
    const { channelId } = action.payload
    const { data } = yield Forum.fetchChannel({ channelId })
    yield put(channelDetailsFetchingSuccessful({ channelDetails: data }))
  } catch (e) {
    yield put(showErrorMessage())
    yield put(channelDetailsFetchingFailure())
  }
}

export default channelDetailsFetchingWatcherStart

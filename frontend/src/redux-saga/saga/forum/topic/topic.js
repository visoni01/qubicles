import { takeEvery, put } from 'redux-saga/effects'
import {
  topicDataFetchingStart,
  topicDataFetchingSuccessful,
  topicDataFetchingFailure,
} from '../../../redux/actions'

import Forum from '../../../service/forum'
import { showErrorMessage } from '../../../redux/snackbar'

function* topicDataFetchingWatcherStart() {
  yield takeEvery(topicDataFetchingStart.type, topicDataFetchingWorker)
}

function* topicDataFetchingWorker(action) {
  try {
    const { topicId } = action.payload
    const { data } = yield Forum.fetchTopic({ topicId })
    yield put(topicDataFetchingSuccessful({ topicDetails: data }))
  } catch (e) {
    yield put(showErrorMessage())
    yield put(topicDataFetchingFailure())
  }
}

export default topicDataFetchingWatcherStart

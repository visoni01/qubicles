import { takeEvery, put } from 'redux-saga/effects'
import {
  topicDataFetchingStart,
  topicDataFetchingSuccessful,
  topicDataFetchingFailure,
} from '../../redux/actions'

import Forum from '../../service/forum'

function* topicDataFetchingWatcherStart() {
  yield takeEvery(topicDataFetchingStart.type, topicDataFetchingWorker)
}

function* topicDataFetchingWorker(action) {
  try {
    const { topicId } = action.payload
    const topicDetails = yield Forum.fetchTopic({ topicId })
    yield put(topicDataFetchingSuccessful({ topicDetails }))
  } catch (e) {
    yield put(topicDataFetchingFailure())
  }
}

export default topicDataFetchingWatcherStart

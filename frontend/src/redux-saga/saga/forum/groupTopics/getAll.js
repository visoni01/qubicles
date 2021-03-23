import { takeEvery, put } from 'redux-saga/effects'
import {
  groupTopicsFetchingStart,
  groupTopicsFetchingSuccessful,
  groupTopicsFetchingFailure,
} from '../../../redux/actions'

import Forum from '../../../service/forum'
import { showErrorMessage } from '../../../redux/utils/snackbar'

function* groupTopicsWatcher() {
  yield takeEvery(groupTopicsFetchingStart.type, groupTopicsFetchingWorker)
}

function* groupTopicsFetchingWorker(action) {
  try {
    const { data } = yield Forum.getGroupTopics(action.payload)
    yield put(groupTopicsFetchingSuccessful({
      topics: data && data.topics,
      topicsCount: data && data.count,
    }))
  } catch (e) {
    yield put(showErrorMessage())
    yield put(groupTopicsFetchingFailure())
  }
}

export default groupTopicsWatcher

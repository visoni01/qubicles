import { takeEvery, put } from 'redux-saga/effects'
import {
  groupTopicsFetchingStart,
  groupTopicsFetchingSuccessful,
  groupTopicsFetchingFailure,
} from '../../../redux/actions'

import Forum from '../../../service/forum'
import { showErrorMessage } from '../../../redux/snackbar'

function* groupTopicsWatcher() {
  yield takeEvery(groupTopicsFetchingStart.type, groupTopicsFetchingWorker)
}

function* groupTopicsFetchingWorker(action) {
  try {
    const { groupId } = action.payload
    const { data } = yield Forum.getGroupTopics(groupId)
    yield put(groupTopicsFetchingSuccessful({ topics: data && data.topics }))
  } catch (e) {
    yield put(showErrorMessage())
    yield put(groupTopicsFetchingFailure())
  }
}

export default groupTopicsWatcher

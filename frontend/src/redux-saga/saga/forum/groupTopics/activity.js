import { takeEvery, put } from 'redux-saga/effects'
import {
  updateGroupTopicsList,
} from '../../../redux/actions'
import { TOPIC_ACTIVITY } from '../../../redux/constants'

import Forum from '../../../service/forum'
import { showErrorMessage } from '../../../redux/utils/snackbar'

function* topicActivityWatcher() {
  yield takeEvery([ TOPIC_ACTIVITY ], topicActivityWorker)
}

function* topicActivityWorker(action) {
  try {
    yield Forum.topicActivity(action.payload)
    yield put(updateGroupTopicsList({
      type: TOPIC_ACTIVITY,
      ...action.payload,
    }))
  } catch (e) {
    yield put(showErrorMessage())
  }
}

export default topicActivityWatcher

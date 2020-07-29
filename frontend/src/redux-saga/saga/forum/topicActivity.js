import { takeEvery, put } from 'redux-saga/effects'
import {
  topicActivityDataPostingStart,
  topicReplyActivitySuccessful,
  topicReplyActivityFailure,
} from '../../redux/actions'

import Forum from '../../service/forum'

function* topicActivityWatcher() {
  yield takeEvery(topicActivityDataPostingStart.type, topicActivityWorker)
}

function* topicActivityWorker(action) {
  try {
    const { payload, activityType } = action.payload
    const { data } = yield Forum.postTopicActivity({ payload, activityType })
    switch (activityType) {
      case 'reply':
        yield put(topicReplyActivitySuccessful({ newReply: data }))
        break
      default:
        break
    }
  } catch (e) {
    yield put(topicReplyActivityFailure())
  }
}

export default topicActivityWatcher

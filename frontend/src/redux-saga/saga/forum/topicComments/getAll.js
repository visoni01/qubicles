import { takeEvery, put } from 'redux-saga/effects'
import {
  topicCommentsFetchingStart,
  topicCommentsFetchingSuccessful,
  topicCommentsFetchingFailure,
} from '../../../redux/actions'

import Forum from '../../../service/forum'
import { showErrorMessage } from '../../../redux/snackbar'

function* topicCommentsWatcher() {
  yield takeEvery(topicCommentsFetchingStart.type, TopicCommentsFetchingWorker)
}

function* TopicCommentsFetchingWorker(action) {
  try {
    const { topicId } = action.payload
    const { data } = yield Forum.getTopicComments(topicId)
    yield put(topicCommentsFetchingSuccessful({ comments: data && data.comments }))
  } catch (e) {
    yield put(showErrorMessage())
    yield put(topicCommentsFetchingFailure())
  }
}

export default topicCommentsWatcher

import { takeEvery, put } from 'redux-saga/effects'
import {
  topicCommentsFetchingStart,
  topicCommentsFetchingSuccessful,
  topicCommentsFetchingFailure,
  updateTopicComments,
} from '../../../redux/actions'

import Forum from '../../../service/forum'
import { showErrorMessage } from '../../../redux/utils/snackbar'
import { LOAD_MORE_COMMENTS } from '../../../redux/constants'

function* topicCommentsWatcher() {
  yield takeEvery([ topicCommentsFetchingStart.type, LOAD_MORE_COMMENTS ], TopicCommentsFetchingWorker)
}

function* TopicCommentsFetchingWorker(action) {
  try {
    switch (action.type) {
      case topicCommentsFetchingStart.type: {
        const { data } = yield Forum.getTopicComments(action.payload)
        yield put(topicCommentsFetchingSuccessful({
          comments: data && data.comments,
        }))
        break
      }
      case LOAD_MORE_COMMENTS: {
        const { data } = yield Forum.getTopicComments(action.payload)
        yield put(updateTopicComments({
          type: LOAD_MORE_COMMENTS,
          comments: data && data.comments,
        }))
        break
      }
      default:
        break
    }
  } catch (e) {
    yield put(showErrorMessage())
    yield put(topicCommentsFetchingFailure())
  }
}

export default topicCommentsWatcher

import { takeLatest, put } from 'redux-saga/effects'
import { updateTopicComments } from '../../../redux/actions'
import { POST_TOPIC_COMMENT } from '../../../redux/constants'

import Forum from '../../../service/forum'
import { showErrorMessage, showSuccessMessage } from '../../../redux/snackbar'

function* topicCommentsCrudWatcher() {
  yield takeLatest([ POST_TOPIC_COMMENT ], topicCommentsCrudWorker)
}

function* topicCommentsCrudWorker(action) {
  try {
    let msg
    switch (action.type) {
      case POST_TOPIC_COMMENT: {
        const { ownerName, ...rest } = action.payload
        const { data } = yield Forum.postTopicComment(rest)
        // eslint-disable-next-line
        yield put(updateTopicComments({
          type: POST_TOPIC_COMMENT,
          newComment: { ...data.newComment, ownerName },
        }))
        msg = 'Topic comment has been successfully posted!'
        break
      }
      default:
        break
    }
    yield put(showSuccessMessage({ msg }))
  } catch (e) {
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default topicCommentsCrudWatcher

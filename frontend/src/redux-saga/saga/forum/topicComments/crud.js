import { takeLatest, put } from 'redux-saga/effects'
import { updateTopicComments, updateGroupTopicsList } from '../../../redux/actions'
import {
  POST_TOPIC_COMMENT, UPDATE_TOPIC_COMMENT, DELETE_TOPIC_COMMENT, UPDATE_TOPIC_STATS,
} from '../../../redux/constants'

import Forum from '../../../service/forum'
import { showErrorMessage, showSuccessMessage } from '../../../redux/snackbar'

function* topicCommentsCrudWatcher() {
  yield takeLatest([ POST_TOPIC_COMMENT, UPDATE_TOPIC_COMMENT, DELETE_TOPIC_COMMENT ], topicCommentsCrudWorker)
}

function* topicCommentsCrudWorker(action) {
  try {
    let msg
    switch (action.type) {
      case POST_TOPIC_COMMENT: {
        const {
          ownerName, ownerId, topicId, ...rest
        } = action.payload
        const { data } = yield Forum.postTopicComment({ ...rest, topicId })
        yield put(updateGroupTopicsList({
          type: UPDATE_TOPIC_STATS,
          topicId,
          statType: 'commentsCountUp',
        }))

        yield put(updateTopicComments({
          type: POST_TOPIC_COMMENT,
          newComment: {
            ...data.newComment, ownerName, ownerId, topicId,
          },
        }))

        msg = 'Topic comment has been successfully posted!'
        break
      }

      case UPDATE_TOPIC_COMMENT: {
        const { ownerName, topicId, ...rest } = action.payload
        yield Forum.updateTopicComment({ topicId, ...rest })
        yield put(updateTopicComments({
          type: UPDATE_TOPIC_COMMENT,
          data: { updatedComment: action.payload },
        }))

        msg = 'Topic comment has been successfully updated!'
        break
      }

      case DELETE_TOPIC_COMMENT: {
        const { activityId, topicId, ownerId } = action.payload
        yield Forum.deleteTopicComment({ activityId, topicId, ownerId })
        yield put(updateGroupTopicsList({
          type: UPDATE_TOPIC_STATS,
          topicId,
          statType: 'commentsCountDown',
        }))
        yield put(updateTopicComments({
          type: DELETE_TOPIC_COMMENT,
          data: {
            activityId,
          },
        }))

        msg = 'Topic comment has been successfully deleted!'
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

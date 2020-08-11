import { takeLatest, put, select } from 'redux-saga/effects'
import { updateTopicDetails } from '../../../redux/actions'
import {
  DELETE_TOPIC_COMMENT, ADD_TOPIC_COMMENT, LIKE_TOPIC_COMMENT, UNLIKE_TOPIC_COMMENT,
} from '../../../redux/constants'
import { showErrorMessage, showSuccessMessage } from '../../../redux/snackbar'
import Forum from '../../../service/forum'

function* topicCommentCrudWatcher() {
  yield takeLatest([
    DELETE_TOPIC_COMMENT,
    ADD_TOPIC_COMMENT,
    LIKE_TOPIC_COMMENT,
    UNLIKE_TOPIC_COMMENT,
  ], topicCommentCrudWorker)
}

function* topicCommentCrudWorker(action) {
  try {
    let msg
    switch (action.type) {
      case DELETE_TOPIC_COMMENT: {
        const { postId } = action.payload
        yield Forum.deleteTopicComment({ postId })

        const data = yield select((state) => state.topic)
        let { posts } = data.topicDetails
        posts = posts.filter((post) => post.postId !== postId)

        yield put(updateTopicDetails({ type: DELETE_TOPIC_COMMENT, posts }))
        msg = 'Comment has been successfully deleted!'
        break
      }
      case ADD_TOPIC_COMMENT: {
        const { payload } = action.payload
        const { data } = yield Forum.addTopicComment({ payload })

        yield put(updateTopicDetails({ type: ADD_TOPIC_COMMENT, data }))
        msg = 'Comment has been successfully added!'
        break
      }
      case LIKE_TOPIC_COMMENT: {
        const { postId } = action.payload
        yield Forum.likeTopicComment({ postId })
        break
      }
      case UNLIKE_TOPIC_COMMENT: {
        const { postId } = action.payload
        yield Forum.unlikeTopicComment({ postId })
        break
      }
      default:
        break
    }
    if (msg) {
      yield put(showSuccessMessage({ msg }))
    }
  } catch (e) {
    yield put(showErrorMessage({ msg: e }))
  }
}

export default topicCommentCrudWatcher

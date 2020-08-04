import { takeLatest, put, select } from 'redux-saga/effects'
import { updateTopicReplies } from '../../../redux/actions'
import { DELETE_TOPIC_COMMENT } from '../../../redux/constants'
import { getSubstrForNotification } from '../../../../utils/common'
import { showErrorMessage, showSuccessMessage } from '../../../redux/snackbar'
import Forum from '../../../service/forum'

function* topicCommentCrudWatcher() {
  yield takeLatest([ DELETE_TOPIC_COMMENT ], topicCommentCrudWorker)
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

        yield put(updateTopicReplies({
          data: {
            topicDetails: { ...data.topicDetails, posts },
          },
        }))
        msg = 'Comment has been successfully deleted!'
        break
      }
      default:
        break
    }
    yield put(showSuccessMessage({ msg }))
  } catch (e) {
    yield put(showErrorMessage({ msg: e }))
  }
}

export default topicCommentCrudWatcher

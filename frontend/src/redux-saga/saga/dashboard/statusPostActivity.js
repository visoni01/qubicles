import {
  takeLatest, put, select,
} from 'redux-saga/effects'
import {
  updatePostData,
  showErrorMessage,
  showSuccessMessage,
  fetchCommentsStart,
} from '../../redux/actions'
import {
  UNLIKE_POST,
  LIKE_POST,
  CREATE_POST_COMMENT_START,
  DELETE_POST_COMMENT,
  ADD_COMMENT_TO_POST, FETCH_COMMENT_FOR_POST, UPDATE_POST_COMMENT,
} from '../../redux/constants'
import Dashboard from '../../service/dashboard'

function* statusPostActivityWatcherStart() {
  yield takeLatest(
    [
      UNLIKE_POST,
      LIKE_POST,
      CREATE_POST_COMMENT_START,
      fetchCommentsStart.type,
      DELETE_POST_COMMENT,
      ADD_COMMENT_TO_POST,
      FETCH_COMMENT_FOR_POST,
      UPDATE_POST_COMMENT,
    ],
    statusPostActivityFetchingWorker,
  )
}

// eslint-disable-next-line complexity
function* statusPostActivityFetchingWorker(action) {
  try {
    let msg
    switch (action.type) {
      case ADD_COMMENT_TO_POST: {
        const { commentData } = action.payload
        const { data } = yield Dashboard.addPostComment({ data: commentData })

        const { userDetails } = yield select((state) => state.login)
        const newCommentData = {
          post_id: commentData.userActivityId,
          comment_id: data.commentId,
          createdAt: data.createdAt,
          activity_value: data.content,
          owner: userDetails.full_name,
          owner_id: userDetails.user_id,
        }
        yield put(updatePostData({ type: action.type, data: newCommentData }))
        break
      }

      case DELETE_POST_COMMENT: {
        const { commentId, postId } = action.payload

        yield put(updatePostData({
          type: action.type,
          data: {
            commentId, postId,
          },
        }))
        msg = 'Comment deleted Successfully'
        break
      }

      case UPDATE_POST_COMMENT: {
        const { commentId, postId, updatedComment } = action.payload

        yield put(updatePostData({
          type: action.type,
          data: {
            commentId, postId, updatedComment,
          },
        }))
        msg = 'Comment updated Successfully'
        break
      }

      case FETCH_COMMENT_FOR_POST: {
        const { data } = yield Dashboard.getPostComments(action.payload)
        yield put(updatePostData({
          type: action.type,
          data: { comments: data.commentsData, count: data.count, userActivityId: data.user_activity_id },
        }))
        break
      }

      case LIKE_POST: {
        const { data } = action.payload
        yield put(updatePostData({ type: action.type, data }))
        yield Dashboard.likePost({ data })
        break
      }
      case UNLIKE_POST: {
        const { data } = action.payload
        yield put(updatePostData({ type: action.type, data }))
        yield Dashboard.unlikePost({ data })
        break
      }

      default:
        break
    }

    if (msg) {
      yield put(showSuccessMessage({ msg }))
    }
  } catch (e) {
    yield put(showErrorMessage({ msg: e.errMsg }))
    if (action.type === LIKE_POST) {
      yield put(updatePostData({ type: UNLIKE_POST, data: action.payload.data }))
    }
    if (action.type === UNLIKE_POST) {
      yield put(updatePostData({ type: LIKE_POST, data: action.payload.data }))
    }
  }
}

export default statusPostActivityWatcherStart

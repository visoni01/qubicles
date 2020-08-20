import {
  takeLatest, put, select
} from 'redux-saga/effects'
import {
  updatePostData,
  showErrorMessage,
  showSuccessMessage,
  fetchCommentsStart,
  updatePostComments,
  fetchCommentsSuccess,
} from '../../redux/actions'
import { UNLIKE_POST, LIKE_POST, CREATE_POST_COMMENT_START } from '../../redux/constants'
import Dashboard from '../../service/dashboard'

function* statusPostActivityWatcherStart() {
  yield takeLatest(
    [
      UNLIKE_POST,
      LIKE_POST,
      CREATE_POST_COMMENT_START,
      fetchCommentsStart.type,
    ],
    statusPostActivityFetchingWorker,
  )
}

function* statusPostActivityFetchingWorker(action) {
  try {
    let msg
    switch (action.type) {
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
      case CREATE_POST_COMMENT_START: {
        const { commentData } = action.payload
        const { data } = yield Dashboard.addPostComment({ data: commentData })
        const { userDetails } = yield select((state) => state.login)
        const newCommentData = {
          user_activity_id: commentData.userActivityId,
          createdAt: data.createdAt,
          activity_value: data.content,
          owner: userDetails.full_name,
          owner_id: userDetails.user_id,
        }
        yield put(updatePostComments({ type: updatePostComments.type, data: newCommentData }))
        yield put(updatePostData({ type: action.type, data: commentData }))
        break
      }
      case fetchCommentsStart.type: {
        const { data } = yield Dashboard.getPostComments(action.payload)
        yield put(fetchCommentsSuccess({ type: fetchCommentsSuccess.type, data: { comments: data.commentsData, count: data.count } }))
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
    if (action.type === LIKE_POST) {
      yield put(updatePostData({ type: UNLIKE_POST, data: action.payload.data }))
    }
    if (action.type === UNLIKE_POST) {
      yield put(updatePostData({ type: LIKE_POST, data: action.payload.data }))
    }
  }
}

export default statusPostActivityWatcherStart

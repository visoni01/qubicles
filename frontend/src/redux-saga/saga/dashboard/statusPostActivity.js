import {
  takeLatest, put, select,
} from 'redux-saga/effects'
import {
  updatePostData,
  showErrorMessage,
  showSuccessMessage,
  fetchCommentsStart,
  updatePostComments,
  fetchCommentsSuccess,
} from '../../redux/actions'
import {
  UNLIKE_POST,
  LIKE_POST,
  CREATE_POST_COMMENT_START, DELETE_POST_COMMENT, ADD_COMMENT_TO_POST, FETCH_COMMENT_FOR_POST,
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
    ],
    statusPostActivityFetchingWorker,
  )
}

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

      // WIP: REFACTOR ACTIONS

      // case DELETE_POST_COMMENT: {
      //   const { userActivityId, postUserActivityId, content } = action.payload
      //   yield Dashboard.deletePostComment({ userActivityId, data: { postUserActivityId } })
      //   yield put(updatePostComments({ type: action.type, userActivityId }))
      //   yield put(updatePostData({ type: action.type, postUserActivityId }))
      //   msg = `Comment ${ getSubstrForNotification(content) } has been successfully deleted!`
      //   break
      // }

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

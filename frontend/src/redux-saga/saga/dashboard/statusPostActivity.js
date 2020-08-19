import {
  takeLatest, put,
} from 'redux-saga/effects'
import {
  updatePostData,
  showErrorMessage,
  showSuccessMessage,
} from '../../redux/actions'
import { UNLIKE_POST, LIKE_POST, CREATE_POST_COMMENT_START } from '../../redux/constants'
import Dashboard from '../../service/dashboard'

function* statusPostActivityWatcherStart() {
  yield takeLatest(
    [
      UNLIKE_POST,
      LIKE_POST,
      CREATE_POST_COMMENT_START,
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
        yield Dashboard.addPostComment({ data: commentData })
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

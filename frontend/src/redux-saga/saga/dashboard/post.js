import {
  takeLatest, put, select,
} from 'redux-saga/effects'
import {
  postDataFetchingStart,
  postDataFetchingFailed,
  createStatusPostStart,
  updatePostData,
  showErrorMessage,
  showSuccessMessage,
  createStatusPostFailed,
  createStatusPostSuccess,
} from '../../redux/actions'
import { DELETE_POST_STATUS } from '../../redux/constants'
import Dashboard from '../../service/dashboard'

function* postDataCrudWatcherStart() {
  yield takeLatest(
    [
      postDataFetchingStart.type,
      createStatusPostStart.type,
      DELETE_POST_STATUS,
    ],
    postDataFetchingWorker,
  )
}

function* postDataFetchingWorker(action) {
  try {
    let msg
    switch (action.type) {
      case postDataFetchingStart.type: {
        const { data } = yield Dashboard.fetchPosts()
        yield put(updatePostData({ type: action.type, posts: data }))
        break
      }
      case createStatusPostStart.type: {
        const formData = new FormData()
        const { file, text, activityPermission } = action.payload

        formData.append('file', file)
        formData.set('text', text)
        formData.set('activityPermission', activityPermission)

        const { data } = yield Dashboard.addPost({ data: formData })
        const { userDetails } = yield select((state) => state.login)
        yield put(updatePostData({
          type: action.type,
          newPost: {
            ...data,
            owner: userDetails.full_name,
            isPostLiked: false,
            likesCount: 0,
            commentsCount: 0,
          },
        }))
        yield put(createStatusPostSuccess())
        msg = 'Status has been sucessfully posted!'
        break
      }
      case DELETE_POST_STATUS: {
        const { userActivityId } = action.payload
        yield Dashboard.deletePost({ userActivityId })
        yield put(updatePostData({ type: action.type, userActivityId }))
        msg = 'Status has been successfully deleted!'
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

    if (action.type === createStatusPostStart.type) {
      yield put(createStatusPostFailed())
    }
    if (action.type === postDataFetchingStart.type) {
      yield put(postDataFetchingFailed())
    }
  }
}

export default postDataCrudWatcherStart

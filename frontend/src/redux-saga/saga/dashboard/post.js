import { takeLatest, put } from 'redux-saga/effects'
import {
  postDataFechingStart,
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
      postDataFechingStart.type,
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
      case postDataFechingStart.type: {
        const { data } = yield Dashboard.fetchPosts()
        const postData = data.map((post) => ({
          activityCustom: post.activity_custom,
          activityPermission: post.activity_permission,
          activityValue: post.activity_value,
          createdAt: post.createdAt,
          userActivityId: post.user_activity_id,
          userId: post.user_id,
        }))
        yield put(updatePostData({ type: action.type, posts: postData }))
        break
      }
      case createStatusPostStart.type: {
        const formData = new FormData()
        const { file, text, activityPermission } = action.payload

        formData.append('file', file)
        formData.set('text', text)
        formData.set('activityPermission', activityPermission)

        const { data } = yield Dashboard.addPost({ data: formData })
        const postData = {
          activityCustom: data.activity_custom,
          activityPermission: data.activity_permission,
          activityValue: data.activity_value,
          createdAt: data.createdAt,
          userActivityId: data.user_activity_id,
          userId: data.user_id,
        }
        yield put(updatePostData({ type: action.type, newPost: postData }))
        yield put(createStatusPostSuccess())
        msg = 'Status has been sucessfully posted!'
        break
      }
      case DELETE_POST_STATUS: {
        const { userActivityId } = action.payload
        const { data } = yield Dashboard.deletePost({ userActivityId })
        yield put(updatePostData({ type: action.type, userActivityId: data.userActivityId }))
        msg = 'Posted status successfully deleted!'
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
  }
}

export default postDataCrudWatcherStart

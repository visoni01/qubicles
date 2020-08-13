import {
  takeLatest, put, delay, select,
} from 'redux-saga/effects'
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
        yield delay(8000)
        const { data } = yield Dashboard.fetchPosts()
        yield put(updatePostData({ type: action.type, posts: data }))
        break
      }
      case createStatusPostStart.type: {
        yield delay(8000)
        const formData = new FormData()
        const { file, text, activityPermission } = action.payload

        formData.append('file', file)
        formData.set('text', text)
        formData.set('activityPermission', activityPermission)

        const { data } = yield Dashboard.addPost({ data: formData })
        const { userDetails } = yield select((state) => state.login)
        yield put(updatePostData({ type: action.type, newPost: { ...data, owner: userDetails.full_name } }))
        yield put(createStatusPostSuccess())
        msg = 'Status has been sucessfully posted!'
        break
      }
      case DELETE_POST_STATUS: {
        const { userActivityId } = action.payload
        const { data } = yield Dashboard.deletePost({ userActivityId })
        yield put(updatePostData({ type: action.type, userActivityId: data.user_activity_id }))
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
  }
}

export default postDataCrudWatcherStart

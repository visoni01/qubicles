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
import Dashboard from '../../service/dashboard'

function* postDataCrudWatcherStart() {
  yield takeLatest([ postDataFechingStart.type, createStatusPostStart.type ], postDataFetchingWorker)
}

function* postDataFetchingWorker(action) {
  try {
    let msg
    switch (action.type) {
      case postDataFechingStart.type: {
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
        yield put(updatePostData({ type: action.type, newPost: data }))
        yield put(createStatusPostSuccess())
        msg = 'Status has been sucessfully posted!'
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

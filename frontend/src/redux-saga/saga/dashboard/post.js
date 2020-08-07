import { takeLatest, put } from 'redux-saga/effects'
import {
  postDataFechingStart,
  updatePostData,
  showErrorMessage,
} from '../../redux/actions'
import { ADD_POST } from '../../redux/constants'
import Dashboard from '../../service/dashboard'

function* postDataCrudWatcherStart() {
  yield takeLatest([ postDataFechingStart.type, ADD_POST ], postDataFetchingWorker)
}

function* postDataFetchingWorker(action) {
  try {
    switch (action.type) {
      case postDataFechingStart.type: {
        const { data } = yield Dashboard.fetchPosts()
        yield put(updatePostData({ type: action.type, posts: data }))
        break
      }
      case ADD_POST: {
        const { data } = yield Dashboard.addPost({ data: action.payload.data })
        yield put(updatePostData({ type: action.type, newPost: data }))
        break
      }
      default:
        break
    }
  } catch (e) {
    yield put(showErrorMessage({ msg: e }))
  }
}

export default postDataCrudWatcherStart

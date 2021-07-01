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
import {
  DELETE_POST_STATUS, UPDATE_POST, CREATE_NEW_POST, POST_DATA_FETCH,
} from '../../redux/constants'
import Dashboard from '../../service/dashboard'

function* postDataCrudWatcherStart() {
  yield takeLatest(
    [
      postDataFetchingStart.type,
      createStatusPostStart.type,
      DELETE_POST_STATUS,
      UPDATE_POST,
    ],
    postDataFetchingWorker,
  )
}

function* postDataFetchingWorker(action) {
  try {
    let msg
    switch (action.type) {
      case postDataFetchingStart.type: {
        const { ownerId } = action.payload

        const { data } = yield Dashboard.fetchPosts({ ownerId })
        yield put(updatePostData({ type: POST_DATA_FETCH, posts: data }))
        break
      }
      case createStatusPostStart.type: {
        const { file, text, activityPermission } = action.payload
        const { data } = yield Dashboard.addPost({ file, text, activityPermission })
        const { userDetails } = yield select((state) => state.login)
        const { settings } = yield select((state) => (
          state[ userDetails.user_code === 'employer' ? 'clientDetails' : 'agentDetails' ]
        ))

        yield put(updatePostData({
          type: CREATE_NEW_POST,
          newPost: {
            ...data,
            owner: {
              fullName: userDetails.full_name,
              userId: userDetails.user_id,
              profilePic: settings.profilePic,
            },
            isPostLiked: false,
            likesCount: 0,
            commentsCount: 0,
            comments: [],
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
      case UPDATE_POST: {
        const {
          file, text, removeCurrentImage, userActivityId, permission,
        } = action.payload
        const { data } = yield Dashboard.editPost({
          file,
          text,
          removeCurrentImage,
          userActivityId,
          permission,
        })
        yield put(updatePostData({
          type: action.type,
          editedPost: {
            ...data,
          },
        }))
        msg = 'Post has been sucessfully updated!'
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

    if (action.type === createStatusPostStart.type) {
      yield put(createStatusPostFailed())
    }
    if (action.type === postDataFetchingStart.type) {
      yield put(postDataFetchingFailed())
    }
  }
}

export default postDataCrudWatcherStart

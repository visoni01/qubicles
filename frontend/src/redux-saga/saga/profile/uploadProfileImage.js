import { takeEvery, put } from 'redux-saga/effects'
import {
  uploadProfileImageStart,
  uploadProfileImageFailed,
  uploadProfileImageSuccess,
  showErrorMessage,
} from '../../redux/actions'

import User from '../../service/user'

function* uploadProfileImageWatcher() {
  yield takeEvery(uploadProfileImageStart.type, uploadProfileImageWorker)
}

function* uploadProfileImageWorker(action) {
  try {
    const formData = new FormData()
    const { file } = action.payload
    formData.append('file', file)
    yield User.uploadProfileImage({ data: formData })
    yield put(uploadProfileImageSuccess())
  } catch (e) {
    yield put(showErrorMessage({ msg: e.errMsg }))
    yield put(uploadProfileImageFailed())
  }
}

export default uploadProfileImageWatcher

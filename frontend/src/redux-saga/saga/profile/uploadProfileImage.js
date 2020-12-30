import { takeEvery, put } from 'redux-saga/effects'
import {
  uploadProfileImageStart,
  uploadProfileImageFailed,
  uploadProfileImageSuccess,
  showErrorMessage,
  showSuccessMessage,
  updateCompanyProfileSettingsApiSuccess,
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
    const { data } = yield User.uploadProfileImage({ data: formData })
    yield put(uploadProfileImageSuccess())
    yield put(updateCompanyProfileSettingsApiSuccess({
      updatedDataType: 'profileImage',
      updatedData: { profilePic: data.profilePicUrl },
    }))
    yield put(showSuccessMessage({ msg: 'Profile Image Successfully Updated!' }))
  } catch (e) {
    yield put(showErrorMessage({ msg: e.errMsg }))
    yield put(uploadProfileImageFailed())
  }
}

export default uploadProfileImageWatcher

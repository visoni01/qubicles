import { takeLatest, put } from 'redux-saga/effects'
import {
  userDataFetchStart,
  userDataFetchSuccessful,
} from '../../redux/actions'
import { showErrorMessage } from '../../redux/utils/snackbar'
import UserProfile from '../../service/user'

function* userDataFetchingWatcherStart() {
  yield takeLatest(userDataFetchStart.type, userDataFetchingWorker)
}

function* userDataFetchingWorker(action) {
  try {
    const { userDetailsId } = action.payload
    const { data } = yield UserProfile.fetchUserData({ userDetailsId })
    yield put(userDataFetchSuccessful({ userData: data }))
  } catch (e) {
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default userDataFetchingWatcherStart

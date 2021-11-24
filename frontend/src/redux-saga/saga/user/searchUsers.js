import { put, takeEvery } from 'redux-saga/effects'
import apiClient from '../../../utils/apiClient'
import { userSearchStart, userSearchSuccessful, userSearchFailure } from '../../redux/actions'
import { showErrorMessage } from '../../redux/utils/snackbar'

function* searchUsersWatcher() {
  yield takeEvery(userSearchStart.type, searchUsersWorker)
}

function* searchUsersWorker(action) {
  try {
    const { searchString, offset } = action && action.payload
    const { data } = yield apiClient.searchUsers({ searchString, offset })
    yield put(
      userSearchSuccessful({ usersList: data.usersList, count: data.count }),
    )
  } catch (e) {
    yield put(showErrorMessage({ msg: e.errMsg }))
    yield put(userSearchFailure())
  }
}

export default searchUsersWatcher

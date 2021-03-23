import { takeEvery, put } from 'redux-saga/effects'
import {
  groupsFetchingStart,
  groupsFetchingSuccessful,
  groupsFetchingFailure,
} from '../../../redux/actions'

import Forum from '../../../service/forum'
import { showErrorMessage } from '../../../redux/utils/snackbar'

function* groupsFetchingWatcherStart() {
  yield takeEvery(groupsFetchingStart.type, groupsFetchingWorker)
}

function* groupsFetchingWorker() {
  try {
    const { data } = yield Forum.getAllGroups()
    yield put(groupsFetchingSuccessful({ groups: data && data.groups }))
  } catch (e) {
    yield put(showErrorMessage())
    yield put(groupsFetchingFailure())
  }
}

export default groupsFetchingWatcherStart

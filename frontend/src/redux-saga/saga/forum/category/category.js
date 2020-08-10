import { takeEvery, put } from 'redux-saga/effects'
import {
  categoryDataFetchingStart,
  categoryDataFetchingSuccessful,
  categoryDataFetchingFailure,
} from '../../../redux/actions'

import Forum from '../../../service/forum'
import { showErrorMessage } from '../../../redux/snackbar'

function* categoryDataFetchingWatcherStart() {
  yield takeEvery(categoryDataFetchingStart.type, categoryDataFetchingWorker)
}

function* categoryDataFetchingWorker(action) {
  try {
    const { data } = yield Forum.fetchCategories(action.payload)
    const { categories, count } = data
    yield put(categoryDataFetchingSuccessful({ categories, count }))
  } catch (e) {
    yield put(showErrorMessage())
    yield put(categoryDataFetchingFailure())
  }
}

export default categoryDataFetchingWatcherStart

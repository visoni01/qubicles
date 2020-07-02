import { takeEvery, put } from 'redux-saga/effects'
import {
  categoryDataFetchingStart,
  categoryDataFetchingSuccessful,
  categoryDataFetchingFailure,
} from '../../redux/actions'

import Forum from '../../service/forum'

function* categoryDataFetchingWatcherStart() {
  yield takeEvery(categoryDataFetchingStart.type, categoryDataFetchingWorker)
}

function* categoryDataFetchingWorker(action) {
  try {
    const categories = yield Forum.fetchCategories()
    yield put(categoryDataFetchingSuccessful({ categories }))
  } catch (e) {
    yield put(categoryDataFetchingFailure())
  }
}

export default categoryDataFetchingWatcherStart

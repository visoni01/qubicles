import { takeEvery, put } from 'redux-saga/effects'
import {
  jobCategoriesFetchStart,
  jobCategoriesFetchSuccessful,
  jobCategoriesFetchFailure,
} from '../../redux/actions'

import People from '../../service/people'

function* categoryDataFetchingWatcherStart() {
  yield takeEvery(jobCategoriesFetchStart.type, categoryDataFetchingWorker)
}

function* categoryDataFetchingWorker(action) {
  try {
    const jobCategories = yield People.fetchJobCategories()
    yield put(jobCategoriesFetchSuccessful({ jobCategories }))
  } catch (e) {
    yield put(jobCategoriesFetchFailure())
  }
}

export default categoryDataFetchingWatcherStart

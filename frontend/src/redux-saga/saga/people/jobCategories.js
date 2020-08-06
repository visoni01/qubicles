import { takeEvery, put } from 'redux-saga/effects'
import {
  jobCategoriesFetchStart,
  jobCategoriesFetchSuccessful,
} from '../../redux/actions'
import { showErrorMessage } from '../../redux/snackbar'
import People from '../../service/people'

function* categoryDataFetchingWatcherStart() {
  yield takeEvery(jobCategoriesFetchStart.type, categoryDataFetchingWorker)
}

function* categoryDataFetchingWorker(action) {
  try {
    const { searchKeyword } = action.payload
    const { data } = yield People.fetchJobCategories({ searchKeyword })
    yield put(jobCategoriesFetchSuccessful({ jobCategories: data }))
  } catch (e) {
    yield put(showErrorMessage({ msg: e }))
  }
}

export default categoryDataFetchingWatcherStart

import { takeEvery, put } from 'redux-saga/effects'
import {
  jobCategoriesOnlyFetchStart,
  jobCategoriesOnlyFetchSuccessful,
} from '../../../redux/actions'
import { showErrorMessage } from '../../../redux/snackbar'
import People from '../../../service/people'

function* jobCategoriesDataFetchingWatcherStart() {
  yield takeEvery(jobCategoriesOnlyFetchStart.type, jobCategoriesDataFetchingWorker)
}

function* jobCategoriesDataFetchingWorker(action) {
  try {
    const { searchKeyword } = action.payload
    const { data } = yield People.fetchJobCategoriesOnly({ searchKeyword })
    yield put(jobCategoriesOnlyFetchSuccessful({ jobCategoriesOnly: data }))
  } catch (e) {
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default jobCategoriesDataFetchingWatcherStart

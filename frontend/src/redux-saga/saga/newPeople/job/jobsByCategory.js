import { takeEvery, put } from 'redux-saga/effects'
import {
  newJobCategoriesFetchStart,
  newJobCategoriesFetchSuccessful,
} from '../../../redux/actions'
import { showErrorMessage } from '../../../redux/snackbar'
import People from '../../../service/people'

function* jobsByCategoryWatcherStart() {
  yield takeEvery([ newJobCategoriesFetchStart.type ], jobsByCategoryWorker)
}

function* jobsByCategoryWorker(action) {
  try {
    const { categoryId, searchKeyword } = action.payload
    const { data } = yield People.fetchJobCategoriesAndJobs({ categoryId, searchKeyword })
    yield put(newJobCategoriesFetchSuccessful({ newJobCategories: data }))
  } catch (e) {
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default jobsByCategoryWatcherStart

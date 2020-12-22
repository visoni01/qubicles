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
    const {
      categoryId, searchKeyword, status, clientId,
    } = action.payload
    const { data } = yield People.fetchJobCategoriesAndJobs({
      categoryId,
      searchKeyword,
      status: status === 'all' ? '' : status,
      clientId,
    })
    yield put(newJobCategoriesFetchSuccessful({ newJobCategories: data }))
  } catch (e) {
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default jobsByCategoryWatcherStart

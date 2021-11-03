import { takeEvery, put } from 'redux-saga/effects'
import { companiesListFetchStart, companiesListFetchSuccessful } from '../../../redux/actions'
import { showErrorMessage } from '../../../redux/utils/snackbar'
import User from '../../../service/user'

function* jobCategoriesDataFetchingWatcherStart() {
  yield takeEvery(companiesListFetchStart.type, jobCategoriesDataFetchingWorker)
}

function* jobCategoriesDataFetchingWorker() {
  try {
    const { data } = yield User.fetchCompaniesList()
    yield put(companiesListFetchSuccessful({ companiesList: data }))
  } catch (e) {
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default jobCategoriesDataFetchingWatcherStart

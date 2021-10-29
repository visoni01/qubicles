import { takeEvery, put } from 'redux-saga/effects'
import { companyDetails } from '../../../../containers/People/ContactCenter/Training/CompanyCourses/testData'
import { companiesListFetchStart, companiesListFetchSuccessful } from '../../../redux/actions'
import { showErrorMessage } from '../../../redux/utils/snackbar'

function* jobCategoriesDataFetchingWatcherStart() {
  yield takeEvery(companiesListFetchStart.type, jobCategoriesDataFetchingWorker)
}

function* jobCategoriesDataFetchingWorker() {
  try {
    const data = companyDetails
    yield put(companiesListFetchSuccessful({ companiesList: data }))
  } catch (e) {
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default jobCategoriesDataFetchingWatcherStart

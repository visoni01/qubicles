import { takeLatest, put } from 'redux-saga/effects'
import {
  jobPostCompanyDetailsFetchStart,
  jobPostCompanyDetailsFetchSuccessful,
} from '../../../redux/actions'
import { showErrorMessage } from '../../../redux/snackbar'
import People from '../../../service/people'

function* jobPostCompanyDataFetchingWatcherStart() {
  yield takeLatest(jobPostCompanyDetailsFetchStart.type, jobPostCompanyDataFetchingWorker)
}

function* jobPostCompanyDataFetchingWorker(action) {
  try {
    const { clientId } = action.payload
    const { data } = yield People.fetchJobPostCompanyDetails({ clientId })
    yield put(jobPostCompanyDetailsFetchSuccessful({ companyDetails: data }))
  } catch (e) {
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default jobPostCompanyDataFetchingWatcherStart

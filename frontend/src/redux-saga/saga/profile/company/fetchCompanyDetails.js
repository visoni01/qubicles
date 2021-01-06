import { takeLatest, put } from 'redux-saga/effects'
import {
  jobPostCompanyDetailsFetchStart,
  jobPostCompanyDetailsFetchSuccessful,
} from '../../../redux/actions'
import { showErrorMessage } from '../../../redux/snackbar'
import CompanyProfile from '../../../service/profile/company'

function* companyDataFetchingWatcherStart() {
  yield takeLatest(jobPostCompanyDetailsFetchStart.type, companyDataFetchingWorker)
}

function* companyDataFetchingWorker(action) {
  try {
    const { clientId } = action.payload
    const { data } = yield CompanyProfile.fetchCompanyDetails({ clientId })
    yield put(jobPostCompanyDetailsFetchSuccessful({ companyDetails: data }))
  } catch (e) {
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default companyDataFetchingWatcherStart

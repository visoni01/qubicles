import { takeEvery, put } from 'redux-saga/effects'
import _ from 'lodash'
import {
  jobPostCompanyDetailsFetchStart,
  jobPostCompanyDetailsFetchSuccessful,
} from '../../../redux/actions'
import { showErrorMessage } from '../../../redux/snackbar'
import People from '../../../service/people'

function* jobPostCompanyDataFetchingWatcherStart() {
  yield takeEvery(jobPostCompanyDetailsFetchStart.type, jobPostCompanyDataFetchingWorker)
}

function* jobPostCompanyDataFetchingWorker(action) {
  try {
    const { clientId } = action.payload
    debugger
    const { data } = yield People.fetchJobPostCompanyDetails({ clientId })
    yield put(jobPostCompanyDetailsFetchSuccessful({ companyDetails: data }))
  } catch (e) {
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default jobPostCompanyDataFetchingWatcherStart

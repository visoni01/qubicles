import { takeEvery, put } from 'redux-saga/effects'
import {
  updateCompanyTitleSummaryStart,
  updateCompanyTitleSummarySuccessful,
  updateCompanyTitleSummaryFailure,
  showErrorMessage,
} from '../../../redux/actions'

import CompanyProfile from '../../../service/profile/company'

function* updateCompanyTitleSummaryWatcher() {
  yield takeEvery(updateCompanyTitleSummaryStart.type, updateCompanyTitleSummaryWorker)
}

function* updateCompanyTitleSummaryWorker(action) {
  try {
    const { data } = action.payload
    debugger

    // const { response } = yield CompanyProfile.updateCompanyTitleSummary(data)
    // debugger
    // yield put(updateCompanyTitleSummarySuccessful({
    //   editCompanyData: response,
    // }))
  } catch (e) {
    yield put(showErrorMessage({ msg: e.errMsg }))
    yield put(updateCompanyTitleSummaryFailure())
  }
}

export default updateCompanyTitleSummaryWatcher

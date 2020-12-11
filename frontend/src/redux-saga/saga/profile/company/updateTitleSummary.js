import { takeEvery, put, select } from 'redux-saga/effects'
import {
  updateCompanyTitleSummaryStart,
  updateCompanyTitleSummaryFailure,
  showErrorMessage,
  showSuccessMessage,
  fetchCompanyProfileSettingsSuccessful,
  updateCompanyTitleSummarySuccessful,
} from '../../../redux/actions'

import CompanyProfile from '../../../service/profile/company'

function* updateCompanyTitleSummaryWatcher() {
  yield takeEvery(updateCompanyTitleSummaryStart.type, updateCompanyTitleSummaryWorker)
}

function* updateCompanyTitleSummaryWorker(action) {
  try {
    const data = action.payload
    const response = yield CompanyProfile.updateCompanyTitleSummary({ data })
    const { settings } = yield select((state) => state.companyProfileSettings)
    yield put(fetchCompanyProfileSettingsSuccessful({
      companySettings: {
        ...settings,
        title: response.data.title,
        summary: response.data.summary,
      },
    }))
    yield put(updateCompanyTitleSummarySuccessful())
    const msg = 'Title and Summary succesfully updated!'
    yield put(showSuccessMessage({ msg }))
  } catch (e) {
    yield put(showErrorMessage({ msg: e.errMsg }))
    yield put(updateCompanyTitleSummaryFailure())
  }
}

export default updateCompanyTitleSummaryWatcher

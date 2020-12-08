import { takeEvery, put } from 'redux-saga/effects'
import {
  fetchCompanyProfileSettingsStart,
  fetchCompanyProfileSettingsSuccessful,
  fetchCompanyProfileSettingsFailure,
  showErrorMessage,
} from '../../../redux/actions'

import CompanyProfile from '../../../service/profile/company'

function* fetchCompanyProfileWatcher() {
  yield takeEvery(fetchCompanyProfileSettingsStart.type, fetchCompanyProfileWorker)
}

function* fetchCompanyProfileWorker() {
  try {
    const { data } = yield CompanyProfile.fetchCompanyProfileSettings()
    yield put(fetchCompanyProfileSettingsSuccessful({
      companySettings: data,
    }))
  } catch (e) {
    yield put(showErrorMessage({ msg: e.errMsg }))
    yield put(fetchCompanyProfileSettingsFailure())
  }
}

export default fetchCompanyProfileWatcher

import { takeEvery, put } from 'redux-saga/effects'
import {
  updateCompanyProfileSettingsStart,
  updateCompanyProfileSettingsSuccessful,
  showErrorMessage,
} from '../../../redux/actions'

import CompanyProfile from '../../../service/profile/company'

function* updateCompanyProfileWatcher() {
  yield takeEvery(updateCompanyProfileSettingsStart.type, updateCompanyProfileWorker)
}

function* updateCompanyProfileWorker(action) {
  try {
    const { updatedDataType, updatedData } = action.payload
    const { data } = yield CompanyProfile.updateCompanyProfileSettings({ updatedDataType, updatedData })

    yield put(updateCompanyProfileSettingsSuccessful({ updatedSettings: updatedData }))
  } catch (e) {
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default updateCompanyProfileWatcher

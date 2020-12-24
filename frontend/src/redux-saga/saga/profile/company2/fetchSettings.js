import { put, takeEvery } from 'redux-saga/effects'
import {
  getCompanyProfileSettingsApiStart,
  getCompanyProfileSettingsApiSuccess,
  getCompanyProfileSettingsApiFailure,
  updateCompanyProfileSettingsApiStart,
  updateCompanyProfileSettingsApiSuccess,
  updateCompanyProfileSettingsApiFailure,

  showErrorMessage,
} from '../../../redux/actions'
import CompanyProfile from '../../../service/profile/company'

function* companyProfileWatcher() {
  yield takeEvery([
    getCompanyProfileSettingsApiStart.type,
    updateCompanyProfileSettingsApiStart.type,
  ], companyProfileWorker)
}

function* companyProfileWorker(action) {
  try {
    switch (action.type) {
      case getCompanyProfileSettingsApiStart.type: {
        const { data } = yield CompanyProfile.fetchCompanyProfileSettings()
        yield put(getCompanyProfileSettingsApiSuccess({ clientDetails: data }))
        break
      }
      case updateCompanyProfileSettingsApiStart.type: {
        const { updatedDataType, updatedData } = action.payload
        yield CompanyProfile.updateCompanyProfileSettings({ updatedDataType, updatedData })
        yield put(updateCompanyProfileSettingsApiSuccess({ updatedDataType, updatedData }))
        break
      }
      default: break
    }
  } catch (e) {
    switch (action.type) {
      case getCompanyProfileSettingsApiStart.type: {
        yield put(getCompanyProfileSettingsApiFailure())
        break
      }
      case updateCompanyProfileSettingsApiStart.type: {
        yield put(updateCompanyProfileSettingsApiFailure())
        break
      }

      default: break
    }
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default companyProfileWatcher

import { takeEvery, put, select } from 'redux-saga/effects'
import _ from 'lodash'
import {
  updateCompanyProfileSettingsStart,
  updateCompanyProfileSettingsSuccessful,
  updateCompanyProfileSettingsFailure,
  showErrorMessage,
  showSuccessMessage,
  fetchCompanyProfileSettingsSuccessful,
} from '../../../redux/actions'

import CompanyProfile from '../../../service/profile/company'

function* updateCompanyProfileWatcher() {
  yield takeEvery(updateCompanyProfileSettingsStart.type, updateCompanyProfileWorker)
}

function* updateCompanyProfileWorker(action) {
  try {
    const { updatedDataType, updatedData } = action.payload
    const { data } = yield CompanyProfile.updateCompanyProfileSettings({ updatedDataType, updatedData })

    yield put(showSuccessMessage({ msg: `${ _.capitalize(data.updatedDataType) } Changed Successfully` }))
    const { settings } = yield select((state) => state.companyProfileSettings)
    if ([ 'address', 'smsNotification', 'emailNotification', 'number', 'website' ].includes(updatedDataType)) {
      yield put(fetchCompanyProfileSettingsSuccessful({
        companySettings: {
          ...settings,
          ...updatedData,
        },
      }))
    }
    yield put(showSuccessMessage({ msg: _.capitalize(`${ updatedDataType } changed successfully`) }))
    yield put(updateCompanyProfileSettingsSuccessful())
  } catch (e) {
    yield put(updateCompanyProfileSettingsFailure())
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default updateCompanyProfileWatcher

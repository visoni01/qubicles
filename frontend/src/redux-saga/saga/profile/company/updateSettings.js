import { takeEvery, put } from 'redux-saga/effects'
import _ from 'lodash'
import {
  updateCompanyProfileSettingsStart,
  updateCompanyProfileSettingsSuccessful,
  updateCompanyProfileSettingsFailure,
  updateCompanyProfileSettings,
  showErrorMessage,
  showSuccessMessage,
} from '../../../redux/actions'

import CompanyProfile from '../../../service/profile/company'

function* updateCompanyProfileWatcher() {
  yield takeEvery(updateCompanyProfileSettingsStart.type, updateCompanyProfileWorker)
}

function* updateCompanyProfileWorker(action) {
  try {
    const { updatedDataType, updatedData } = action.payload
    yield put(updateCompanyProfileSettings({ updatedDataType, updatedData }))

    const { data } = yield CompanyProfile.updateCompanyProfileSettings({ updatedDataType, updatedData })

    yield put(updateCompanyProfileSettingsSuccessful())
    switch (data.updatedDataType) {
      case 'email': {
        break
      }
      default: {
        yield put(showSuccessMessage({ msg: _.capitalize(`${ data.updatedDataType } changed successfully`) }))
      }
    }
  } catch (e) {
    yield put(updateCompanyProfileSettingsFailure({ message: e.errMsg }))
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default updateCompanyProfileWatcher

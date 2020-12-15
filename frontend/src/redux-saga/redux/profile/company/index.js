import settingsReducer from './fetchSettings'
import updateSettingsReducer from './updateSettings'
import updateTitleSummaryReducer from './updateTitleSummary'
import uploadProfileImageReducer from '../uploadProfileImage'

const companyProfile = {
  companyProfileSettings: settingsReducer,
  updateTitleSummary: updateTitleSummaryReducer,
  uploadProfileImage: uploadProfileImageReducer,
  updateCompanyProfileSettings: updateSettingsReducer,
}

export default companyProfile

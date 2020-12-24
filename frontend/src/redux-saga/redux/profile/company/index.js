import settingsReducer from './fetchSettings'
import updateSettingsReducer from './updateSettings'
import updateTitleSummaryReducer from './updateTitleSummary'
import uploadProfileImageReducer from '../uploadProfileImage'
import clientDetailsReducer from '../company2/profileSettings'

const companyProfile = {
  companyProfileSettings: settingsReducer,
  updateTitleSummary: updateTitleSummaryReducer,
  uploadProfileImage: uploadProfileImageReducer,
  updateCompanyProfileSettings: updateSettingsReducer,
  clientDetails: clientDetailsReducer,
}

export default companyProfile

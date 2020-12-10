import settingsReducer from './fetchSettings'
import updateTitleSummaryReducer from './updateTitleSummary'
import uploadProfileImageReducer from '../uploadProfileImage'

const companyProfile = {
  companyProfileSettings: settingsReducer,
  updateTitleSummary: updateTitleSummaryReducer,
  uploadProfileImage: uploadProfileImageReducer,
}

export default companyProfile

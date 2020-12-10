import settings from './settings'
import updateTitleSummaryReducer from './updateTitleSummary'
import uploadProfileImageReducer from '../uploadProfileImage'

const companyProfile = {
  companyProfileSettings: settings,
  updateTitleSummary: updateTitleSummaryReducer,
  uploadProfileImage: uploadProfileImageReducer,
}

export default companyProfile

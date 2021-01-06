import uploadProfileImageReducer from '../uploadProfileImage'
import clientDetailsReducer from './profileSettings'
import companyDetailsForProfileReducer from './fetchCompanyDetails'

const companyProfile = {
  uploadProfileImage: uploadProfileImageReducer,
  clientDetails: clientDetailsReducer,
  companyDetailsForProfile: companyDetailsForProfileReducer,
}

export default companyProfile

import uploadProfileImageReducer from '../uploadProfileImage'
import clientDetailsReducer from './profileSettings'

const companyProfile = {
  uploadProfileImage: uploadProfileImageReducer,
  clientDetails: clientDetailsReducer,
}

export default companyProfile

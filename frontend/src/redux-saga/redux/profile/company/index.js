import uploadProfileImageReducer from '../uploadProfileImage'
import clientDetailsReducer from './profileSettings'
import companyDetailsForProfileReducer from './fetchCompanyDetails'
import clientReviewsReducer from '../review/clientReview'

const companyProfile = {
  uploadProfileImage: uploadProfileImageReducer,
  clientDetails: clientDetailsReducer,
  companyDetailsForProfile: companyDetailsForProfileReducer,
  companyReviews: clientReviewsReducer,
}

export default companyProfile

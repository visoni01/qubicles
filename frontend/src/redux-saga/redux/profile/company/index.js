import uploadProfileImageReducer from '../uploadProfileImage'
import clientDetailsReducer from './profileSettings'
import companyDetailsForProfileReducer from './fetchCompanyDetails'
import clientReviewsReducer from '../review/clientReview'
import clientRatingsReducer from '../review/clientRatings'

const companyProfile = {
  uploadProfileImage: uploadProfileImageReducer,
  clientDetails: clientDetailsReducer,
  companyDetailsForProfile: companyDetailsForProfileReducer,
  companyReviews: clientReviewsReducer,
  companyRatings: clientRatingsReducer,
}

export default companyProfile

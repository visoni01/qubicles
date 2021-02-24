import uploadProfileImageReducer from '../uploadProfileImage'
import clientDetailsReducer from './profileSettings'
import companyDetailsForProfileReducer from './fetchCompanyDetails'
import profileReviewsReducer from '../review/profileReview'
import profileRatingsReducer from '../review/profileRatings'

const companyProfile = {
  uploadProfileImage: uploadProfileImageReducer,
  clientDetails: clientDetailsReducer,
  companyDetailsForProfile: companyDetailsForProfileReducer,
  profileReviews: profileReviewsReducer,
  profileRatings: profileRatingsReducer,
}

export default companyProfile

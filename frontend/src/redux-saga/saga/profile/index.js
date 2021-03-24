import uploadProfileImage from './uploadProfileImage'
import companyProfileSettings from './company/fetchSettings'
import fetchCompanyDetails from './company/fetchCompanyDetails'
import profileReviews from './reviews/profileReviews'
import profileRatings from './reviews/profileRatings'

const profileWatcherFunctions = [
  () => companyProfileSettings(),
  () => uploadProfileImage(),
  () => fetchCompanyDetails(),
  () => profileReviews(),
  () => profileRatings(),

]

export default profileWatcherFunctions

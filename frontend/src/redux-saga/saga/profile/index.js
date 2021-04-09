import uploadProfileImage from './uploadProfileImage'
import companyProfileSettings from './company/fetchSettings'
import fetchCompanyDetails from './company/fetchCompanyDetails'
import profileReviews from './reviews/profileReviews'
import profileRatings from './reviews/profileRatings'
import agentProfileSettings from './agent/fetchSettings'

const profileWatcherFunctions = [
  () => companyProfileSettings(),
  () => agentProfileSettings(),
  () => uploadProfileImage(),
  () => fetchCompanyDetails(),
  () => profileReviews(),
  () => profileRatings(),

]

export default profileWatcherFunctions

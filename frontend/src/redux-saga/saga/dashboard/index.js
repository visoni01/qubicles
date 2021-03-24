import announcement from './announcement'
import communityRep from './communityRep'
import jobPosting from './jobPosting'
import post from './post'
import activeUser from './activeUser'
import statusPostActivity from './statusPostActivity'

const dashboardWatcherFunctions = [
  () => announcement(),
  () => communityRep(),
  () => jobPosting(),
  () => activeUser(),
  () => post(),
  () => statusPostActivity(),
]

export default dashboardWatcherFunctions

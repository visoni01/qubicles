import { all } from 'redux-saga/effects'

import signup from './signup'
import emailVerification from './emailVerification'
import postSignup from './postSignup'
import inviteRequest from './invitepage'
import login from './login'
import dashboard from './dashboard'
import announcement from './dashboard/announcement'
import communityRep from './dashboard/communityRep'
import jobPosting from './dashboard/jobPosting'
import activeUser from './dashboard/activeUser'
import categories from './forum/category'
import channel from './forum/channel'
import topic from './forum/topic'
import topicActivity from './forum/topicActivity'
import jobCategoryDataActivity from './people/jobCategories'

export default function* rootSaga() {
  yield all([
    signup(),
    emailVerification(),
    postSignup(),
    inviteRequest(),
    login(),
    dashboard(),
    announcement(),
    communityRep(),
    jobPosting(),
    activeUser(),
    categories(),
    channel(),
    topic(),
    topicActivity(),
    jobCategoryDataActivity(),
  ])
}

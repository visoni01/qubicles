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
import categories from './forum/category/category'
import channel from './forum/channel/channelDetails'
import channelTopicsList from './forum/channel/channelTopicsList'
import topic from './forum/topic/topic'
import jobCategoryDataActivity from './people/jobCategories'
import crudCategory from './forum/category/crud'
import crudChannel from './forum/channel/crud'
import crudTopic from './forum/topic/crud'
import crudComment from './forum/comment/crud'
import crudJob from './people/crud'

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
    channelTopicsList(),
    topic(),
    jobCategoryDataActivity(),
    crudCategory(),
    crudChannel(),
    crudTopic(),
    crudComment(),
    crudJob(),
  ])
}

import { all } from 'redux-saga/effects'

import signup from './signup'
import emailVerification from './emailVerification'
import postSignup from './postSignup'
import login from './login'
import dashboard from './dashboard'
import announcement from './dashboard/announcement'
import communityRep from './dashboard/communityRep'
import jobPosting from './dashboard/jobPosting'
import post from './dashboard/post'
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
import getAllGroups from './forum/groups/getAll'
import crudGroups from './forum/groups/crud'
import crudJob from './people/crud'
import statusPostActivity from './dashboard/statusPostActivity'
import jobDetails from './people/job'
import checkrInvitation from './user/checkrAuthentication'
import sendVerificationMail from './sendVerificationMail'
import signupWithInvite from './inviteDetails'
import forgetPassword from './forgetPassword'
import resetPassword from './resetPassword'

export default function* rootSaga() {
  yield all([
    signup(),
    emailVerification(),
    postSignup(),
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
    getAllGroups(),
    crudGroups(),
    jobCategoryDataActivity(),
    crudCategory(),
    crudChannel(),
    crudTopic(),
    crudComment(),
    crudJob(),
    post(),
    statusPostActivity(),
    jobDetails(),
    checkrInvitation(),
    sendVerificationMail(),
    signupWithInvite(),
    forgetPassword(),
    resetPassword(),
  ])
}

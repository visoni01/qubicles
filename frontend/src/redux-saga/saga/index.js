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
import jobCategoryDataActivity from './people/jobCategories'
import getAllGroups from './forum/groups/getAll'
import crudGroups from './forum/groups/crud'
import groupTopics from './forum/groupTopics/getAll'
import topicComments from './forum/topicComments/getAll'
import crudTopicComments from './forum/topicComments/crud'
import crudGroupTopics from './forum/groupTopics/crud'
import GroupTopicActivity from './forum/groupTopics/activity'
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
    getAllGroups(),
    crudGroups(),
    groupTopics(),
    topicComments(),
    crudTopicComments(),
    crudGroupTopics(),
    GroupTopicActivity(),
    jobCategoryDataActivity(),
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

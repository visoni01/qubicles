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
import getAllGroups from './forum/groups/getAll'
import crudGroups from './forum/groups/crud'
import groupTopics from './forum/groupTopics/getAll'
import topicComments from './forum/topicComments/getAll'
import crudTopicComments from './forum/topicComments/crud'
import crudGroupTopics from './forum/groupTopics/crud'
import GroupTopicActivity from './forum/groupTopics/activity'
import statusPostActivity from './dashboard/statusPostActivity'
import checkrInvitation from './user/checkrAuthentication'
import sendVerificationMail from './sendVerificationMail'
import signupWithInvite from './inviteDetails'
import forgetPassword from './forgetPassword'
import resetPassword from './resetPassword'
import peopleTalentCards from './newPeople/talent/talentCards'
import peopleAgentResumeSkills from './newPeople/talent/agentResumeSkills'
import newCrudJob from './newPeople/crud'
import newJobDetails from './newPeople/job'
import newJobCategoryDataActivity from './newPeople/jobCategories'
import jobsByCategory from './newPeople/jobsByCategory'
import jobPostCompanyDetails from './newPeople/job/jobPostCompanyDetails'
import updateTalentCards from './newPeople/talent/updateTalentCard'
import jobSkills from './newPeople/jobSkills'
import agentResume from './newPeople/talent/agentResume'

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
    post(),
    statusPostActivity(),
    checkrInvitation(),
    sendVerificationMail(),
    signupWithInvite(),
    forgetPassword(),
    resetPassword(),
    peopleTalentCards(),
    peopleAgentResumeSkills(),
    newCrudJob(),
    newJobDetails(),
    newJobCategoryDataActivity(),
    jobsByCategory(),
    jobPostCompanyDetails(),
    updateTalentCards(),
    jobSkills(),
    agentResume(),
  ])
}

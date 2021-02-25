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
import handleInvite from './invitePage'
import forgetPassword from './forgetPassword'
import resetPassword from './resetPassword'
import peopleTalentCards from './people/talent/talentCards'
import peopleAgentResumeSkills from './people/talent/agentResumeSkills'
import crudJob from './people/job/crud'
import jobDetails from './people/job/job'
import jobsByCategory from './people/job/jobsByCategory'
import updateTalentCards from './people/talent/updateTalentCard'
import jobSkills from './people/jobSkills'
import agentResume from './people/talent/agentResume'
import jobCategoriesOnly from './people/job/jobCategoriesOnly'
import uploadProfileImage from './profile/uploadProfileImage'
import companyProfileSettings from './profile/company/fetchSettings'
import fetchCompanyDetails from './profile/company/fetchCompanyDetails'
import companyReviews from './profile/reviews/companyReviews'
import companyRatings from './profile/reviews/companyRatings'
import fetchAgentJobs from './people/agent/job/fetchJobs'
import fetchTopCompanies from './people/agent/job/fetchTopCompanies'

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
    handleInvite(),
    forgetPassword(),
    resetPassword(),
    peopleTalentCards(),
    peopleAgentResumeSkills(),
    crudJob(),
    jobDetails(),
    jobsByCategory(),
    updateTalentCards(),
    jobSkills(),
    agentResume(),
    companyProfileSettings(),
    jobCategoriesOnly(),
    uploadProfileImage(),
    fetchCompanyDetails(),
    companyReviews(),
    companyRatings(),
    fetchAgentJobs(),
    fetchTopCompanies(),
  ])
}

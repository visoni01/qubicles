import { all } from 'redux-saga/effects'

import emailVerification from './auth/emailVerification'
import checkrInvitation from './auth/checkrAuthentication'
import sendVerificationMail from './auth/sendVerificationMail'
import signupWithInvite from './auth/inviteDetails'
import forgetPassword from './auth/forgetPassword'
import resetPassword from './auth/resetPassword'
import signup from './user/signup'
import postSignup from './user/postSignup'
import login from './user/login'
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
import handleInvite from './user/invitePage'
import peopleTalentCards from './people/talent/talentCards'
import peopleAgentResumeSkills from './people/talent/agentResumeSkills'
import crudJob from './people/job/crud'
import jobDetails from './people/job/job'
import jobsByCategory from './people/job/jobsByCategory'
import jobSkills from './people/jobSkills'
import agentResume from './people/talent/agentResume'
import jobCategoriesOnly from './people/job/jobCategoriesOnly'
import uploadProfileImage from './profile/uploadProfileImage'
import companyProfileSettings from './profile/company/fetchSettings'
import fetchCompanyDetails from './profile/company/fetchCompanyDetails'
import fetchAgentJobs from './people/agent/job/fetchJobs'
import fetchTopCompanies from './people/agent/job/fetchTopCompanies'
import profileReviews from './profile/reviews/profileReviews'
import profileRatings from './profile/reviews/profileRatings'
import jobApplication from './people/application/jobApplication'
import jobApplicationList from './people/application/jobApplicationList'
import agentJobApplications from './people/application/agentJobApplications'

export default function* rootSaga() {
  yield all([
    signup(),
    emailVerification(),
    checkrInvitation(),
    sendVerificationMail(),
    signupWithInvite(),
    forgetPassword(),
    resetPassword(),
    postSignup(),
    login(),
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
    handleInvite(),
    // People Section
    peopleTalentCards(),
    peopleAgentResumeSkills(),
    crudJob(),
    jobDetails(),
    jobsByCategory(),
    jobSkills(),
    agentResume(),
    jobCategoriesOnly(),
    fetchAgentJobs(),
    fetchTopCompanies(),
    jobApplication(),
    jobApplicationList(),
    agentJobApplications(),
    // Profile Section
    companyProfileSettings(),
    uploadProfileImage(),
    fetchCompanyDetails(),
    profileReviews(),
    profileRatings(),
  ])
}

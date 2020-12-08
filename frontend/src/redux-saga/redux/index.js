import { combineReducers } from '@reduxjs/toolkit'
import signupReducer from './signup'
import emailVerificationReducer from './emailVerification'
import postSignUpReducer from './postSignup'
import invitePageReducer from './invitePage'
import loginReducer from './login'
import announcementReducer from './dashboard/announcement'
import communityRepReducer from './dashboard/communityRep'
import jobPostingReducer from './dashboard/jobPosting'
import activeUserReducer from './dashboard/activeUser'
import getPostsReducer from './dashboard/post/getPosts'
import createPostReducer from './dashboard/post/create'
import commentsReducer from './dashboard/post/comments'
import commentsSectionReducer from './dashboard/post/commentsSection'
import dashboardReducer from './dashboard'
import loaderReducer from './loader'
import snackbarReducer from './snackbar'
import groupsReducer from './forum/groups'
import groupTopicsReducer from './forum/groupTopics'
import topicCommentsReducer from './forum/topicComments'
import checkrAuthentication from './user/checkrAuthentication'
import sendVerificationMail from './sendVerificationMail'
import signupWithInviteReducer from './inviteDetails'
import forgetPasswordMailReducer from './forgetPasswordMail'
import resetPasswordReducer from './resetPassword'
import peopleReducers from './newPeople/reducers'
import companyProfile from './profile/company'

const rootReducer = combineReducers({
  signup: signupReducer,
  emailVerification: emailVerificationReducer,
  postSignUp: postSignUpReducer,
  invitePage: invitePageReducer,
  login: loginReducer,
  dashboad: dashboardReducer,
  announcement: announcementReducer,
  loader: loaderReducer,
  snackbar: snackbarReducer,
  communityRep: communityRepReducer,
  jobPosting: jobPostingReducer,
  activeUser: activeUserReducer,
  groups: groupsReducer,
  groupTopics: groupTopicsReducer,
  topicComments: topicCommentsReducer,
  statusPosts: getPostsReducer,
  createPost: createPostReducer,
  commentsSection: commentsSectionReducer,
  comments: commentsReducer,
  checkr: checkrAuthentication,
  verification: sendVerificationMail,
  signupWithInvite: signupWithInviteReducer,
  forgetPasswordMail: forgetPasswordMailReducer,
  resetPassword: resetPasswordReducer,
  ...peopleReducers,
  ...companyProfile,
})

export default rootReducer

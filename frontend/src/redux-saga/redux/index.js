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
import commentsSectionReducer from './dashboard/post/commentsSection'
import dashboardReducer from './dashboard'
import loaderReducer from './loader'
import snackbarReducer from './snackbar'
import categoryReducer from './forum/category'
import channelDetailsReducer from './forum/channel/channelDetails'
import channelTopicsListReducer from './forum/channel/channelTopicsList'
import topicReducer from './forum/topic'
import jobCategoriesReducer from './people/jobPage'

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
  category: categoryReducer,
  channel: channelDetailsReducer,
  channelTopicsList: channelTopicsListReducer,
  topic: topicReducer,
  jobCategories: jobCategoriesReducer,
  statusPosts: getPostsReducer,
  createPost: createPostReducer,
  commentsSection: commentsSectionReducer,
})

export default rootReducer

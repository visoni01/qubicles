import { combineReducers } from '@reduxjs/toolkit'
import authReducers from './auth'
import userReducers, { clearStore } from './user'
import companyStatsReducers from './dashboard/companyStats'
import postsReducer from './dashboard/post'
import forumReducers from './forum'
import peopleReducers from './people'
import companyProfileReducers from './profile/company'
import agentProfileReducers from './profile/agent'
import commonProfileReducers from './profile/common'
import profileReviewsReducers from './profile/review'
import utilsReducers from './utils'
import chatReducers from './chat'

const appReducer = combineReducers({

  // Auth Reducers
  ...authReducers,

  // User Reducers
  ...userReducers,

  // Dashboard Reducers
  ...companyStatsReducers,
  ...postsReducer,

  // Forum Reducers
  ...forumReducers,

  // Utils Reducers
  ...utilsReducers,

  // People Reducers
  ...peopleReducers,

  // Profile Reducers
  ...agentProfileReducers,
  ...companyProfileReducers,
  ...commonProfileReducers,
  ...profileReviewsReducers,

  // Chat Reducers
  ...chatReducers,

})

const rootReducer = (state, action) => {
  if (action.type === clearStore.type) {
    // Reference link: https://stackoverflow.com/a/35641992
    return appReducer(undefined, action)
  }

  return appReducer(state, action)
}

export default rootReducer

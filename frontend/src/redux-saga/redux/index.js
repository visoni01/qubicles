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

})

const rootReducer = (state, action) => {
  if (action.type === clearStore.type) {
    return appReducer(undefined, action)
  }

  return appReducer(state, action)
}

export default rootReducer

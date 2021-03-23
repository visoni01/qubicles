import { combineReducers } from '@reduxjs/toolkit'
import authReducers from './auth'
import userReducers from './user'
import companyStatsReducers from './dashboard/companyStats'
import postsReducer from './dashboard/post'
import forumReducers from './forum'
import peopleReducers from './people'
import companyProfileReducers from './profile/company'
import commonProfileReducers from './profile/common'
import profileReviewsReducers from './profile/review'
import utilsReducers from './utils'

const rootReducer = combineReducers({

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
  ...companyProfileReducers,
  ...commonProfileReducers,
  ...profileReviewsReducers,

})

export default rootReducer

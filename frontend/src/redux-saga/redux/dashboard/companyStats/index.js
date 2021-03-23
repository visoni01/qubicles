import announcementReducer from './announcement'
import communityRepReducer from './communityRep'
import jobPostingReducer from './jobPosting'
import activeUserReducer from './activeUser'

const companyStatsReducers = {
  announcement: announcementReducer,
  communityRep: communityRepReducer,
  jobPosting: jobPostingReducer,
  activeUser: activeUserReducer,
}

export default companyStatsReducers
export * from './announcement'
export * from './jobPosting'
export * from './activeUser'
export * from './communityRep'

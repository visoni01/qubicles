import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../../utils/common'

const initialState = {
  isCompanyDetailsLoading: null,
  error: null,
  success: false,
  companyDetails: {},
}

const {
  actions: {
    jobPostCompanyDetailsFetchStart,
    jobPostCompanyDetailsFetchSuccessful,
    jobPostCompanyDetailsFetchFailure,
    resetCompanyDetails,
    updateJobPostCompanyDetails,
  },
  reducer,
} = createSlice({
  name: 'jobPostCompanyDetails',
  initialState,
  reducers: {
    jobPostCompanyDetailsFetchStart: (state) => ({
      ...state,
      success: false,
      isCompanyDetailsLoading: true,
    }),
    jobPostCompanyDetailsFetchSuccessful: (state, action) => ({
      ...state,
      success: true,
      isCompanyDetailsLoading: false,
      companyDetails: getDataForReducer(action, initialState.companyDetails, 'companyDetails'),
    }),
    jobPostCompanyDetailsFetchFailure: (state) => ({
      ...state,
      error: true,
      isCompanyDetailsLoading: false,
    }),
    resetCompanyDetails: () => ({
      ...initialState,
    }),
    updateJobPostCompanyDetails: (state) => ({
      ...state,
      success: true,
      isCompanyDetailsLoading: false,
      companyDetails: {
        ...state.companyDetails,
        isFollowing: state.companyDetails && !state.companyDetails.isFollowing,
      },
    }),
  },
})

export default reducer
export {
  jobPostCompanyDetailsFetchStart,
  jobPostCompanyDetailsFetchSuccessful,
  jobPostCompanyDetailsFetchFailure,
  resetCompanyDetails,
  updateJobPostCompanyDetails,
}

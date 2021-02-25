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
  },
  reducer,
} = createSlice({
  name: 'jobPostCompanyDetails',
  initialState,
  reducers: {
    jobPostCompanyDetailsFetchStart: () => ({
      ...initialState,
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
    resetCompanyDetails: (state) => ({
      ...state,
      companyDetails: {},
      error: true,
      isCompanyDetailsLoading: false,
    }),
  },
})

export default reducer
export {
  jobPostCompanyDetailsFetchStart,
  jobPostCompanyDetailsFetchSuccessful,
  jobPostCompanyDetailsFetchFailure,
  resetCompanyDetails,

}

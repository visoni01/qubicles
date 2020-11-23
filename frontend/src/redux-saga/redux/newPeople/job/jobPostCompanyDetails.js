import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../../utils/common'

const initialState = {
  isLoading: null,
  error: null,
  success: false,
  companyDetails: {},
}

const {
  actions: {
    jobPostCompanyDetailsFetchStart,
    jobPostCompanyDetailsFetchSuccessful,
    jobPostCompanyDetailsFetchFailure,
  },
  reducer,
} = createSlice({
  name: 'jobPostCompanyDetails',
  initialState,
  reducers: {
    jobPostCompanyDetailsFetchStart: () => ({
      ...initialState,
      isLoading: true,
    }),
    jobPostCompanyDetailsFetchSuccessful: (state, action) => ({
      ...state,
      success: true,
      isLoading: false,
      companyDetails: getDataForReducer(action, initialState.companyDetails, 'companyDetails'),
    }),
    jobPostCompanyDetailsFetchFailure: (state, action) => ({
      ...state,
      error: true,
      isLoading: false,
    }),
  },
})

export default reducer
export {
  jobPostCompanyDetailsFetchStart,
  jobPostCompanyDetailsFetchSuccessful,
  jobPostCompanyDetailsFetchFailure,
}

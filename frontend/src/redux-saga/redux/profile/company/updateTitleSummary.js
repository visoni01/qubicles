import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: null,
  error: null,
  success: null,
}

const {
  actions: {
    updateCompanyTitleSummaryStart,
    updateCompanyTitleSummarySuccessful,
    updateCompanyTitleSummaryFailure,
  },
  reducer,
} = createSlice({
  name: 'updateCompanyTitleSummary',
  initialState,
  reducers: {
    updateCompanyTitleSummaryStart: (state) => ({
      ...state,
      isLoading: true,
      success: false,
    }),
    updateCompanyTitleSummarySuccessful: (state) => ({
      ...state,
      success: true,
      isLoading: false,
    }),
    updateCompanyTitleSummaryFailure: (state) => ({
      ...state,
      error: true,
      isLoading: false,
      success: false,
    }),
  },
})

export default reducer
export {
  updateCompanyTitleSummaryStart,
  updateCompanyTitleSummarySuccessful,
  updateCompanyTitleSummaryFailure,
}

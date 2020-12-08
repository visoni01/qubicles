import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../../utils/common'

const initialState = {
  isLoading: null,
  error: null,
  success: null,
  editCompanyData: {},
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
    updateCompanyTitleSummarySuccessful: (state, action) => ({
      ...state,
      success: true,
      isLoading: false,
      editCompanyData: getDataForReducer(action, initialState, 'editCompanyData'),
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

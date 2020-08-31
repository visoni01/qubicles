import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../utils/common'
import { getUpdatedJobsData } from '../helper'

const initialState = {
  isLoading: null,
  error: null,
  success: false,
  jobCategories: [],
}

const {
  actions: {
    jobCategoriesFetchStart,
    jobCategoriesFetchSuccessful,
    jobCategoriesFetchFailure,
    updateJobsData,
  },
  reducer,
} = createSlice({
  name: 'jobCategories',
  initialState,
  reducers: {
    jobCategoriesFetchStart: () => ({
      ...initialState,
      isLoading: true,
    }),
    jobCategoriesFetchSuccessful: (state, action) => ({
      ...state,
      success: true,
      isLoading: false,
      jobCategories: getDataForReducer(action, initialState.jobCategories, 'jobCategories'),
    }),
    jobCategoriesFetchFailure: (state, action) => ({
      ...initialState,
      error: true,
      isLoading: false,
    }),
    updateJobsData: (state, action) => ({
      ...state,
      jobCategories: getUpdatedJobsData({ state, payload: action.payload }),
    }),
  },
})

export default reducer
export {
  jobCategoriesFetchStart,
  jobCategoriesFetchSuccessful,
  jobCategoriesFetchFailure,
  updateJobsData,
}

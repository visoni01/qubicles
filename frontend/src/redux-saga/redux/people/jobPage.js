import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../utils/common'

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
      ...initialState,
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
      jobCategories: action.payload.data.jobCategories,
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

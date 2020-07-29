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
  },
})

export default reducer
export {
  jobCategoriesFetchStart,
  jobCategoriesFetchSuccessful,
  jobCategoriesFetchFailure,
}

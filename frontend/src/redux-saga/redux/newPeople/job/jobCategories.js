import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../../utils/common'

const initialState = {
  isLoading: null,
  error: null,
  success: false,
  jobCategoriesOnly: [],
}

const {
  actions: {
    jobCategoriesOnlyFetchStart,
    jobCategoriesOnlyFetchSuccessful,
    jobCategoriesOnlyFetchFailure,
  },
  reducer,
} = createSlice({
  name: 'jobCategoriesOnly',
  initialState,
  reducers: {
    jobCategoriesOnlyFetchStart: () => ({
      ...initialState,
      isLoading: true,
    }),
    jobCategoriesOnlyFetchSuccessful: (state, action) => ({
      ...state,
      success: true,
      isLoading: false,
      jobCategoriesOnly: getDataForReducer(action, initialState.jobCategoriesOnly, 'jobCategoriesOnly'),
    }),
    jobCategoriesOnlyFetchFailure: (state, action) => ({
      ...initialState,
      error: true,
      isLoading: false,
    }),
  },
})

export default reducer
export {
  jobCategoriesOnlyFetchStart,
  jobCategoriesOnlyFetchSuccessful,
  jobCategoriesOnlyFetchFailure,
}

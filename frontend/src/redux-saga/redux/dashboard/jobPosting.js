import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: null,
  error: null,
  success: false,
  jobPostings: [],
}

const {
  actions: {
    jobPostingDataFetchingStart,
    jobPostingDataFetchingSuccessful,
    jobPostingDataFetchingFailure,
  },
  reducer,
} = createSlice({
  name: 'jobPosting',
  initialState,
  reducers: {
    jobPostingDataFetchingStart: (state) => ({
      ...state,
      isLoading: true,
    }),
    jobPostingDataFetchingSuccessful: (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      jobPostings: action.payload.jobPostings,
    }),
    jobPostingDataFetchingFailure: (state) => ({
      ...state,
      error: true,
      isLoading: false,
    }),
  },
})

export default reducer
export {
  jobPostingDataFetchingStart,
  jobPostingDataFetchingSuccessful,
  jobPostingDataFetchingFailure,
}

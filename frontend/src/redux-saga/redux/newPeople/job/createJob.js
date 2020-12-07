import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: null,
  error: null,
  success: false,
  createJobData: { },
  jobPublishSuccess: false,
  publishedJobId: null,
}

const {
  actions: {
    createJobDataFetchStart,
    createJobDataFetchSuccessful,
    createJobDataFetchFailure,
    resetJobData,
    jobPublishSuccessful,
    jobPublishFailure,
    resetJobPublishStatus,
  },
  reducer,
} = createSlice({
  name: 'createJobData',
  initialState,
  reducers: {
    createJobDataFetchStart: () => ({
      ...initialState,
      isLoading: true,
    }),
    createJobDataFetchSuccessful: (state, action) => {
      const { createJobData } = action.payload
      return ({
        ...state,
        success: true,
        error: false,
        isLoading: false,
        createJobData,
      })
    },
    createJobDataFetchFailure: (state) => ({
      ...state,
      error: true,
      isLoading: false,
    }),
    resetJobData: (state, action) => ({
      ...state,
      createJobData: {},
      success: true,
      error: false,
      isLoading: false,
    }),
    jobPublishSuccessful: (state, action) => ({
      ...state,
      jobPublishSuccess: true,
      publishedJobId: action.payload.publishedJobId,
    }),
    jobPublishFailure: (state) => ({
      ...state,
      jobPublishSuccess: false,
    }),
    resetJobPublishStatus: (state) => ({
      ...state,
      jobPublishSuccess: false,
      publishedJobId: null,
    }),
  },
})

export default reducer
export {
  createJobDataFetchStart,
  createJobDataFetchSuccessful,
  createJobDataFetchFailure,
  resetJobData,
  jobPublishSuccessful,
  jobPublishFailure,
  resetJobPublishStatus,
}

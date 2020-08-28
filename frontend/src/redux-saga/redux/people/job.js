import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: null,
  error: null,
  success: false,
  jobFields: { jobTitles: [], jobCategories: [] },
  jobDetails: {},
}

const {
  actions: {
    jobDetailsFetchStart,
    jobDetailsFetchSuccessful,
    jobDetailsFetchFailure,
    updateJobsFields,
  },
  reducer,
} = createSlice({
  name: 'jobDetails',
  initialState,
  reducers: {
    jobDetailsFetchStart: () => ({
      ...initialState,
      isLoading: true,
    }),
    jobDetailsFetchSuccessful: (state, action) => ({
      ...state,
      success: true,
      isLoading: false,
      jobDetails: action.payload,
    }),
    jobDetailsFetchFailure: (state, action) => ({
      ...state,
      error: true,
      isLoading: false,
    }),
    updateJobsFields: (state, action) => {
      const { jobFields } = action.payload
      let { jobTitles, jobCategories } = jobFields
      jobTitles = jobTitles.map((title) => ({ name: title.job_title_name, value: title.job_title_id }))
      jobCategories = jobCategories.map((category) => ({ name: category.category_name, value: category.category_id }))
      return ({
        ...state,
        jobFields: { jobTitles, jobCategories },
      })
    },
  },
})

export default reducer
export {
  jobDetailsFetchStart,
  jobDetailsFetchSuccessful,
  jobDetailsFetchFailure,
  updateJobsFields,
}

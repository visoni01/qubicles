import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../../utils/common'

const initialState = {
  isLoading: null,
  error: null,
  success: false,
  jobFields: { jobTitles: [], jobCategories: [], jobSkills: [] },
  jobDetails: {},
}

const {
  actions: {
    jobDetailsFetchStart,
    jobDetailsFetchSuccessful,
    jobDetailsFetchFailure,
    updateJobsFields,
    resetJobDetails,
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
      jobDetails: getDataForReducer(action, initialState.jobDetails, 'jobDetails'),
    }),
    jobDetailsFetchFailure: (state) => ({
      ...state,
      error: true,
      isLoading: false,
    }),
    updateJobsFields: (state, action) => {
      const { jobFields } = action.payload
      let { jobTitles, jobCategories, jobSkills } = jobFields
      jobTitles = jobTitles.map((title) => ({ name: title.job_title_name, value: title.job_title_id }))
      jobCategories = jobCategories.map((category) => ({ name: category.categoryTitle, value: category.categoryId }))
      jobSkills = jobSkills.map((skill) => ({ name: skill.skill_name, value: skill.skill_id }))
      return ({
        ...state,
        jobFields: { jobTitles, jobCategories, jobSkills },
      })
    },
    resetJobDetails: (state) => ({
      ...state,
      jobDetails: {},
      success: true,
      error: false,
      isLoading: false,
    }),
  },
})

export default reducer
export {
  jobDetailsFetchStart,
  jobDetailsFetchSuccessful,
  jobDetailsFetchFailure,
  updateJobsFields,
  resetJobDetails,
}

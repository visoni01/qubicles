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
    newJobDetailsFetchStart,
    newJobDetailsFetchSuccessful,
    newJobDetailsFetchFailure,
    newUpdateJobsFields,
  },
  reducer,
} = createSlice({
  name: 'newJobDetails',
  initialState,
  reducers: {
    newJobDetailsFetchStart: () => ({
      ...initialState,
      isLoading: true,
    }),
    newJobDetailsFetchSuccessful: (state, action) => {
      console.log('action.payload ', action.payload, state)
      return ({
        ...state,
        success: true,
        isLoading: false,
        jobDetails: getDataForReducer(action, initialState.jobDetails, 'jobDetails'),
        // jobDetails: action.payload,
      })
    },
    newJobDetailsFetchFailure: (state, action) => ({
      ...state,
      error: true,
      isLoading: false,
    }),
    newUpdateJobsFields: (state, action) => {
      const { jobFields } = action.payload
      let { jobTitles, jobCategories, jobSkills } = jobFields
      jobTitles = jobTitles.map((title) => ({ name: title.job_title_name, value: title.job_title_id }))
      jobCategories = jobCategories.map((category) => ({ name: category.category_name, value: category.category_id }))
      jobSkills = jobSkills.map((skill) => ({ name: skill.skill_name, value: skill.skill_id }))
      return ({
        ...state,
        jobFields: { jobTitles, jobCategories, jobSkills },
      })
    },
  },
})

export default reducer
export {
  newJobDetailsFetchStart,
  newJobDetailsFetchSuccessful,
  newJobDetailsFetchFailure,
  newUpdateJobsFields,
}

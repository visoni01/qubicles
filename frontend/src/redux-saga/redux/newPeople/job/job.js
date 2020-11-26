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
    newJobDetailsFetchSuccessful: (state, action) => ({
      ...state,
      success: true,
      isLoading: false,
      jobDetails: getDataForReducer(action, initialState.jobDetails, 'jobDetails'),
    }),
    newJobDetailsFetchFailure: (state) => ({
      ...state,
      error: true,
      isLoading: false,
    }),
    newUpdateJobsFields: (state, action) => {
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
  },
})

export default reducer
export {
  newJobDetailsFetchStart,
  newJobDetailsFetchSuccessful,
  newJobDetailsFetchFailure,
  newUpdateJobsFields,
}

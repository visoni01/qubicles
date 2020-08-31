import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../utils/common'
import { getUpdatedJobsData } from '../helper'

const initialState = {
  isLoading: null,
  error: null,
  success: false,
  jobCategories: [],
  jobFields: { jobTitles: [], jobCategories: [] },
}

const {
  actions: {
    jobCategoriesFetchStart,
    jobCategoriesFetchSuccessful,
    jobCategoriesFetchFailure,
    updateJobsData,
    updateJobsFields,
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
  jobCategoriesFetchStart,
  jobCategoriesFetchSuccessful,
  jobCategoriesFetchFailure,
  updateJobsData,
  updateJobsFields,
}

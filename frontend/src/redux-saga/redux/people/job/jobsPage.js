import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../../utils/common'
// eslint-disable-next-line import/no-cycle
import { getUpdatedJobsData } from '../../helper'

const initialState = {
  isLoading: null,
  error: null,
  success: false,
  jobsWithCategories: [],
  selectedCategoryId: 0,
  searchField: '',
  status: 'all',
  statusTitle: 'Job Postings',
  isAllJobsFetched: null,
}

const {
  actions: {
    jobsWithCategoriesFetchStart,
    jobsWithCategoriesFetchSuccessful,
    jobsWithCategoriesFetchFailure,
    updateJobsData,
    updateJobsFilter,
  },
  reducer,
} = createSlice({
  name: 'jobsWithCategories',
  initialState,
  reducers: {
    jobsWithCategoriesFetchStart: (state) => ({
      ...state,
      isLoading: true,
    }),
    jobsWithCategoriesFetchSuccessful: (state, action) => ({
      ...state,
      success: true,
      isLoading: false,
      jobsWithCategories: getDataForReducer(action, initialState.jobsWithCategories, 'jobsWithCategories'),
      isAllJobsFetched: getDataForReducer(action, initialState.isAllJobsFetched, 'isAllJobsFetched'),
    }),
    jobsWithCategoriesFetchFailure: (state) => ({
      ...state,
      error: true,
      isLoading: false,
    }),
    updateJobsData: (state, action) => ({
      ...state,
      jobsWithCategories: getUpdatedJobsData({ state, payload: action.payload }),
    }),
    updateJobsFilter: (state, action) => ({
      ...state,
      searchField: action.payload.searchKeyword,
      selectedCategoryId: action.payload.categoryId,
      status: action.payload.status,
      statusTitle: action.payload.statusTitle ? action.payload.statusTitle : state.statusTitle,
    })
    ,
  },
})

export default reducer
export {
  jobsWithCategoriesFetchStart,
  jobsWithCategoriesFetchSuccessful,
  jobsWithCategoriesFetchFailure,
  updateJobsData,
  updateJobsFilter,
}

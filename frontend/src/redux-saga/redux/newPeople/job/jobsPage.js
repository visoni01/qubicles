import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../../utils/common'
// eslint-disable-next-line import/no-cycle
import { getUpdatedJobsData } from '../../helper'

const initialState = {
  isLoading: null,
  error: null,
  success: false,
  newJobCategories: [],
  selectedCategoryId: 0,
  searchField: '',
  status: 'all',
  statusTitle: 'Job Postings',
}

const {
  actions: {
    newJobCategoriesFetchStart,
    newJobCategoriesFetchSuccessful,
    newJobCategoriesFetchFailure,
    updateJobsData,
    updateJobsFilter,
  },
  reducer,
} = createSlice({
  name: 'newJobCategories',
  initialState,
  reducers: {
    newJobCategoriesFetchStart: (state) => ({
      ...state,
      isLoading: true,
    }),
    newJobCategoriesFetchSuccessful: (state, action) => ({
      ...state,
      success: true,
      isLoading: false,
      newJobCategories: getDataForReducer(action, initialState.newJobCategories, 'newJobCategories'),
    }),
    newJobCategoriesFetchFailure: (state) => ({
      ...state,
      error: true,
      isLoading: false,
    }),
    updateJobsData: (state, action) => ({
      ...state,
      newJobCategories: getUpdatedJobsData({ state, payload: action.payload }),
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
  newJobCategoriesFetchStart,
  newJobCategoriesFetchSuccessful,
  newJobCategoriesFetchFailure,
  updateJobsData,
  updateJobsFilter,
}

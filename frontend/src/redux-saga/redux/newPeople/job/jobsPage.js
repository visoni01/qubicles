import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../../utils/common'
// eslint-disable-next-line import/no-cycle
import { getUpdatedJobsData, getJobsByCategory } from '../../helper'

const initialState = {
  isLoading: null,
  error: null,
  success: false,
  newJobCategories: [],
  selectedCategoryId: '',
}

const {
  actions: {
    newJobCategoriesFetchStart,
    newJobCategoriesFetchSuccessful,
    jobsByCategorySuccessful,
    newJobCategoriesFetchFailure,
    updateJobsData,
    resetJobsByCategorySelection,
  },
  reducer,
} = createSlice({
  name: 'newJobCategories',
  initialState,
  reducers: {
    newJobCategoriesFetchStart: () => ({
      ...initialState,
      isLoading: true,
    }),
    newJobCategoriesFetchSuccessful: (state, action) => ({
      ...state,
      success: true,
      isLoading: false,
      newJobCategories: getDataForReducer(action, initialState.newJobCategories, 'newJobCategories'),
    }),
    jobsByCategorySuccessful: (state, action) => ({
      ...state,
      success: true,
      selectedCategoryId: action.payload.categoryId,
      isLoading: false,
      newJobCategories: action.payload.data,
    }),
    newJobCategoriesFetchFailure: (state, action) => ({
      ...initialState,
      error: true,
      isLoading: false,
    }),
    updateJobsData: (state, action) => ({
      ...state,
      newJobCategories: getUpdatedJobsData({ state, payload: action.payload }),
    }),
    resetJobsByCategorySelection: (state, action) => {
      debugger
      return {
        ...state,
        selectedCategoryId: '',
      }
    },
  },
})

export default reducer
export {
  newJobCategoriesFetchStart,
  newJobCategoriesFetchSuccessful,
  jobsByCategorySuccessful,
  newJobCategoriesFetchFailure,
  updateJobsData,
  resetJobsByCategorySelection,
}

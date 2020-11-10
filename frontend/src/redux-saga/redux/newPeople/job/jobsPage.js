import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../../utils/common'
// eslint-disable-next-line import/no-cycle
import { getUpdatedJobsData } from '../helper'

const initialState = {
  isLoading: null,
  error: null,
  success: false,
  newJobCategories: [],
}

const {
  actions: {
    newJobCategoriesFetchStart,
    newJobCategoriesFetchSuccessful,
    newJobCategoriesFetchFailure,
    updateJobsData,
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
    newJobCategoriesFetchFailure: (state, action) => ({
      ...initialState,
      error: true,
      isLoading: false,
    }),
    updateJobsData: (state, action) => ({
      ...state,
      newJobCategories: getUpdatedJobsData({ state, payload: action.payload }),
    }),
  },
})

export default reducer
export {
  newJobCategoriesFetchStart,
  newJobCategoriesFetchSuccessful,
  newJobCategoriesFetchFailure,
  updateJobsData,
}

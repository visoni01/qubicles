import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../utils/common'
import { getUpdatedCategories } from '../helper'

const initialState = {
  isLoading: null,
  error: null,
  success: false,
  categories: [],
}

const {
  actions: {
    categoryDataFetchingStart,
    categoryDataFetchingSuccessful,
    categoryDataFetchingFailure,
    updateCategoryData,
  },
  reducer,
} = createSlice({
  name: 'category',
  initialState,
  reducers: {
    categoryDataFetchingStart: (state, action) => ({
      ...initialState,
      isLoading: true,
    }),
    categoryDataFetchingSuccessful: (state, action) => ({
      ...initialState,
      success: true,
      isLoading: false,
      categories: getDataForReducer(action, initialState.categories, 'categories'),
    }),
    categoryDataFetchingFailure: (state, action) => ({
      ...initialState,
      error: true,
      isLoading: false,
    }),
    updateCategoryData: (state, action) => ({
      ...initialState,
      categories: getUpdatedCategories({ state, payload: action.payload }),
    }),
  },
})

export default reducer
export {
  categoryDataFetchingStart,
  categoryDataFetchingSuccessful,
  categoryDataFetchingFailure,
  updateCategoryData,
}

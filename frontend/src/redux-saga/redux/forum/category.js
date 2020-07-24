import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../utils/common'

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
    addNewCategoryStart,
    addNewCategorySuccessful,
    addNewCategoryFailure,
  },
  reducer,
} = createSlice({
  name: 'category',
  initialState,
  reducers: {
    categoryDataFetchingStart: () => ({
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
    addNewCategoryStart: (state) => ({
      ...state,
      isLoading: true,
      success: false,
    }),
    addNewCategorySuccessful: (state, action) => {
      const { newCategory } = action.payload
      return ({
        ...state,
        isLoading: false,
        success: true,
        categories: [ ...state.categories, newCategory ],
      })
    },
    addNewCategoryFailure: (state) => ({
      ...state,
      isLoading: false,
      success: false,
      error: true,
    }),
  },
})

export default reducer
export {
  categoryDataFetchingStart,
  categoryDataFetchingSuccessful,
  categoryDataFetchingFailure,
  addNewCategoryStart,
  addNewCategorySuccessful,
  addNewCategoryFailure,
}

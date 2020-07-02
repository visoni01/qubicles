import { createSlice } from '@reduxjs/toolkit'

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
      categories: action.payload.categories,
    }),
    categoryDataFetchingFailure: (state, action) => ({
      ...initialState,
      error: true,
      isLoading: false,
    }),
  },
})

export default reducer
export {
  categoryDataFetchingStart,
  categoryDataFetchingSuccessful,
  categoryDataFetchingFailure,
}

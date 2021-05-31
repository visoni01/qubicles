import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: null,
  error: null,
  success: null,
  reviews: [],
  count: null,
  reviewFilter: 'latest',
  offset: 0,
  currentPage: 1,
}

const {
  actions: {
    courseReviewsRequestStart,
    courseReviewsRequestSuccess,
    courseReviewsRequestFailure,
    updateCourseReviewsFilterOrPage,
    resetCourseReviewsReducer,
  },
  reducer,
} = createSlice({
  name: 'courseReviews',
  initialState,
  reducers: {
    courseReviewsRequestStart: (state) => ({
      ...state,
      isLoading: true,
      success: null,
      error: null,
    }),
    courseReviewsRequestSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      error: false,
      ...action.payload,
    }),
    courseReviewsRequestFailure: (state) => ({
      ...state,
      isLoading: false,
      success: false,
      error: true,
    }),
    updateCourseReviewsFilterOrPage: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    resetCourseReviewsReducer: () => ({
      ...initialState,
    }),
  },
})

export default reducer
export {
  courseReviewsRequestStart,
  courseReviewsRequestSuccess,
  courseReviewsRequestFailure,
  updateCourseReviewsFilterOrPage,
  resetCourseReviewsReducer,
}

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: null,
  error: null,
  success: false,
  addReviewAccess: false,
  ratings: {
    value: 0,
    clarity: 0,
    content: 0,
    structure: 0,
    totalAverageRating: 0,
    totalAverageRaters: 0,
  },
}

const {
  actions: {
    courseRatingsFetchStart,
    courseRatingsFetchSuccessful,
    courseRatingsFetchFailure,
  },
  reducer,
} = createSlice({
  name: 'courseRatings',
  initialState,
  reducers: {
    courseRatingsFetchStart: (state) => ({
      ...state,
      loading: true,
      error: null,
      success: null,
    }),
    courseRatingsFetchSuccessful: (state, action) => ({
      ...state,
      loading: false,
      success: true,
      error: false,
      ...action.payload,
    }),
    courseRatingsFetchFailure: (state) => ({
      ...state,
      loading: false,
      success: false,
      error: true,
    }),
  },
})

export default reducer
export {
  courseRatingsFetchStart,
  courseRatingsFetchSuccessful,
  courseRatingsFetchFailure,
}

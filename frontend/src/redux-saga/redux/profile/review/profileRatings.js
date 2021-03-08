import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  fetchLoading: null,
  fetchError: null,
  fetchSuccess: false,
  viewRatings: {
    totalAverageRating: 0,
    totalAverageRaters: 0,
    rating1: 0,
    rating2: 0,
    rating3: 0,
    rating4: 0,
  },
  addReviewAccess: false,
}

const {
  actions: {
    profileRatingsFetchStart,
    profileRatingsFetchSuccessful,
    profileRatingsFetchFailure,
  },
  reducer,
} = createSlice({
  name: 'profileRatings',
  initialState,
  reducers: {
    profileRatingsFetchStart: (state) => ({
      ...state,
      fetchLoading: true,
    }),
    profileRatingsFetchSuccessful: (state, action) => ({
      ...state,
      fetchSuccess: true,
      fetchLoading: false,
      viewRatings: {
        totalAverageRating: action.payload.totalAverageRating,
        totalAverageRaters: action.payload.totalAverageRaters,
        rating1: action.payload.rating1,
        rating2: action.payload.rating2,
        rating3: action.payload.rating3,
        rating4: action.payload.rating4,
      },
      addReviewAccess: action.payload.addReviewAccess,
    }),
    profileRatingsFetchFailure: (state) => ({
      ...state,
      fetchError: true,
      fetchLoading: false,
    }),
  },
})

export default reducer
export {
  profileRatingsFetchStart,
  profileRatingsFetchSuccessful,
  profileRatingsFetchFailure,
}

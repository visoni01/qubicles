import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../../utils/common'

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
        totalAverageRating: getDataForReducer(action, state.viewRatings.totalAverageRating, 'totalAverageRating'),
        totalAverageRaters: getDataForReducer(action, state.viewRatings.totalAverageRaters, 'totalAverageRaters'),
        rating1: getDataForReducer(action, state.viewRatings.rating1, 'rating1'),
        rating2: getDataForReducer(action, state.viewRatings.rating2, 'rating2'),
        rating3: getDataForReducer(action, state.viewRatings.rating3, 'rating3'),
        rating4: getDataForReducer(action, state.viewRatings.rating4, 'rating4'),
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

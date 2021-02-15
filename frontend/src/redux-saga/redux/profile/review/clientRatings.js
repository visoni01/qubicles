import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../../utils/common'

const initialState = {
  fetchLoading: null,
  fetchError: null,
  fetchSuccess: false,
  viewRatings: {
    totalAverageRating: 0,
    totalAverageRaters: 0,
    cultureRating: 0,
    leadershipRating: 0,
    careerAdvancementRating: 0,
    compensationRating: 0,
  },
}

const {
  actions: {
    companyRatingsFetchStart,
    companyRatingsFetchSuccessful,
    companyRatingsFetchFailure,
  },
  reducer,
} = createSlice({
  name: 'companyRatings',
  initialState,
  reducers: {
    companyRatingsFetchStart: (state) => ({
      ...state,
      fetchLoading: true,
    }),
    companyRatingsFetchSuccessful: (state, action) => ({
      ...state,
      fetchSuccess: true,
      viewRatings: {
        totalAverageRating: getDataForReducer(action, state.viewRatings.totalAverageRating, 'totalAverageRating'),
        totalAverageRaters: getDataForReducer(action, state.viewRatings.totalAverageRaters, 'totalAverageRaters'),
        cultureRating: getDataForReducer(action, state.viewRatings.cultureRating, 'cultureRating'),
        leadershipRating: getDataForReducer(action, state.viewRatings.leadershipRating, 'leadershipRating'),
        careerAdvancementRating: getDataForReducer(action, state.viewRatings.careerAdvancementRating, 'careerAdvancementRating'),
        compensationRating: getDataForReducer(action, state.viewRatings.compensationRating, 'compensationRating'),
      },
    }),
    companyRatingsFetchFailure: (state) => ({
      ...state,
      fetchError: true,
    }),
  },
})

export default reducer
export {
  companyRatingsFetchStart,
  companyRatingsFetchSuccessful,
  companyRatingsFetchFailure,
}

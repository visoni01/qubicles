import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../../utils/common'

const initialState = {
  fetchLoading: null,
  fetchError: null,
  fetchSuccess: false,
  postLoading: null,
  postError: null,
  postSuccess: false,
  recievedReviews: {
    initialLoad: false,
    reviews: [],
  },
  givenReviews: {
    initialLoad: false,
    reviews: [],
  },
}

const {
  actions: {
    profileReviewsFetchStart,
    profileReviewsFetchSuccessful,
    profileReviewsFetchFailure,
    profileReviewPostStart,
    profileReviewPostSuccessful,
    profileReviewPostFailure,
    resetReviews,
  },
  reducer,
} = createSlice({
  name: 'profileReviews',
  initialState,
  reducers: {
    profileReviewsFetchStart: (state) => ({
      ...state,
      fetchLoading: true,
    }),
    profileReviewsFetchSuccessful: (state, action) => {
      let newState = {
        ...state,
        fetchSuccess: true,
        fetchLoading: false,
        profileId: action.payload.profileId,
        profileType: action.payload.profileType,
      }
      if (action.payload.type === 'recieved') {
        newState = {
          ...newState,
          recievedReviews: {
            initialLoad: true,
            reviews: getDataForReducer(action, state.recievedReviews, 'reviews'),
          },
        }
      } else if (action.payload.type === 'given') {
        newState = {
          ...newState,
          givenReviews: {
            initialLoad: true,
            reviews: getDataForReducer(action, state.givenReviews, 'reviews'),
          },
        }
      }
      return (newState)
    },
    profileReviewsFetchFailure: (state) => ({
      ...state,
      fetchError: true,
    }),
    profileReviewPostStart: (state) => ({
      ...state,
      postLoading: true,
    }),
    profileReviewPostSuccessful: (state, action) => ({
      ...state,
      postLoading: false,
      postSuccess: true,
      recievedReviews: {
        ...state.recievedReviews,
        reviews: getDataForReducer(action, state.recievedReviews, 'reviews'),
      },
    }),
    profileReviewPostFailure: (state) => ({
      ...state,
      fetchError: true,
    }),
    resetReviews: () => ({
      ...initialState,
    }),
  },
})

export default reducer
export {
  profileReviewsFetchStart,
  profileReviewsFetchSuccessful,
  profileReviewsFetchFailure,
  profileReviewPostStart,
  profileReviewPostSuccessful,
  profileReviewPostFailure,
  resetReviews,
}

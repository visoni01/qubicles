import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../../utils/common'

const initialState = {
  fetchLoading: null,
  fetchError: null,
  fetchSuccess: false,
  postLoading: null,
  postError: null,
  postSuccess: false,
  recievedReviews: [],
  givenReviews: [],
}

const {
  actions: {
    profileReviewsFetchStart,
    profileReviewsFetchSuccessful,
    profileReviewsFetchFailure,
    profileReviewPostStart,
    profileReviewPostSuccessful,
    profileReviewPostFailure,

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
      }
      if (action.payload.type === 'recieved') {
        newState = {
          ...newState,
          recievedReviews: getDataForReducer(action, state.recievedReviews, 'reviews'),
        }
      } else if (action.payload.type === 'given') {
        newState = {
          ...newState,
          recievedReviews: getDataForReducer(action, state.givenReviews, 'reviews'),
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
      recievedReviews: getDataForReducer(action, initialState.recievedReviews, 'reviews'),
    }),
    profileReviewPostFailure: (state) => ({
      ...state,
      fetchError: true,
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
}

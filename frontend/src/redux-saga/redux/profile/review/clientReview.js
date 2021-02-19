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
    companyReviewsFetchStart,
    companyReviewsFetchSuccessful,
    companyReviewsFetchFailure,
    companyReviewPostStart,
    companyReviewPostSuccessful,
    companyReviewPostFailure,

  },
  reducer,
} = createSlice({
  name: 'companyReviews',
  initialState,
  reducers: {
    companyReviewsFetchStart: (state) => ({
      ...state,
      fetchLoading: true,
    }),
    companyReviewsFetchSuccessful: (state, action) => {
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
    companyReviewsFetchFailure: (state) => ({
      ...state,
      fetchError: true,
    }),
    companyReviewPostStart: (state) => ({
      ...state,
      postLoading: true,
    }),
    companyReviewPostSuccessful: (state, action) => ({
      ...state,
      postLoading: false,
      postSuccess: true,
      recievedReviews: getDataForReducer(action, initialState.recievedReviews, 'reviews'),
    }),
    companyReviewPostFailure: (state) => ({
      ...state,
      fetchError: true,
    }),
  },
})

export default reducer
export {
  companyReviewsFetchStart,
  companyReviewsFetchSuccessful,
  companyReviewsFetchFailure,
  companyReviewPostStart,
  companyReviewPostSuccessful,
  companyReviewPostFailure,
}

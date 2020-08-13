import { createSlice } from '@reduxjs/toolkit'
import { getPostData } from '../../helper'

const initialState = {
  isLoading: null,
  error: null,
  posts: [],
}

const {
  actions: {
    postDataFechingStart,
    postDataFetchingFailed,
    updatePostData,
  },
  reducer,
} = createSlice({
  name: 'post',
  initialState,
  reducers: {
    postDataFechingStart: (state) => ({
      ...state,
      isLoading: true,
    }),
    postDataFetchingFailed: (state) => ({
      ...state,
      isLoading: false,
      success: false,
    }),
    updatePostData: (state, action) => ({
      ...state,
      isLoading: false,
      posts: getPostData({ state, payload: action.payload }),
    }),
  },
})

export default reducer
export {
  postDataFechingStart,
  postDataFetchingFailed,
  updatePostData,
}

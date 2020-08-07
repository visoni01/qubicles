import { createSlice } from '@reduxjs/toolkit'
import { getPostData } from '../helper'

const initialState = {
  isLoading: null,
  error: null,
  posts: [],
}

const {
  actions: {
    postDataFechingStart,
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
    updatePostData: (state, action) => ({
      ...state,
      isLoading: false,
      posts: getPostData({ state, action }),
    }),
  },
})

export default reducer
export {
  postDataFechingStart,
  updatePostData,
}

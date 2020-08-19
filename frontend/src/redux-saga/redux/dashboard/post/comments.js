import { createSlice } from '@reduxjs/toolkit'
import { updatePostCommentsData } from '../../helper'

const initialState = {
  isLoading: null,
  error: null,
  data: { comments: [], count: 0 },
  success: null,
}

const {
  actions: {
    fetchCommentsStart,
    fetchCommentsSuccess,
    fetchCommentsFailed,
    updatePostComments,
  },
  reducer,
} = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    fetchCommentsStart: (state) => ({
      ...state,
      isLoading: true,
    }),
    fetchCommentsSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      data: action.payload,
    }),
    fetchCommentsFailed: (state) => ({
      ...state,
      isLoading: false,
      success: false,
    }),
    updatePostComments: (state, action) => ({
      ...state,
      isLoading: false,
      data: updatePostCommentsData({ state, payload: action.payload }),
    }),
  },
})

export default reducer
export {
  fetchCommentsStart,
  fetchCommentsSuccess,
  fetchCommentsFailed,
  updatePostComments,
}

import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../utils/common'
import { getUpdatedTopicComments } from '../helper'

const initialState = {
  isLoading: null,
  error: null,
  success: false,
  comments: {},
}

const {
  actions: {
    topicCommentsFetchingStart,
    topicCommentsFetchingSuccessful,
    topicCommentsFetchingFailure,
    updateTopicComments,
  },
  reducer,
} = createSlice({
  name: 'topicComments',
  initialState,
  reducers: {
    topicCommentsFetchingStart: (state) => ({
      ...state,
      isLoading: true,
    }),
    topicCommentsFetchingSuccessful: (state, action) => ({
      ...state,
      success: true,
      isLoading: false,
      comments: getDataForReducer(action, initialState.comments, 'comments'),
      commentsCount: action.payload.commentsCount,
    }),
    topicCommentsFetchingFailure: (state, action) => ({
      ...state,
      error: true,
      isLoading: false,
    }),
    updateTopicComments: (state, action) => (getUpdatedTopicComments({ state, payload: action.payload })),
  },
})

export default reducer
export {
  topicCommentsFetchingStart,
  topicCommentsFetchingSuccessful,
  topicCommentsFetchingFailure,
  updateTopicComments,
}

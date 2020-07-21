import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../utils/common'

const initialState = {
  isLoading: null,
  newReplyLoading: false,
  newReplyError: null,
  newReplySuccess: null,
  newReply: {},
  error: null,
  success: false,
  topicDetails: {},
}

const {
  actions: {
    topicDataFetchingStart,
    topicDataFetchingSuccessful,
    topicDataFetchingFailure,
    topicActivityDataPostingStart,
    topicReplyActivitySuccessful,
    topicReplyActivityFailure,
  },
  reducer,
} = createSlice({
  name: 'topic',
  initialState,
  reducers: {
    topicDataFetchingStart: (state) => ({
      ...state,
      isLoading: true,
    }),
    topicDataFetchingSuccessful: (state, action) => ({
      ...state,
      success: true,
      isLoading: false,
      topicDetails: getDataForReducer(action, initialState.topicDetails, 'topicDetails'),
    }),
    topicDataFetchingFailure: (state, action) => ({
      ...state,
      error: true,
      isLoading: false,
    }),
    topicActivityDataPostingStart: (state, action) => ({
      ...state,
      newReplyLoading: true,
    }),
    topicReplyActivitySuccessful: (state, action) => {
      const newReply = getDataForReducer(action, initialState.newReply, 'newReply')
      return ({
        ...state,
        newReplySuccess: true,
        newReplyLoading: false,
        newReply,
        topicDetails: { ...state.topicDetails, posts: [ newReply, ...state.topicDetails.posts ] },
      })
    },
    topicReplyActivityFailure: (state, action) => ({
      ...state,
      newReplyError: true,
      isLoading: false,
    }),
  },
})

export default reducer
export {
  topicDataFetchingStart,
  topicDataFetchingSuccessful,
  topicDataFetchingFailure,
  topicActivityDataPostingStart,
  topicReplyActivitySuccessful,
  topicReplyActivityFailure,
}

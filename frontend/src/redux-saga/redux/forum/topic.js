import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../utils/common'
import { getUpdatedTopicDetails } from '../helper'

const initialState = {
  isLoading: null,
  error: null,
  success: false,
  topicDetails: {},
}

const {
  actions: {
    topicDataFetchingStart,
    topicDataFetchingSuccessful,
    topicDataFetchingFailure,
    updateTopicDetails,
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
    updateTopicDetails: (state, action) => ({
      ...state,
      topicDetails: getUpdatedTopicDetails({ state, payload: action.payload }),
    }),
  },
})

export default reducer
export {
  topicDataFetchingStart,
  topicDataFetchingSuccessful,
  topicDataFetchingFailure,
  updateTopicDetails,
}

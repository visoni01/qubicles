import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../../utils/common'
import { getUpdatedTopicsList } from '../../helper'

const initialState = {
  isLoading: null,
  error: null,
  success: false,
  channelTopicsList: [],
}

const {
  actions: {
    channelTopicsListFetchingStart,
    channelTopicsListFetchingSuccessful,
    channelTopicsListFetchingFailure,
    updateChannelTopicsList,
  },
  reducer,
} = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    channelTopicsListFetchingStart: (state) => ({
      ...state,
      isLoading: true,
    }),
    channelTopicsListFetchingSuccessful: (state, action) => ({
      ...state,
      success: true,
      isLoading: false,
      channelTopicsList: getDataForReducer(action, initialState.channelTopicsList, 'channelTopicsList'),
    }),
    channelTopicsListFetchingFailure: (state, action) => ({
      ...state,
      error: true,
      isLoading: false,
    }),
    updateChannelTopicsList: (state, action) => ({
      ...state,
      channelTopicsList: getUpdatedTopicsList({ state, payload: action.payload }),
    }),
  },
})

export default reducer
export {
  channelTopicsListFetchingStart,
  channelTopicsListFetchingSuccessful,
  channelTopicsListFetchingFailure,
  updateChannelTopicsList,
}

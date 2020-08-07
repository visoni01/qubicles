import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../../utils/common'
import { getUpdatedChannel } from '../../helper'

const initialState = {
  isLoading: null,
  error: null,
  success: false,
  channelDetails: {},
}

const {
  actions: {
    channelDetailsFetchingStart,
    channelDetailsFetchingSuccessful,
    channelDetailsFetchingFailure,
    updateChannelDetails,
  },
  reducer,
} = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    channelDetailsFetchingStart: (state) => ({
      ...state,
      isLoading: true,
    }),
    channelDetailsFetchingSuccessful: (state, action) => ({
      ...state,
      success: true,
      isLoading: false,
      channelDetails: getDataForReducer(action, initialState.channelDetails, 'channelDetails'),
    }),
    channelDetailsFetchingFailure: (state, action) => ({
      ...state,
      error: true,
      isLoading: false,
    }),
    updateChannelDetails: (state, action) => ({
      ...state,
      channelDetails: getUpdatedChannel({ state, payload: action.payload }),
    }),
  },
})

export default reducer
export {
  channelDetailsFetchingStart,
  channelDetailsFetchingSuccessful,
  channelDetailsFetchingFailure,
  updateChannelDetails,
}

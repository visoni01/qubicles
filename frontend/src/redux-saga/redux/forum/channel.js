import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../utils/common'
import { DELETE_TOPIC } from '../constants'

const initialState = {
  isLoading: null,
  error: null,
  success: false,
  channelDetails: {},
}

const {
  actions: {
    channelDataFetchingStart,
    channelDataFetchingSuccessful,
    channelDataFetchingFailure,
    updateChannelData,
  },
  reducer,
} = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    channelDataFetchingStart: (state) => ({
      ...state,
      isLoading: true,
    }),
    channelDataFetchingSuccessful: (state, action) => ({
      ...state,
      success: true,
      isLoading: false,
      channelDetails: getDataForReducer(action, initialState.channelDetails, 'channelDetails'),
    }),
    channelDataFetchingFailure: (state, action) => ({
      ...state,
      error: true,
      isLoading: false,
    }),
    updateChannelData: (state, action) => ({
      ...state,
      channelDetails: action.payload.data,
    }),
  },
})

export default reducer
export {
  channelDataFetchingStart,
  channelDataFetchingSuccessful,
  channelDataFetchingFailure,
  updateChannelData,
}

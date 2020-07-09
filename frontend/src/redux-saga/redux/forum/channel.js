import { createSlice } from '@reduxjs/toolkit'
import {getDataForReducer} from '../../../utils/common'

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
      channelDetails: getDataForReducer(action, initialState.channelDetails, 'channelDetails')
    }),
    channelDataFetchingFailure: (state, action) => ({
      ...state,
      error: true,
      isLoading: false,
    }),
  },
})

export default reducer
export {
  channelDataFetchingStart,
  channelDataFetchingSuccessful,
  channelDataFetchingFailure,
}

import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../utils/common'

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
  },
})

export default reducer
export {
  topicDataFetchingStart,
  topicDataFetchingSuccessful,
  topicDataFetchingFailure,
}

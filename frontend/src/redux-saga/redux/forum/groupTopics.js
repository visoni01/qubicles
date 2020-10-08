import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../utils/common'

const initialState = {
  isLoading: null,
  error: null,
  success: false,
  topics: [],
}

const {
  actions: {
    groupTopicsFetchingStart,
    groupTopicsFetchingSuccessful,
    groupTopicsFetchingFailure,
  },
  reducer,
} = createSlice({
  name: 'groupTopics',
  initialState,
  reducers: {
    groupTopicsFetchingStart: (state) => ({
      ...state,
      isLoading: true,
    }),
    groupTopicsFetchingSuccessful: (state, action) => ({
      ...state,
      success: true,
      isLoading: false,
      topics: getDataForReducer(action, initialState.topics, 'topics'),
    }),
    groupTopicsFetchingFailure: (state, action) => ({
      ...state,
      error: true,
      isLoading: false,
    }),
  },
})

export default reducer
export {
  groupTopicsFetchingStart,
  groupTopicsFetchingSuccessful,
  groupTopicsFetchingFailure,
}

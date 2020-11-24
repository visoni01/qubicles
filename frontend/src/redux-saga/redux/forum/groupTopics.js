import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../utils/common'
import { updateGroupTopics } from '../helper'

const initialState = {
  isLoading: null,
  error: null,
  success: false,
  topics: [],
  topicsCount: 0,
}

const {
  actions: {
    groupTopicsFetchingStart,
    groupTopicsFetchingSuccessful,
    groupTopicsFetchingFailure,
    updateGroupTopicsList,
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
      topics: [ ...action.payload.topics ],
      topicsCount: getDataForReducer(action, initialState.topicsCount, 'topicsCount'),
    }),
    groupTopicsFetchingFailure: (state) => ({
      ...state,
      error: true,
      isLoading: false,
    }),
    updateGroupTopicsList: (state, action) => (updateGroupTopics(state, action.payload)),
  },
})

export default reducer
export {
  groupTopicsFetchingStart,
  groupTopicsFetchingSuccessful,
  groupTopicsFetchingFailure,
  updateGroupTopicsList,
}

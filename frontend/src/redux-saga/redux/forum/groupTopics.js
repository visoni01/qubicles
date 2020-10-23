import { configureStore, createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../utils/common'
import { updateGroupTopics } from '../helper'

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
      topics: getDataForReducer(action, initialState.topics, 'topics'),
    }),
    groupTopicsFetchingFailure: (state, action) => ({
      ...state,
      error: true,
      isLoading: false,
    }),
    updateGroupTopicsList: (state, action) => ({
      ...state,
      topics: updateGroupTopics(state, action.payload),
    }),
  },
})

export default reducer
export {
  groupTopicsFetchingStart,
  groupTopicsFetchingSuccessful,
  groupTopicsFetchingFailure,
  updateGroupTopicsList,
}

import { createSlice } from '@reduxjs/toolkit'
import { updateTestEntriesReducer } from '../helper'

const initialState = {
  isLoading: null,
  error: null,
  success: null,
  requestType: '',
  dataType: '',
  courseTestEntries: {
    courseId: null,
    courseTitle: '',
    testEntries: [],
  },
}

const {
  actions: {
    testEntriesRequestStart,
    testEntriesRequestSuccess,
    testEntriesRequestFailed,
    resetTestEntriesFlags,
    resetTestEntriesReducer,
  }, reducer,
} = createSlice({
  name: 'testEntries',
  initialState,
  reducers: {
    testEntriesRequestStart: (state, action) => ({
      ...state,
      isLoading: true,
      success: null,
      error: null,
      requestType: action.payload.requestType,
      dataType: action.payload.dataType,
    }),
    testEntriesRequestSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      error: false,
      courseTestEntries: updateTestEntriesReducer({ state, action }),
    }),
    testEntriesRequestFailed: (state) => ({
      ...state,
      isLoading: false,
      error: true,
      success: false,
    }),
    resetTestEntriesFlags: (state) => ({
      ...state,
      isLoading: null,
      error: null,
      success: null,
    }),
    resetTestEntriesReducer: () => ({
      ...initialState,
    }),
  },
})

export default reducer
export {
  testEntriesRequestStart,
  testEntriesRequestSuccess,
  testEntriesRequestFailed,
  resetTestEntriesFlags,
  resetTestEntriesReducer,
}

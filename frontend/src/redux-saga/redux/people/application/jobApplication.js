import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../../utils/common'

const initialState = {
  isLoading: null,
  error: null,
  success: null,
  application: {},
  requestType: '',
}

const {
  actions: {
    jobApplicationRequestStart,
    jobApplicationRequestSuccess,
    jobApplicationRequestFailed,
  }, reducer,
} = createSlice({
  name: 'jobApplication',
  initialState,
  reducers: {
    jobApplicationRequestStart: (state, action) => ({
      ...state,
      isLoading: true,
      success: null,
      error: null,
      requestType: action.payload.requestType,
    }),
    jobApplicationRequestSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      application: getDataForReducer(action, initialState.application, 'application'),
    }),
    jobApplicationRequestFailed: (state) => ({
      ...state,
      isLoading: false,
      error: true,
      success: false,
      application: {},
    }),
  },
})

export default reducer
export {
  jobApplicationRequestStart,
  jobApplicationRequestSuccess,
  jobApplicationRequestFailed,
}

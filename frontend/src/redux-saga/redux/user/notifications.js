import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'
import { updateCountData, updateNotificationsData } from '../helper'

const initialState = {
  isLoading: null,
  error: null,
  success: null,
  notifications: [],
  offset: 0,
  count: null,
  requestType: '',
  allRead: true,
}

const {
  actions: {
    notificationsFetchStart,
    notificationsFetchSuccessful,
    notificationsFetchFailure,
  },
  reducer,
} = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    notificationsFetchStart: (state, action) => ({
      ...state,
      isLoading: true,
      success: null,
      error: null,
      requestType: action.payload.requestType,
      offset: !_.isUndefined(action.payload.offset) ? action.payload.offset : state.offset,
    }),
    notificationsFetchSuccessful: (state, action) => ({
      ...state,
      success: true,
      isLoading: false,
      notifications: updateNotificationsData({ state, payload: action.payload }),
      count: updateCountData({ state, payload: action.payload }),
      allRead: action.payload.allRead,
      offset: !_.isUndefined(action.payload.offset) ? action.payload.offset : state.offset,
    }),
    notificationsFetchFailure: (state) => ({
      ...state,
      error: true,
      isLoading: false,
    }),
  },
})

export default reducer
export {
  notificationsFetchStart,
  notificationsFetchSuccessful,
  notificationsFetchFailure,
}

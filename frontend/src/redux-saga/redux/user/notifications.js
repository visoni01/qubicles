import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'
import { updateCountData, updateNotificationsData, updateAfterDelete } from '../helper'

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
    addNewNotification,
    deleteNotification,
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
    addNewNotification: (state, action) => ({
      ...state,
      notifications: [
        action.payload.notification,
        ...state.notifications,
      ],
      offset: state.offset + 1,
      count: state.count + 1,
      allRead: false,
    }),
    deleteNotification: (state, action) => ({
      ...state,
      ...updateAfterDelete({ state, payload: action.payload }),
    }),
  },
})

export default reducer
export {
  notificationsFetchStart,
  notificationsFetchSuccessful,
  notificationsFetchFailure,
  addNewNotification,
  deleteNotification,
}

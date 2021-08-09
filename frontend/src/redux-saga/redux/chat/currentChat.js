import { createSlice } from '@reduxjs/toolkit'
import { updateChatPopupsHelper } from './helper'
import { popupChats } from '../../../containers/Chat/testData'

const initialState = {
  isLoading: null,
  error: null,
  success: null,
  requestType: '',
  dataType: '',
  chat: {},
  // WIP - Remove test data
  chatPopups: popupChats,
}

const {
  actions: {
    currentChatRequestStart,
    currentChatRequestSuccess,
    currentChatRequestFailed,
    resetCurrentChatReducer,
    updateChatPopups,
    updateCurrentChat,
  }, reducer,
} = createSlice({
  name: 'currentChat',
  initialState,
  reducers: {
    currentChatRequestStart: (state, action) => ({
      ...state,
      isLoading: true,
      success: null,
      error: null,
      requestType: action.payload.requestType,
      dataType: action.payload.dataType,
    }),
    currentChatRequestSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      error: false,
      ...action.payload,
    }),
    currentChatRequestFailed: (state) => ({
      ...state,
      isLoading: false,
      error: true,
      success: false,
    }),
    resetCurrentChatReducer: (state) => ({
      ...initialState,
      chatPopups: state.chatPopups,
    }),
    updateChatPopups: (state, action) => ({
      ...state,
      chatPopups: updateChatPopupsHelper({ chatPopups: state.chatPopups, payload: action.payload }),
    }),
    updateCurrentChat: (state, action) => ({
      ...state,
      chat: action.payload.currentChat,
    }),
  },
})

export default reducer
export {
  currentChatRequestStart,
  currentChatRequestSuccess,
  currentChatRequestFailed,
  resetCurrentChatReducer,
  updateChatPopups,
  updateCurrentChat,
}

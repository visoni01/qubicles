import { createSlice } from '@reduxjs/toolkit'
import { updateCurrentChatReducer } from './helper'

const initialState = {
  isLoading: null,
  error: null,
  success: null,
  requestType: '',
  dataType: '',
  chat: {},
}

const {
  actions: {
    currentChatRequestStart,
    currentChatRequestSuccess,
    currentChatRequestFailed,
    resetCurrentChatReducer,
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
      chat: updateCurrentChatReducer({ payload: { ...action.payload, dataType: state.dataType }, chat: state.chat }),
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
    updateCurrentChat: (state, action) => ({
      ...state,
      chat: updateCurrentChatReducer({ payload: action.payload, chat: state.chat }),
    }),
  },
})

export default reducer
export {
  currentChatRequestStart,
  currentChatRequestSuccess,
  currentChatRequestFailed,
  resetCurrentChatReducer,
  updateCurrentChat,
}

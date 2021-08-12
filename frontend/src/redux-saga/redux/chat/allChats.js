import { createSlice } from '@reduxjs/toolkit'
import { updateAllChatsReducer } from './helper'

const initialState = {
  isLoading: null,
  error: null,
  success: null,
  requestType: '',
  dataType: '',
  chatsList: [],
}

const {
  actions: {
    allChatsRequestStart,
    allChatsRequestSuccess,
    allChatsRequestFailed,
    resetAllChatsReducer,
    updateAllChats,
  }, reducer,
} = createSlice({
  name: 'allChats',
  initialState,
  reducers: {
    allChatsRequestStart: (state, action) => ({
      ...state,
      isLoading: true,
      success: null,
      error: null,
      requestType: action.payload.requestType,
      dataType: action.payload.dataType,
    }),
    allChatsRequestSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      error: false,
      chatsList: updateAllChatsReducer({
        payload: { ...action.payload, dataType: state.dataType },
        chatsList: state.chatsList,
      }),
    }),
    allChatsRequestFailed: (state) => ({
      ...state,
      isLoading: false,
      error: true,
      success: false,
    }),
    resetAllChatsReducer: () => ({
      ...initialState,
    }),
    updateAllChats: (state, action) => ({
      ...state,
      chatsList: updateAllChatsReducer({ payload: action.payload, chatsList: state.chatsList }),
    }),
  },
})

export default reducer
export {
  allChatsRequestStart,
  allChatsRequestSuccess,
  allChatsRequestFailed,
  resetAllChatsReducer,
  updateAllChats,
}

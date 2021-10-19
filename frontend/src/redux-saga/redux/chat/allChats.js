import { createSlice } from '@reduxjs/toolkit'
import { updateAllChatsReducer } from './helper'

const initialState = {
  initialFetchDone: false,
  isLoading: null,
  error: null,
  success: null,
  requestType: '',
  dataType: '',
  chatsList: [],
  offset: 0,
  searchKeyword: '',
  more: false,
}

const {
  actions: {
    allChatsRequestStart,
    allChatsRequestSuccess,
    allChatsRequestFailed,
    resetAllChatsReducer,
    resetAllChatsReducerFlags,
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
      offset: action.payload.offset || 0,
      searchKeyword: action.payload.searchKeyword || '',
      more: state.dataType === 'chats-list' ? false : state.more,
    }),
    allChatsRequestSuccess: (state, action) => ({
      ...state,
      initialFetchDone: true,
      isLoading: false,
      success: true,
      error: false,
      chatsList: updateAllChatsReducer({
        payload: { ...action.payload, dataType: state.dataType },
        chatsList: state.chatsList,
      }),
      more: state.dataType === 'chats-list' ? action.payload.more : state.more,
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
    resetAllChatsReducerFlags: (state) => ({
      ...state,
      initialFetchDone: false,
      isLoading: null,
      error: null,
      success: null,
      requestType: '',
      dataType: '',
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
  resetAllChatsReducerFlags,
  updateAllChats,
}

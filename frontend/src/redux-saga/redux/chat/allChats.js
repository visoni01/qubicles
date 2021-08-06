import { createSlice } from '@reduxjs/toolkit'

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
    resetChatReducer,
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
      chatsList: action.payload.chats,
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
  },
})

export default reducer
export {
  allChatsRequestStart,
  allChatsRequestSuccess,
  allChatsRequestFailed,
  resetChatReducer,
}

import { createSlice } from '@reduxjs/toolkit'
import {
  chatDataStartHelper, chatDataSuccessHelper, chatDataFailureHelper, updateChatPopupsHelper,
  updateConversationsHelper, resetConversationsHelper,
} from './helper'

const initialState = {
  conversations: [],
  currentChatId: null,
  chatPopupIds: [],
  maxCount: 0,
}

const {
  actions: {
    chatDataRequestStart,
    chatDataRequestSuccess,
    chatDataRequestFailed,
    updateChatPopups,
    updatePopupsCount,
    updateConversations,
    updateCurrentChatId,
    resetConversations,
  }, reducer,
} = createSlice({
  name: 'chatData',
  initialState,
  reducers: {
    chatDataRequestStart: (state, action) => ({
      ...state,
      conversations: chatDataStartHelper({
        conversations: state.conversations,
        payload: action.payload,
      }),
    }),
    chatDataRequestSuccess: (state, action) => ({
      ...state,
      conversations: chatDataSuccessHelper({
        conversations: state.conversations,
        payload: action.payload,
      }),
    }),
    chatDataRequestFailed: (state, action) => ({
      ...state,
      conversations: chatDataFailureHelper({
        conversations: state.conversations,
        payload: action.payload,
      }),
    }),
    updateChatPopups: (state, action) => ({
      ...state,
      chatPopupIds: updateChatPopupsHelper({
        chatPopupIds: state.chatPopupIds,
        payload: action.payload,
        maxCount: state.maxCount,
      }),
    }),
    updatePopupsCount: (state, action) => ({
      ...state,
      maxCount: action.payload.maxCount,
    }),
    updateConversations: (state, action) => ({
      ...state,
      conversations: updateConversationsHelper({
        conversations: state.conversations,
        payload: action.payload,
      }),
    }),
    updateCurrentChatId: (state, action) => ({
      ...state,
      currentChatId: action.payload.conversationId,
    }),
    resetConversations: (state) => ({
      ...state,
      currentChatId: null,
      conversations: resetConversationsHelper({
        conversations: state.conversations,
        chatPopupIds: state.chatPopupIds,
      }),
    }),
  },
})

export default reducer
export {
  chatDataRequestStart,
  chatDataRequestSuccess,
  chatDataRequestFailed,
  updateChatPopups,
  updatePopupsCount,
  updateConversations,
  updateCurrentChatId,
  resetConversations,
}

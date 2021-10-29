import { createSlice } from '@reduxjs/toolkit'
import { ADD_CONVERSATION } from '../constants'
import {
  chatDataStartHelper, chatDataSuccessHelper, chatDataFailureHelper, updateChatPopupsHelper,
  updateConversationsHelper, resetConversationsHelper, resetPopupFlagsHelper, changePopupOpenStateHelper,
} from './helper'

const initialState = {
  conversations: [],
  currentChatId: null,
  chatPopups: [],
  maxCount: 0,
}

const {
  actions: {
    chatDataRequestStart,
    chatDataRequestSuccess,
    chatDataRequestFailed,
    updateChatPopups,
    updatePopupsCount,
    changePopupOpenState,
    updateConversations,
    updateCurrentChatId,
    resetConversations,
    resetPopupFlags,
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
      chatPopups: updateChatPopupsHelper({
        chatPopups: state.chatPopups,
        payload: action.payload,
        maxCount: state.maxCount,
      }),
    }),
    updatePopupsCount: (state, action) => ({
      ...state,
      maxCount: action.payload.maxCount,
    }),
    changePopupOpenState: (state, action) => ({
      ...state,
      chatPopups: changePopupOpenStateHelper({
        chatPopups: state.chatPopups,
        conversationId: action.payload.conversationId,
      }),
    }),
    updateConversations: (state, action) => ({
      ...state,
      currentChatId: action.payload?.dataType === ADD_CONVERSATION && state.conversations?.length === 0
        && action.payload?.newChat?.conversationId
        ? action.payload.newChat.conversationId
        : state.currentChatId,
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
        chatPopups: state.chatPopups,
      }),
    }),
    resetPopupFlags: (state, action) => ({
      ...state,
      chatPopups: resetPopupFlagsHelper({
        chatPopups: state.chatPopups,
        conversationId: action.payload.conversationId,
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
  changePopupOpenState,
  updateConversations,
  updateCurrentChatId,
  resetConversations,
  resetPopupFlags,
}

import { createSlice } from '@reduxjs/toolkit'
import {
  chatPopupsStartHelper, chatPopupsSuccessHelper, chatPopupsFailureHelper, updateChatPopupsHelper,
} from './helper'
import { popupChats } from '../../../containers/Chat/testData'

const initialState = {
  chatPopups: popupChats, // WIP - Remove test data
}

const {
  actions: {
    chatPopupsRequestStart,
    chatPopupsRequestSuccess,
    chatPopupsRequestFailed,
    updateChatPopups,
  }, reducer,
} = createSlice({
  name: 'chatPopups',
  initialState,
  reducers: {
    chatPopupsRequestStart: (state, action) => ({
      chatPopups: chatPopupsStartHelper({
        chatPopups: state.chatPopups,
        payload: action.payload,
      }),
    }),
    chatPopupsRequestSuccess: (state, action) => ({
      chatPopups: chatPopupsSuccessHelper({
        chatPopups: state.chatPopups,
        payload: action.payload,
      }),
    }),
    chatPopupsRequestFailed: (state, action) => ({
      chatPopups: chatPopupsFailureHelper({
        chatPopups: state.chatPopups,
        payload: action.payload,
      }),
    }),
    updateChatPopups: (state, action) => ({
      chatPopups: updateChatPopupsHelper({
        chatPopups: state.chatPopups,
        payload: action.payload,
      }),
    }),
  },
})

export default reducer
export {
  chatPopupsRequestStart,
  chatPopupsRequestSuccess,
  chatPopupsRequestFailed,
  updateChatPopups,
}

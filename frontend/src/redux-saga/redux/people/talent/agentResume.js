import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../../utils/common'
import { updateAgentResumeReducer } from '../helper'

const initialState = {
  isLoading: null,
  error: null,
  success: null,
  agentResume: {},
}

const {
  actions: {
    fetchAgentResumeStart,
    fetchAgentResumeSuccess,
    fetchAgentResumeFailed,
    updateAgentResume,
  }, reducer,
} = createSlice({
  name: 'agentResume',
  initialState,
  reducers: {
    fetchAgentResumeStart: (state) => ({
      ...state,
      isLoading: true,
    }),
    fetchAgentResumeSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      agentResume: getDataForReducer(action, initialState.agentResume, 'agentResume'),
    }),
    fetchAgentResumeFailed: (state) => ({
      ...state,
      isLoading: false,
      error: true,
      success: false,
    }),
    updateAgentResume: (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      agentResume: updateAgentResumeReducer({ state, action }),
    }),
  },
})

export default reducer
export {
  fetchAgentResumeStart,
  fetchAgentResumeSuccess,
  fetchAgentResumeFailed,
  updateAgentResume,
}

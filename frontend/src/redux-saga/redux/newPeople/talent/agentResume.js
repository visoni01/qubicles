import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../../utils/common'

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
  },
})

export default reducer
export {
  fetchAgentResumeStart,
  fetchAgentResumeSuccess,
  fetchAgentResumeFailed,
}

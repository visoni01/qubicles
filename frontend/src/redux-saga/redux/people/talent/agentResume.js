import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'
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
    updateAgentResume: (state) => ({
      ...state,
      isLoading: false,
      success: true,
      agentResume: {
        ...state.agentResume,
        isFollowing: state.agentResume && !state.agentResume.isFollowing,
        // eslint-disable-next-line no-nested-ternary
        followers: !_.isUndefined(state.agentResume.followers)
          ? (state.agentResume && state.agentResume.isFollowing
            ? state.agentResume.followers - 1
            : state.agentResume.followers + 1)
          : 0,
      },
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

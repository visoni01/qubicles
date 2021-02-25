import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../../../utils/common'

const initialState = {
  isLoading: null,
  error: null,
  success: null,
  agentJobsData: [],
}

const {
  actions: {
    fetchAgentJobsStart,
    fetchAgentJobsSuccess,
    fetchAgentJobsFailed,
    updateAgentJobs,
  }, reducer,
} = createSlice({
  name: 'agentJobsData',
  initialState,
  reducers: {
    fetchAgentJobsStart: (state) => ({
      ...state,
      isLoading: true,
    }),
    fetchAgentJobsSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      agentJobsData: getDataForReducer(action, initialState.agentJobsData, 'agentJobsData'),
    }),
    fetchAgentJobsFailed: (state) => ({
      ...state,
      isLoading: false,
      error: true,
      success: false,
    }),
    updateAgentJobs: (state, action) => ({
      ...state,
      // WIP updateAgentJobs
      // agentJobsData: getUpdatedAgentJobs({ state, payload: action.payload }),
      isLoading: false,
    }),
  },
})

export default reducer
export {
  fetchAgentJobsStart,
  fetchAgentJobsSuccess,
  fetchAgentJobsFailed,
  updateAgentJobs,
}

import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../../utils/common'

const initialState = {
  isLoading: null,
  error: null,
  success: null,
  agentResumeSkills: [],
}

const {
  actions: {
    fetchAgentResumeSkillsStart,
    fetchAgentResumeSkillsSuccess,
    fetchAgentResumeSkillsFailed,
  }, reducer,
} = createSlice({
  name: 'agentResumeSkills',
  initialState,
  reducers: {
    fetchAgentResumeSkillsStart: (state) => ({
      ...state,
      isLoading: true,
    }),
    fetchAgentResumeSkillsSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      agentResumeSkills: getDataForReducer(action, initialState.agentResumeSkills, 'agentResumeSkills'),
    }),
    fetchAgentResumeSkillsFailed: (state, action) => ({
      ...state,
      isLoading: false,
      error: true,
      success: false,
    }),
  },
})

export default reducer
export {
  fetchAgentResumeSkillsStart,
  fetchAgentResumeSkillsSuccess,
  fetchAgentResumeSkillsFailed,
}

import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../../utils/common'

const initialState = {
  isLoading: null,
  error: null,
  success: null,
  agentResumeSkills: {
    candidateId: null,
    skills: [],
  },
  requestType: '',
}

const {
  actions: {
    agentResumeSkillsStart,
    agentResumeSkillsSuccess,
    agentResumeSkillsFailed,
    resetAgentResumeSkillsFlags,
    resetAgentResumeSkillsData,
  }, reducer,
} = createSlice({
  name: 'agentResumeSkills',
  initialState,
  reducers: {
    agentResumeSkillsStart: (state, action) => ({
      ...state,
      isLoading: true,
      success: null,
      error: null,
      requestType: action.payload.requestType,

    }),
    agentResumeSkillsSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      error: false,
      agentResumeSkills: state.requestType === 'FETCH'
        ? getDataForReducer(action, initialState.agentResumeSkills, 'agentResumeSkills')
        : action.payload.agentResumeSkills,
    }),
    agentResumeSkillsFailed: (state) => ({
      ...state,
      isLoading: false,
      error: true,
      success: false,
    }),
    resetAgentResumeSkillsFlags: (state) => ({
      ...state,
      isLoading: null,
      success: null,
      error: null,
    }),
    resetAgentResumeSkillsData: () => ({
      ...initialState,
    }),
  },
})

export default reducer
export {
  agentResumeSkillsStart,
  agentResumeSkillsSuccess,
  agentResumeSkillsFailed,
  resetAgentResumeSkillsFlags,
  resetAgentResumeSkillsData,
}

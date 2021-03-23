import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../../utils/common'

const initialState = {
  isLoading: null,
  error: null,
  success: null,
  jobSkills: null,
}

const {
  actions: {
    fetchJobSkillsStart,
    fetchJobSkillsSuccess,
    fetchJobSkillsFailed,
  }, reducer,
} = createSlice({
  name: 'jobSkillsReducer',
  initialState,
  reducers: {
    fetchJobSkillsStart: (state) => ({
      ...state,
      isLoading: true,
    }),
    fetchJobSkillsSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      jobSkills: getDataForReducer(action, initialState.agentResumeSkills, 'jobSkills'),
    }),
    fetchJobSkillsFailed: (state) => ({
      ...state,
      isLoading: false,
      error: true,
      success: false,
    }),
  },
})

export default reducer
export {
  fetchJobSkillsStart,
  fetchJobSkillsSuccess,
  fetchJobSkillsFailed,
}

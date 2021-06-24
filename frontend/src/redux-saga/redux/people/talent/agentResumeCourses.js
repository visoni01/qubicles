import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../../utils/common'

const initialState = {
  isLoading: null,
  error: null,
  success: null,
  courses: [],
}

const {
  actions: {
    fetchAgentResumeCoursesStart,
    fetchAgentResumeCoursesSuccess,
    fetchAgentResumeCoursesFailed,
  }, reducer,
} = createSlice({
  name: 'agentResumeCourses',
  initialState,
  reducers: {
    fetchAgentResumeCoursesStart: (state) => ({
      ...state,
      isLoading: true,
    }),
    fetchAgentResumeCoursesSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      courses: getDataForReducer(action, initialState.courses, 'agentCourses'),
    }),
    fetchAgentResumeCoursesFailed: (state) => ({
      ...state,
      isLoading: false,
      error: true,
      success: false,
    }),
  },
})

export default reducer
export {
  fetchAgentResumeCoursesStart,
  fetchAgentResumeCoursesSuccess,
  fetchAgentResumeCoursesFailed,
}

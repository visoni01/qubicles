import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: null,
  error: null,
  success: null,
  courses: [],
  requestType: null,
}

const {
  actions: {
    allCoursesRequestStart,
    allCoursesRequestSuccess,
    allCoursesRequestFailed,
  }, reducer,
} = createSlice({
  name: 'allCourses',
  initialState,
  reducers: {
    allCoursesRequestStart: (state, action) => ({
      ...state,
      isLoading: true,
      success: null,
      error: null,
      requestType: action.payload.requestType,
    }),
    allCoursesRequestSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      courses: action.payload.courses,
    }),
    allCoursesRequestFailed: (state) => ({
      ...state,
      isLoading: false,
      error: true,
      success: false,
    }),
  },
})

export default reducer
export {
  allCoursesRequestStart,
  allCoursesRequestSuccess,
  allCoursesRequestFailed,
}

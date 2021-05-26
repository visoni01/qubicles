import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: null,
  error: null,
  success: null,
  enrolledCourses: [],
}

const {
  actions: {
    enrolledCoursesRequestStart,
    enrolledCoursesRequestSuccess,
    enrolledCoursesRequestFailed,
    resetEnrolledCoursesReducer,
  }, reducer,
} = createSlice({
  name: 'enrolledCourses',
  initialState,
  reducers: {
    enrolledCoursesRequestStart: (state) => ({
      ...state,
      isLoading: true,
      success: null,
      error: null,
    }),
    enrolledCoursesRequestSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      error: false,
      enrolledCourses: action.payload.enrolledCourses,
    }),
    enrolledCoursesRequestFailed: (state) => ({
      ...state,
      isLoading: false,
      error: true,
      success: false,
    }),
    resetEnrolledCoursesReducer: () => ({
      ...initialState,
    }),
  },
})

export default reducer
export {
  enrolledCoursesRequestStart,
  enrolledCoursesRequestSuccess,
  enrolledCoursesRequestFailed,
  resetEnrolledCoursesReducer,
}

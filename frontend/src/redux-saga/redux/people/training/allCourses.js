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
    resetAllCoursesReducer,
    updateAllCoursesReducer,
  }, reducer,
} = createSlice({
  name: 'allCourses',
  initialState,
  reducers: {
    allCoursesRequestStart: (state, action) => ({
      ...state,
      isLoading: true,
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
    resetAllCoursesReducer: () => ({
      ...initialState,
    }),
    updateAllCoursesReducer: (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      courses: [
        ...state.courses,
        {
          ...(state.courses.filter((course) => course.courseId === action.payload.newCourseId)[ 0 ]),
          courseId: action.payload.courseId,
          status: 'draft',
        },
      ],
    }),
  },
})

export default reducer
export {
  allCoursesRequestStart,
  allCoursesRequestSuccess,
  allCoursesRequestFailed,
  resetAllCoursesReducer,
  updateAllCoursesReducer,
}

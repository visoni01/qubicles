import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: null,
  error: null,
  success: null,
  course: {
    informationSection: {
      title: '',
      category: null,
      price: 0,
      visibility: 'public',
      summary: '',
      goals: '',
      outcomes: '',
      preRequisites: '',
      requiredCourses: [],
    },
    contentSection: {
      thumbnailImage: null,
      introductionVideo: null,
    },
  },
  requestType: null,
}

const {
  actions: {
    trainingCourseRequestStart,
    trainingCourseRequestSuccess,
    trainingCourseRequestFailed,
    updateTrainingCourseDetails,
  }, reducer,
} = createSlice({
  name: 'trainingCourse',
  initialState,
  reducers: {
    trainingCourseRequestStart: (state, action) => ({
      ...state,
      isLoading: true,
      success: null,
      error: null,
      requestType: action.payload.requestType,
    }),
    trainingCourseRequestSuccess: (state) => ({
      ...state,
      isLoading: false,
      success: true,
    }),
    trainingCourseRequestFailed: (state) => ({
      ...state,
      isLoading: false,
      error: true,
      success: false,
    }),
    updateTrainingCourseDetails: (state, action) => ({
      ...state,
      course: action.payload.course,
    }),
  },
})

export default reducer
export {
  trainingCourseRequestStart,
  trainingCourseRequestSuccess,
  trainingCourseRequestFailed,
  updateTrainingCourseDetails,
}

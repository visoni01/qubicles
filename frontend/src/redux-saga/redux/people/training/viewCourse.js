import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: null,
  error: null,
  success: null,
  course: {
    isEnrolled: false,
    courseId: null,
    createdOn: '',
    updatedOn: '',
    studentsEnrolled: null,
    rating: null,
    informationSection: {
      title: '',
      category: null,
      categoryTitle: '',
      price: null,
      visibility: 'public',
      description: '',
      goals: '',
      outcomes: '',
      requirements: '',
      language: '',
      creatorId: null,
      requiredCourses: [],
    },
    contentSection: {
      thumbnailImage: null,
      introductionVideo: null,
    },
    courseContent: {
      sections: [],
    },
  },
  requestType: '',
}

const {
  actions: {
    viewCourseRequestStart,
    viewCourseRequestSuccess,
    viewCourseRequestFailed,
    resetViewCourseFlags,
    resetViewCourseReducer,
  }, reducer,
} = createSlice({
  name: 'viewCourse',
  initialState,
  reducers: {
    viewCourseRequestStart: (state, action) => ({
      ...state,
      isLoading: true,
      success: null,
      error: null,
      requestType: action.payload.requestType,
    }),
    viewCourseRequestSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      error: false,
      course: action.payload.dataType === 'Course Info' ? action.payload.course : null,
    }),
    viewCourseRequestFailed: (state) => ({
      ...state,
      isLoading: false,
      error: true,
      success: false,
    }),
    resetViewCourseFlags: (state) => ({
      ...state,
      isLoading: null,
      error: null,
      success: null,
    }),
    resetViewCourseReducer: () => ({
      ...initialState,
    }),
  },
})

export default reducer
export {
  viewCourseRequestStart,
  viewCourseRequestSuccess,
  viewCourseRequestFailed,
  resetViewCourseFlags,
  resetViewCourseReducer,
}

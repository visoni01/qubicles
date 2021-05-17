import { createSlice } from '@reduxjs/toolkit'
import { getUpdatedCourse } from '../helper'

const initialState = {
  isLoading: null,
  error: null,
  success: null,
  course: {
    currentUnitIndex: null,
    currentSectionIndex: null,
    isIntroVideoActive: null,
    isSectionTestActive: null,
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
      creatorName: '',
      requiredCourses: [],
    },
    contentSection: {
      thumbnailImage: null,
      introductionVideo: null,
    },
    courseContent: {
      sections: [],
    },
    courseDetails: {
      dateStarted: null,
      dateCompleted: null,
      status: '',
      grade: null,
      certificate: null,
      endorsed: null,
    },
  },
  assessmentTest: [],
  requestType: '',
  dataType: '',
}

const {
  actions: {
    viewCourseRequestStart,
    viewCourseRequestSuccess,
    viewCourseRequestFailed,
    updateCurrentUnitAndSectionIndex,
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
      dataType: action.payload.dataType,
    }),
    viewCourseRequestSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      error: false,
      course: getUpdatedCourse({ state, action }),
    }),
    viewCourseRequestFailed: (state) => ({
      ...state,
      isLoading: false,
      error: true,
      success: false,
    }),
    updateCurrentUnitAndSectionIndex: (state, action) => ({
      ...state,
      course: {
        ...state.course,
        ...action.payload,
      },
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
  updateCurrentUnitAndSectionIndex,
  resetViewCourseFlags,
  resetViewCourseReducer,
}

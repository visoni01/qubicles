import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'
import { getUniqueId } from '../../../../utils/common'

const initialState = {
  isLoading: null,
  error: null,
  success: null,
  course: {
    courseId: null,
    createdOn: '',
    updatedOn: '',
    status: '',
    informationSection: {
      title: '',
      category: null,
      categoryTitle: '',
      price: 1,
      visibility: 'public',
      description: '',
      goals: '',
      outcomes: '',
      requirements: '',
      creatorId: null,
      language: 'English',
      requiredCourses: [],
    },
    contentSection: {
      thumbnailImage: null,
      introductionVideo: null,
    },
    courseContent: {
      sections: [ {
        id: getUniqueId(),
        title: 'Section 1',
        isEdit: true,
        sectionNum: '1',
        sectionIsActive: true,
        units: [],
        test: {},
      } ],
    },
  },
  uploadProgressData: null,
  requestType: null,
  dataType: null,
  currentFileUrl: null,
}

const {
  actions: {
    trainingCourseRequestStart,
    trainingCourseRequestSuccess,
    trainingCourseRequestFailed,
    updateTrainingCourseDetails,
    resetTrainingCourseReducer,
    resetTrainingCourseReducerFlags,
    uploadProgress,
    updateCurrentFileUrl,
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
      dataType: action.payload.dataType,
    }),
    trainingCourseRequestSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      course: {
        ...state.course,
        ...action.payload.course,
        courseContent: action.payload.course.courseContent ? {
          ...action.payload.course.courseContent,
          sections: !_.isEmpty(action.payload.course.courseContent.sections)
            ? action.payload.course.courseContent.sections
            : initialState.course.courseContent.sections,
        } : initialState.course.courseContent,
      },
      uploadProgressData: 0,
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
    resetTrainingCourseReducer: () => ({
      ...initialState,
    }),
    resetTrainingCourseReducerFlags: (state) => ({
      ...state,
      isLoading: null,
      requestType: null,
      dataType: null,
      success: null,
      error: null,
      currentFileUrl: null,
    }),
    uploadProgress: (state, action) => ({
      ...state,
      uploadProgressData: action.payload.uploadProgressData,
    }),
    updateCurrentFileUrl: (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      currentFileUrl: action.payload.currentFileUrl,
      uploadProgressData: 0,
    }),
  },
})

export default reducer
export {
  trainingCourseRequestStart,
  trainingCourseRequestSuccess,
  trainingCourseRequestFailed,
  updateTrainingCourseDetails,
  resetTrainingCourseReducer,
  resetTrainingCourseReducerFlags,
  uploadProgress,
  updateCurrentFileUrl,
}

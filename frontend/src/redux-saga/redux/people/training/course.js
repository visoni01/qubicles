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
      creatorId: null,
      language: 'english',
      requiredCourses: [],
    },
    contentSection: {
      thumbnailImage: null,
      introductionVideo: null,
    },
    courseContent: {
      sections: [ {
        id: 0,
        title: 'Section',
        sectionNum: 1,
        sectionIsActive: true,
        units: [ {
          unitId: 0,
          sectionId: 0,
          unitNum: '1',
          title: 'Unit',
          details: 'sdg',
          length: 0,
          type: 'Article',
          isEmpty: true,
        } ],
      } ],
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

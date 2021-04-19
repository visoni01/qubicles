import { createSlice } from '@reduxjs/toolkit'
import { getUniqueId } from '../../../../utils/common'

const initialState = {
  isLoading: null,
  error: null,
  success: null,
  course: {
    courseId: null,
    informationSection: {
      title: '',
      category: null,
      price: 0,
      visibility: 'public',
      description: '',
      goals: '',
      outcomes: '',
      requirements: '',
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
          unitId: getUniqueId(),
          unitNum: '1',
          title: 'Unit 1',
          details: '',
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

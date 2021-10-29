import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'
import { getDataForReducer } from '../../../../utils/common'

const initialState = {
  isLoading: null,
  error: null,
  success: false,
  courses: [],
  count: null,
  companyId: 0,
  companyName: 'All',
  courseFilter: 'mostPopular',
  offset: 0,
  currentPage: 1,
}

const {
  actions: {
    companyCoursesFetchStart,
    companyCoursesFetchSuccessful,
    companyCoursesFetchFailure,
    updateCompanyCoursesFilter,
    updateCompanyCoursesCurrentPage,
    resetCompanyCoursesReducer,
  },
  reducer,
} = createSlice({
  name: 'companyCourses',
  initialState,
  reducers: {
    companyCoursesFetchStart: (state) => ({
      ...state,
      isLoading: true,
    }),
    companyCoursesFetchSuccessful: (state, action) => ({
      ...state,
      success: true,
      isLoading: false,
      courses: getDataForReducer(action, initialState.courses, 'courses'),
      count: getDataForReducer(action, initialState.count, 'count'),
    }),
    companyCoursesFetchFailure: (state) => ({
      ...state,
      error: true,
      isLoading: false,
    }),
    updateCompanyCoursesFilter: (state, action) => ({
      ...state,
      companyId: !_.isUndefined(action.payload.companyId) ? action.payload.companyId : state.companyId,
      companyName: !_.isUndefined(action.payload.companyName) ? action.payload.companyName : state.companyName,
      offset: !_.isUndefined(action.payload.offset) ? action.payload.offset : 0,
      courseFilter: action.payload.courseFilter ? action.payload.courseFilter : state.courseFilter,
      currentPage: action.payload.currentPage ? action.payload.currentPage : state.currentPage,
    }),
    updateCompanyCoursesCurrentPage: (state, action) => ({
      ...state,
      currentPage: action.payload.currentPage,
    }),
    resetCompanyCoursesReducer: (state) => ({
      ...initialState,
      companyId: state.companyId,
      companyName: state.companyName,
      courseFilter: state.courseFilter,
      offset: state.offset,
      currentPage: state.currentPage,
    }),
  },
})

export default reducer
export {
  companyCoursesFetchStart,
  companyCoursesFetchSuccessful,
  companyCoursesFetchFailure,
  updateCompanyCoursesFilter,
  updateCompanyCoursesCurrentPage,
  resetCompanyCoursesReducer,
}

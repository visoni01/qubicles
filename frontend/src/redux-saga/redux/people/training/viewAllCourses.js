import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../../utils/common'
// eslint-disable-next-line import/no-cycle

const initialState = {
  isLoading: null,
  error: null,
  success: false,
  courses: [],
  count: null,
  searchField: '',
  categoryId: 0,
  courseFilter: 'mostPopular',
  offset: 0,
  currentPage: 1,
}

const {
  actions: {
    viewAllCoursesFetchStart,
    viewAllCoursesFetchSuccessful,
    viewAllCoursesFetchFailure,
    updateViewAllCoursesFilter,
    updateCurrentPage,
  },
  reducer,
} = createSlice({
  name: 'viewAllCourses',
  initialState,
  reducers: {
    viewAllCoursesFetchStart: (state) => ({
      ...state,
      isLoading: true,
    }),
    viewAllCoursesFetchSuccessful: (state, action) => ({
      ...state,
      success: true,
      isLoading: false,
      courses: getDataForReducer(action, initialState.courses, 'courses'),
      count: getDataForReducer(action, initialState.count, 'count'),
    }),
    viewAllCoursesFetchFailure: (state) => ({
      ...state,
      error: true,
      isLoading: false,
    }),
    updateViewAllCoursesFilter: (state, action) => ({
      ...state,
      searchField: action.payload.searchField !== undefined ? action.payload.searchField : state.searchField,
      categoryId: action.payload.categoryId !== undefined ? action.payload.categoryId : state.categoryId,
      offset: action.payload.offset !== undefined ? action.payload.offset : 0,
      courseFilter: action.payload.courseFilter ? action.payload.courseFilter : state.courseFilter,
      currentPage: action.payload.currentPage ? action.payload.currentPage : state.currentPage,
    }),
    updateCurrentPage: (state, action) => ({
      ...state,
      currentPage: action.payload.currentPage,
    }),
  },
})

export default reducer
export {
  viewAllCoursesFetchStart,
  viewAllCoursesFetchSuccessful,
  viewAllCoursesFetchFailure,
  updateViewAllCoursesFilter,
  updateCurrentPage,
}

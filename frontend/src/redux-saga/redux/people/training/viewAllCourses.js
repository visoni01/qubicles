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
  courseFilter: 'most popular',
  offset: null,
}

const {
  actions: {
    viewAllCoursesFetchStart,
    viewAllCoursesFetchSuccessful,
    viewAllCoursesFetchFailure,
    updateViewAllCoursesFilter,
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
      searchField: action.payload.searchField,
      categoryId: action.payload.categoryId,
      offset: action.payload.offset ? action.payload.offset : state.offset,
      courseFilter: action.payload.courseFilter ? action.payload.courseFilter : state.courseFilter,
    }),
  },
})

export default reducer
export {
  viewAllCoursesFetchStart,
  viewAllCoursesFetchSuccessful,
  viewAllCoursesFetchFailure,
  updateViewAllCoursesFilter,
}

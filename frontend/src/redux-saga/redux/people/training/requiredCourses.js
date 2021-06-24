import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: null,
  success: null,
  error: null,
  searchKeyword: '',
  offset: 0,
  count: 0,
  viewMore: false,
  allCourses: [],
}

const {
  actions: {
    requiredCoursesFetchStart,
    requiredCoursesFetchSuccess,
    requiredCoursesFetchFailure,
  },
  reducer,
} = createSlice({
  name: 'requiredCourses',
  initialState,
  reducers: {
    requiredCoursesFetchStart: (state, action) => ({
      ...state,
      isLoading: true,
      success: false,
      error: false,
      searchKeyword: action.payload.searchKeyword,
      offset: action.payload.offset,
      viewMore: action.payload.searchKeyword === state.searchKeyword,
    }),
    requiredCoursesFetchSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      error: false,
      allCourses: state.viewMore ? [ ...state.allCourses, ...action.payload.courses ] : action.payload.courses,
      count: action.payload.count,
    }),
    requiredCoursesFetchFailure: (state) => ({
      ...state,
      isLoading: false,
      success: false,
      error: true,
    }),
  },
})

export default reducer
export {
  requiredCoursesFetchStart,
  requiredCoursesFetchSuccess,
  requiredCoursesFetchFailure,
}

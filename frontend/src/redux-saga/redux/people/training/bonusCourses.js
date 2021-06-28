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
    bonusCoursesFetchStart,
    bonusCoursesFetchSuccess,
    bonusCoursesFetchFailure,
    resetBonusCoursesReducer,
  },
  reducer,
} = createSlice({
  name: 'bonusCourses',
  initialState,
  reducers: {
    bonusCoursesFetchStart: (state, action) => ({
      ...state,
      isLoading: true,
      success: false,
      error: false,
      searchKeyword: action.payload.searchKeyword,
      offset: action.payload.offset,
      viewMore: action.payload.searchKeyword === state.searchKeyword,
    }),
    bonusCoursesFetchSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      error: false,
      allCourses: state.viewMore ? [ ...state.allCourses, ...action.payload.courses ] : action.payload.courses,
      count: action.payload.count,
    }),
    bonusCoursesFetchFailure: (state) => ({
      ...state,
      isLoading: false,
      success: false,
      error: true,
    }),
    resetBonusCoursesReducer: () => initialState,
  },
})

export default reducer
export {
  bonusCoursesFetchStart,
  bonusCoursesFetchSuccess,
  bonusCoursesFetchFailure,
  resetBonusCoursesReducer,
}

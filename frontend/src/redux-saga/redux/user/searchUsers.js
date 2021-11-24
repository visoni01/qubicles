import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  error: null,
  success: false,
  usersList: [],
  offset: 0,
  resultCount: null,
  searchString: '',
  viewMore: false,
}

const {
  actions: {
    userSearchStart,
    userSearchSuccessful,
    userSearchFailure,
    clearSearchResults,
  },
  reducer,
} = createSlice({
  name: 'searchUsers',
  initialState,
  reducers: {
    userSearchStart: (state, action) => ({
      ...state,
      loading: true,
      offset: action.payload.offset,
      searchString: action.payload.searchString,
      viewMore: state.searchString === action.payload.searchString,
    }),
    userSearchSuccessful: (state, action) => ({
      ...state,
      success: true,
      loading: false,
      usersList: state.viewMore ? [ ...state.usersList, ...action.payload.usersList ] : action.payload.usersList,
      resultCount: action.payload.count,
      viewMore: false,
    }),
    userSearchFailure: (state) => ({
      ...state,
      searchString: '',
      loading: false,
      success: false,
      error: true,
    }),
    clearSearchResults: () => ({
      ...initialState,
    }),
  },
})

export default reducer
export {
  userSearchStart,
  userSearchSuccessful,
  userSearchFailure,
  clearSearchResults,
}

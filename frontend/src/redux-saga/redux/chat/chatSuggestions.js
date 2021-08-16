import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: null,
  error: null,
  success: null,
  offset: 0,
  searchKeyword: '',
  count: 0,
  users: [],
}

const {
  actions: {
    chatSuggestionsFetchStart,
    chatSuggestionsFetchSuccess,
    chatSuggestionsFetchFailed,
    resetChatSuggestionsReducer,
  }, reducer,
} = createSlice({
  name: 'chatSuggestions',
  initialState,
  reducers: {
    chatSuggestionsFetchStart: (state, action) => ({
      ...state,
      isLoading: true,
      success: null,
      error: null,
      offset: action.payload.offset,
      searchKeyword: action.payload.searchKeyword,
    }),
    chatSuggestionsFetchSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      error: false,
      users: action.payload.users,
    }),
    chatSuggestionsFetchFailed: (state) => ({
      ...state,
      isLoading: false,
      error: true,
      success: false,
    }),
    resetChatSuggestionsReducer: () => ({
      ...initialState,
    }),
  },
})

export default reducer
export {
  chatSuggestionsFetchStart,
  chatSuggestionsFetchSuccess,
  chatSuggestionsFetchFailed,
  resetChatSuggestionsReducer,
}

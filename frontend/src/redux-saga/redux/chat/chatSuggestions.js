import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: null,
  error: null,
  success: null,
  offset: 0,
  searchKeyword: '',
  more: false,
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
      offset: action.payload.offset || 0,
      searchKeyword: action.payload.searchKeyword || '',
      more: false,
    }),
    chatSuggestionsFetchSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      error: false,
      users: state.offset === 0 ? action.payload.users : [ ...state.users, ...action.payload.users ],
      more: action.payload.more,
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

import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../utils/common'

const initialState = {
  isLoading: null,
  error: null,
  success: false,
  activeUsers: [],
}

const {
  actions: {
    activeUserDataFetchingStart,
    activeUserDataFetchingSuccessful,
    activeUserDataFetchingFailure,
  },
  reducer,
} = createSlice({
  name: 'activeUser',
  initialState,
  reducers: {
    activeUserDataFetchingStart: (state) => ({
      ...state,
      isLoading: true,
    }),
    activeUserDataFetchingSuccessful: (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      activeUsers: getDataForReducer(action, initialState.activeUsers, 'activeUsers'),
    }),
    activeUserDataFetchingFailure: (state) => ({
      ...state,
      error: true,
      isLoading: false,
    }),
  },
})

export default reducer
export {
  activeUserDataFetchingStart,
  activeUserDataFetchingSuccessful,
  activeUserDataFetchingFailure,
}

import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../utils/common'

const initialState = {
  isLoading: null,
  error: null,
  success: false,
  userData: {},
}

const {
  actions: {
    userDataFetchStart,
    userDataFetchSuccessful,
    userDataFetchFailure,
    resetUserData,
  },
  reducer,
} = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    userDataFetchStart: () => ({
      ...initialState,
      isLoading: true,
    }),
    userDataFetchSuccessful: (state, action) => ({
      ...state,
      success: true,
      isLoading: false,
      userData: getDataForReducer(action, initialState.userData, 'userData'),
    }),
    userDataFetchFailure: (state) => ({
      ...state,
      error: true,
      isLoading: false,
    }),
    resetUserData: (state) => ({
      ...state,
      userData: {},
      error: true,
      isLoading: false,
    }),
  },
})

export default reducer
export {
  userDataFetchStart,
  userDataFetchSuccessful,
  userDataFetchFailure,
  resetUserData,
}

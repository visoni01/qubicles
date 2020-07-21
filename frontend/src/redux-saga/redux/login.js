import { createSlice } from '@reduxjs/toolkit'
import { getUserDetails } from '../../utils/common'

const initialState = {
  loading: null,
  error: null,
  success: false,
  // Setting the state when app render and user refresh the page
  userDetails: getUserDetails(),
}

const {
  actions: {
    userLoginStart, userLoginSuccessful, userLoginFailure, userLogoutSuccessful, clearStore,
  },
  reducer,
} = createSlice({
  name: 'login',
  initialState,
  reducers: {
    userLoginStart: (state) => ({
      ...state,
      isLoading: true,
      success: false,
      error: null,
    }),
    userLoginSuccessful: (state, action) => ({
      ...state,
      success: true,
      isLoading: false,
      error: null,
      userDetails: action.payload.userDetails,
    }),
    userLoginFailure: (state) => ({
      ...state,
      error: true,
      isLoading: false,
      success: true,
    }),
    userLogoutSuccessful: (state) => ({
      ...state,
      error: false,
      isLoading: false,
      success: false,
      userDetails: null,
    }),
    clearStore: (state) => ({
      ...state,
      error: false,
      isLoading: false,
      success: false,
    }),
  },
})

export default reducer
export {
  userLoginStart, userLoginSuccessful, userLoginFailure, userLogoutSuccessful, clearStore,
}

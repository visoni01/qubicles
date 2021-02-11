import { createSlice } from '@reduxjs/toolkit'
import { getUserDetails } from '../../utils/common'

const initialState = {
  loading: null,
  error: null,
  success: false,
  // Setting the state when app render and user refresh the page
  userDetails: getUserDetails(),
  showVerifyMailButton: false,
  socialLogin: true,
  openInvitePopup: false,
}

const {
  actions: {
    userLoginStart,
    userLoginSuccessful,
    userLoginFailure,
    userLogoutSuccessful,
    clearStore,
    setIsSocialLogin,
    userUpdateStart,
    userUpdateSuccess,
    setShowVerifyMailButton,
    resetShowVerifyMailButton,
    resetUserDetails,
    showInvitePopup,
    hideInvitePopup,
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
    userUpdateStart: (state) => ({
      ...state,
      error: false,
      isLoading: true,
      success: false,
    }),
    userUpdateSuccess: (state) => ({
      ...state,
      error: false,
      isLoading: false,
      success: true,
      userDetails: getUserDetails(),
    }),
    setShowVerifyMailButton: (state) => ({
      ...state,
      showVerifyMailButton: true,
    }),
    resetShowVerifyMailButton: (state) => ({
      ...state,
      showVerifyMailButton: false,
    }),
    setIsSocialLogin: (state, action) => ({
      ...state,
      socialLogin: !!action.payload,
    }),
    resetUserDetails: (state) => ({
      ...state,
      userDetails: getUserDetails(),
    }),
    showInvitePopup: (state) => ({
      ...state,
      openInvitePopup: true,
    }),
    hideInvitePopup: (state) => ({
      ...state,
      openInvitePopup: false,
    }),
  },
})

export default reducer
export {
  userLoginStart,
  userLoginSuccessful,
  userLoginFailure,
  userLogoutSuccessful,
  clearStore,
  userUpdateStart,
  userUpdateSuccess,
  setShowVerifyMailButton,
  resetShowVerifyMailButton,
  setIsSocialLogin,
  resetUserDetails,
  showInvitePopup,
  hideInvitePopup,
}

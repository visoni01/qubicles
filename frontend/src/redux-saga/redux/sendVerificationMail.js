import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: null,
  error: null,
  success: false,
}

const {
  actions: {
    sendVerificationMailStart,
    sendVerificationMailSuccessful,
    sendVerificationMailFailure,
    resetSendVerificationMail,
  },
  reducer,
} = createSlice({
  name: 'sendVerificationMail',
  initialState,
  reducers: {
    sendVerificationMailStart: () => ({
      ...initialState,
      isLoading: true,
    }),
    sendVerificationMailSuccessful: (state, action) => ({
      ...initialState,
      success: true,
      isLoading: false,
    }),
    sendVerificationMailFailure: (state, action) => ({
      ...initialState,
      error: true,
      isLoading: false,
    }),
    resetSendVerificationMail: () => ({
      ...initialState,
    }),
  },
})

export default reducer
export {
  sendVerificationMailStart,
  sendVerificationMailSuccessful,
  sendVerificationMailFailure,
  resetSendVerificationMail,
}

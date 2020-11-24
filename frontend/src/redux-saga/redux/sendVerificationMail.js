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
    sendVerificationMailReset,
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
    sendVerificationMailSuccessful: () => ({
      ...initialState,
      success: true,
      isLoading: false,
    }),
    sendVerificationMailFailure: () => ({
      ...initialState,
      error: true,
      isLoading: false,
    }),
    sendVerificationMailReset: () => ({
      ...initialState,
    }),
  },
})

export default reducer
export {
  sendVerificationMailStart,
  sendVerificationMailSuccessful,
  sendVerificationMailFailure,
  sendVerificationMailReset,
}

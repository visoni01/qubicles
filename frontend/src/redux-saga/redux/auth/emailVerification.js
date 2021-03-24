import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: null,
  error: null,
  success: false,
  email: null,
  tokenType: null,
}

const {
  actions: {
    emailVerificationStart,
    emailVerificationSuccessful,
    emailVerificationFailure,
  },
  reducer,
} = createSlice({
  name: 'emailVerification',
  initialState,
  reducers: {
    emailVerificationStart: () => ({
      ...initialState,
      isLoading: true,
    }),
    emailVerificationSuccessful: (state, action) => ({
      ...initialState,
      success: true,
      isLoading: false,
      email: action.payload.email,
      tokenType: action.payload.token_type,
    }),
    emailVerificationFailure: () => ({
      ...initialState,
      error: true,
      isLoading: false,
    }),
  },
})

export default reducer
export {
  emailVerificationStart,
  emailVerificationSuccessful,
  emailVerificationFailure,
}

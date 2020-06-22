import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: null,
  error: null,
  success: false,
}

const {
  actions: {
    emailVerificationStart,
    emailVerificationSuccessful,
    emailVerificationFailure,
  },
  reducer,
} = createSlice({
  name: 'signup',
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
    }),
    emailVerificationFailure: (state, action) => ({
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

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: null,
  error: null,
  success: false,
}

const {
  actions: { userSignupStart, userSignupSuccessful, userSignupFailure },
  reducer,
} = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    userSignupStart: () => ({
      ...initialState,
      isLoading: true,
    }),
    userSignupSuccessful: () => ({
      ...initialState,
      success: true,
    }),
    userSignupFailure: () => ({
      ...initialState,
      error: true,
    }),
  },
})

export default reducer
export { userSignupStart, userSignupSuccessful, userSignupFailure }

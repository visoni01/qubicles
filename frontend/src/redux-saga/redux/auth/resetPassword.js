import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: null,
  error: null,
  success: false,
}

const {
  actions: {
    resetPasswordStart,
    resetPasswordSuccessful,
    resetPasswordFailure,
  },
  reducer,
} = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {
    resetPasswordStart: () => ({
      ...initialState,
      isLoading: true,
    }),
    resetPasswordSuccessful: () => ({
      ...initialState,
      success: true,
      isLoading: false,
    }),
    resetPasswordFailure: () => ({
      ...initialState,
      error: true,
      isLoading: false,
    }),
  },
})

export default reducer
export {
  resetPasswordStart,
  resetPasswordSuccessful,
  resetPasswordFailure,
}

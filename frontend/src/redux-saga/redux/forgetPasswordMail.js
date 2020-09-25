import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: null,
  error: null,
  success: false,
}

const {
  actions: {
    forgetPasswordMailStart,
    forgetPasswordMailSuccessful,
    forgetPasswordMailFailure,
    forgetPasswordMailReset,
  },
  reducer,
} = createSlice({
  name: 'forgetPasswordMail',
  initialState,
  reducers: {
    forgetPasswordMailStart: () => ({
      ...initialState,
      isLoading: true,
    }),
    forgetPasswordMailSuccessful: (state, action) => ({
      ...initialState,
      success: true,
      isLoading: false,
    }),
    forgetPasswordMailFailure: (state, action) => ({
      ...initialState,
      error: true,
      isLoading: false,
    }),
    forgetPasswordMailReset: () => ({
      ...initialState,
    }),
  },
})

export default reducer
export {
  forgetPasswordMailStart,
  forgetPasswordMailSuccessful,
  forgetPasswordMailFailure,
  forgetPasswordMailReset,
}

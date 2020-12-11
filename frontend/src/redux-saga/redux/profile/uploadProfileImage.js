import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: null,
  error: null,
  success: null,
}

const {
  actions: {
    uploadProfileImageStart,
    uploadProfileImageFailed,
    uploadProfileImageSuccess,
  },
  reducer,
} = createSlice({
  name: 'uploadProfileImage',
  initialState,
  reducers: {
    uploadProfileImageStart: (state) => ({
      ...state,
      isLoading: true,
    }),
    uploadProfileImageFailed: (state) => ({
      ...state,
      isLoading: false,
      success: false,
    }),
    uploadProfileImageSuccess: (state) => ({
      ...state,
      isLoading: false,
      success: true,
    }),
  },
})

export default reducer
export {
  uploadProfileImageStart,
  uploadProfileImageFailed,
  uploadProfileImageSuccess,
}

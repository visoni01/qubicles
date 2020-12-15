import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  uploadingImage: null,
  error: null,
  uploadSuccess: null,
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
      uploadingImage: true,
    }),
    uploadProfileImageFailed: (state) => ({
      ...state,
      uploadingImage: false,
      uploadSuccess: false,
    }),
    uploadProfileImageSuccess: (state) => ({
      ...state,
      uploadingImage: false,
      uploadSuccess: true,
    }),
  },
})

export default reducer
export {
  uploadProfileImageStart,
  uploadProfileImageFailed,
  uploadProfileImageSuccess,
}

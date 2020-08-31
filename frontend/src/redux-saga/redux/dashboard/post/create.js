import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: null,
  error: null,
  success: null,
}

const {
  actions: {
    createStatusPostStart,
    createStatusPostFailed,
    createStatusPostSuccess,
  },
  reducer,
} = createSlice({
  name: 'post',
  initialState,
  reducers: {
    createStatusPostStart: (state) => ({
      ...state,
      isLoading: true,
    }),
    createStatusPostFailed: (state) => ({
      ...state,
      isLoading: false,
      success: false,
    }),
    createStatusPostSuccess: (state) => ({
      ...state,
      isLoading: false,
      success: true,
    }),
  },
})

export default reducer
export {
  createStatusPostStart,
  createStatusPostFailed,
  createStatusPostSuccess,
}

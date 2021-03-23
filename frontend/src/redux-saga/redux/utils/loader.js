import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: null,
}

const {
  actions: {
    startLoader,
    stopLoader,
  },
  reducer,
} = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    startLoader: (state) => ({
      ...state,
      loading: true,
    }),
    stopLoader: (state) => ({
      ...state,
      loading: false,
    }),
  },
})

export default reducer
export {
  startLoader,
  stopLoader,
}

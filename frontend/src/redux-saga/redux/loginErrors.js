import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showVerifyMailButton: false,
}

const {
  actions: {
    setShowVerifyMailButton,
  },
  reducer,
} = createSlice({
  name: 'loginErrors',
  initialState,
  reducers: {
    setShowVerifyMailButton: (state, action) => ({
      ...state,
      showVerifyMailButton: action.playload,
    }),
  },
})

export default reducer
export {
  setShowVerifyMailButton,
}

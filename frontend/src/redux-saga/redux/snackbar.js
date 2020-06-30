import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  open: null,
  msg: null,
  error: false,
}

const {
  actions: {
    showSuccessMessage,
    showErrorMessage,
    hideMessage,
  },
  reducer,
} = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSuccessMessage: (state, action) => {
      const msg = action && action.payload && action.payload.msg
      return {
        ...initialState,
        open: true,
        msg: msg || 'Request has been successfully performed!',
      }
    },
    showErrorMessage: (state, action) => {
      const msg = action && action.payload && action.payload.msg
      return {
        ...initialState,
        open: true,
        error: true,
        msg: msg || 'Something Went Wrong!',
      }
    },
    hideMessage: (state) => ({
      ...state,
      open: false,
    }),
  },
})

export default reducer
export {
  showSuccessMessage,
  showErrorMessage,
  hideMessage,
}

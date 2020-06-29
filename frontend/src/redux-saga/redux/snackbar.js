import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  open: null,
  msg: null,
  error: false,
}

const {
  actions: {
    showMessage,
    hideMessage,
  },
  reducer,
} = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showMessage: (state, action) => {
      const { error, msg } = action.payload
      const defaultSuccessMsg = (!error && !msg)
        ? 'Request has been successfully performed!'
        : msg
      const defaultErrorMsg = (error && !msg) ? 'Something Went Wrong!' : msg

      return {
        ...state,
        open: true,
        msg: error ? defaultErrorMsg : defaultSuccessMsg,
        error: !!error,
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
  showMessage,
  hideMessage,
}

import { createSlice } from '@reduxjs/toolkit'
import { MESSAGES } from '../../../utils/constants'
import { getFullMessage } from '../../../utils/common'

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
        msg: getFullMessage(msg) || MESSAGES.SUCCESS,
      }
    },
    showErrorMessage: (state, action) => {
      const msg = action && action.payload && action.payload.msg
      return {
        ...initialState,
        open: true,
        error: true,
        msg: getFullMessage(msg) || MESSAGES.ERROR,
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

import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

const initialState = {
  loading: null,
  type: '',
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
    startLoader: (state, action) => ({
      ...state,
      loading: true,
      type: action && action.payload && !_.isUndefined(action.payload.type) ? action.payload.type : '',
    }),
    stopLoader: () => ({
      ...initialState,
      loading: false,
    }),
  },
})

export default reducer
export {
  startLoader,
  stopLoader,
}

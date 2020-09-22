import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: null,
  error: null,
  success: null,
  withInvite: false,
  fullName: null,
  inviterId: '',
}

const {
  actions: {
    getInviterDetailsStart,
    getInviterDetailsSuccessful,
    getInviterDetailsFailure,
  },
  reducer,
} = createSlice({
  name: 'inviteDetails',
  initialState,
  reducers: {
    getInviterDetailsStart: (state) => ({
      ...state,
      isLoading: true,
      success: false,
    }),
    getInviterDetailsSuccessful: (state, action) => {
      const { withInvite, fullName, inviterId } = action.payload
      return ({
        ...state,
        success: true,
        isLoading: false,
        withInvite,
        fullName,
        inviterId,
      })
    },
    getInviterDetailsFailure: (state) => ({
      ...state,
      error: true,
      isLoading: false,
      success: false,
    }),
  },
})

export default reducer
export {
  getInviterDetailsStart,
  getInviterDetailsSuccessful,
  getInviterDetailsFailure,
}

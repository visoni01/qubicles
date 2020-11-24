import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../utils/common'

const initialState = {
  isLoading: null,
  error: null,
  success: false,
  invitationLink: '',
  status: '',
}

const {
  actions: {
    checkrInvitationFetchingStart,
    checkrInvitationFetchingSuccessful,
    checkrInvitationFetchingFailure,
  },
  reducer,
} = createSlice({
  name: 'announcement',
  initialState,
  reducers: {
    checkrInvitationFetchingStart: () => ({
      ...initialState,
      isLoading: true,
    }),
    checkrInvitationFetchingSuccessful: (state, action) => ({
      ...initialState,
      success: true,
      isLoading: false,
      invitationLink: getDataForReducer(action, initialState.invitationLink, 'invitationLink'),
      status: getDataForReducer(action, initialState.status, 'status'),
    }),
    checkrInvitationFetchingFailure: () => ({
      ...initialState,
      error: true,
      isLoading: false,
    }),
  },
})

export default reducer
export {
  checkrInvitationFetchingStart,
  checkrInvitationFetchingSuccessful,
  checkrInvitationFetchingFailure,
}

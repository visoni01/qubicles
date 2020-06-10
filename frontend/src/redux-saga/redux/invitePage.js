import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: null,
  error: null,
  success: false,
}

const {
  actions: {
    inviteRequestStart,
    inviteRequestSuccessful,
    inviteRequestFailure,
  },
  reducer,
} = createSlice( {
  name: 'invitePage',
  initialState,
  reducers: {
    inviteRequestStart: ( state ) => ( {
      ...state,
      isLoading: true,
      success: false,
    } ),
    inviteRequestSuccessful: ( state, action ) => {
      const { result } = action.payload
      return {
        ...state,
        success: true,
        isLoading: false,
        result,
      }
    },
    inviteRequestFailure: ( state ) => ( {
      ...state,
      error: true,
      isLoading: false,
      success: false,
      result: null,
    } ),
  },
} )

export default reducer
export {
  inviteRequestStart,
  inviteRequestSuccessful,
  inviteRequestFailure,
}

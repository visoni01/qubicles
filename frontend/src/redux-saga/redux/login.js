import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: null,
  error: null,
  success: false,
}

const {
  actions: { userLoginStart, userLoginSuccessful, userLoginFailure },
  reducer,
} = createSlice( {
  name: 'login',
  initialState,
  reducers: {
    userLoginStart: ( state ) => ( {
      ...state,
      isLoading: true,
      success:false,
      error: null
    } ),
    userLoginSuccessful: ( state ) => ( {
      ...state,
      success: true,
      isLoading: false,
      error: null
    } ),
    userLoginFailure: ( state ) => ( {
      ...state,
      error: true,
      isLoading:false,
      success: true,
    } ),
  },
} )

export default reducer
export { userLoginStart, userLoginSuccessful, userLoginFailure }

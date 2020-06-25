import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: null,
  error: null,
  success: false,
}

const {
  actions: {
    dashboardDataFetchingStart,
    dashboardDataFetchingSuccessful,
    dashboardDataFetchingFailure,
  },
  reducer,
} = createSlice( {
  name: 'dashboard',
  initialState,
  reducers: {
    dashboardDataFetchingStart: () => ( {
      ...initialState,
      isLoading: true,
    } ),
    dashboardDataFetchingSuccessful: ( state, action ) => ( {
      ...initialState,
      success: true,
      isLoading: false,
    } ),
    dashboardDataFetchingFailure: ( state, action ) => ( {
      ...initialState,
      error: true,
      isLoading: false,
    } ),
  },
} )

export default reducer
export {
  dashboardDataFetchingStart,
  dashboardDataFetchingSuccessful,
  dashboardDataFetchingFailure,
}

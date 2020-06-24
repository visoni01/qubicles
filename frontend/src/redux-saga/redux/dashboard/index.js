import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: null,
  error: null,
  success: false,
}

const {
  actions: {
    dashboardDataFechingStart,
    dashboardDataFechingSuccessful,
    dashboardDataFechingFailure,
  },
  reducer,
} = createSlice( {
  name: 'dashboard',
  initialState,
  reducers: {
    dashboardDataFechingStart: () => ( {
      ...initialState,
      isLoading: true,
    } ),
    dashboardDataFechingSuccessful: ( state, action ) => ( {
      ...initialState,
      success: true,
      isLoading: false,
    } ),
    dashboardDataFechingFailure: ( state, action ) => ( {
      ...initialState,
      error: true,
      isLoading: false,
    } ),
  },
} )

export default reducer
export {
  dashboardDataFechingStart,
  dashboardDataFechingSuccessful,
  dashboardDataFechingFailure,
}

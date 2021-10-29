import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../../utils/common'

const initialState = {
  isLoading: null,
  error: null,
  success: false,
  companiesList: [],
}

const {
  actions: {
    companiesListFetchStart,
    companiesListFetchSuccessful,
    companiesListFetchFailure,
  },
  reducer,
} = createSlice({
  name: 'companiesList',
  initialState,
  reducers: {
    companiesListFetchStart: () => ({
      ...initialState,
      isLoading: true,
    }),
    companiesListFetchSuccessful: (state, action) => ({
      ...state,
      success: true,
      isLoading: false,
      companiesList: getDataForReducer(action, initialState.companiesList, 'companiesList'),

    }),
    companiesListFetchFailure: () => ({
      ...initialState,
      error: true,
      isLoading: false,
    }),
  },
})

export default reducer
export {
  companiesListFetchStart,
  companiesListFetchSuccessful,
  companiesListFetchFailure,
}

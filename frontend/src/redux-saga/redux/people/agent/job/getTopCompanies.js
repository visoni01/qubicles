import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../../../utils/common'

const initialState = {
  isLoading: null,
  error: null,
  success: null,
  topCompanies: [],
}

const {
  actions: {
    fetchTopCompaniesStart,
    fetchTopCompaniesSuccess,
    fetchTopCompaniesFailed,
  }, reducer,
} = createSlice({
  name: 'topCompaniesData',
  initialState,
  reducers: {
    fetchTopCompaniesStart: (state) => ({
      ...state,
      isLoading: true,
    }),
    fetchTopCompaniesSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      topCompanies: getDataForReducer(action, initialState.topCompanies, 'topCompanies'),
    }),
    fetchTopCompaniesFailed: (state) => ({
      ...state,
      isLoading: false,
      error: true,
      success: false,
    }),
  },
})

export default reducer
export {
  fetchTopCompaniesStart,
  fetchTopCompaniesSuccess,
  fetchTopCompaniesFailed,
}

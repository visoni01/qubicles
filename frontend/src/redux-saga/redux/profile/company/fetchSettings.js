import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../../utils/common'
import getUpdatedCompanySettings from './helper'

const initialState = {
  isLoading: null,
  error: null,
  success: null,
  settings: {},
}

const {
  actions: {
    fetchCompanyProfileSettingsStart,
    fetchCompanyProfileSettingsSuccessful,
    fetchCompanyProfileSettingsFailure,
    updateCompanyProfileSettings,
  },
  reducer,
} = createSlice({
  name: 'companyProfileDetails',
  initialState,
  reducers: {
    fetchCompanyProfileSettingsStart: (state) => ({
      ...state,
      isLoading: true,
      success: false,
    }),
    fetchCompanyProfileSettingsSuccessful: (state, action) => ({
      ...state,
      success: true,
      isLoading: false,
      settings: getDataForReducer(action, initialState, 'companySettings'),
    }),
    fetchCompanyProfileSettingsFailure: (state) => ({
      ...state,
      error: true,
      isLoading: false,
      success: false,
    }),
    updateCompanyProfileSettings: (state, action) => ({
      ...state,
      settings: getUpdatedCompanySettings({ state, action }),
    }),
  },
})

export default reducer
export {
  fetchCompanyProfileSettingsStart,
  fetchCompanyProfileSettingsSuccessful,
  fetchCompanyProfileSettingsFailure,
  updateCompanyProfileSettings,
}

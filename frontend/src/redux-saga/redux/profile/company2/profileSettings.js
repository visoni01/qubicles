import { createSlice } from '@reduxjs/toolkit'
import getUpdatedCompanySettings from '../company/helper'
import { getDataForReducer } from '../../../../utils/common'

const initialState = {
  isFetchLoading: null,
  isFetchError: null,
  isFetchSuccess: null,
  isUpdateLoading: null,
  isUpdateSuccess: null,
  isUpdateError: null,
  settings: {},
}

const {
  actions: {
    getCompanyProfileSettingsApiStart,
    getCompanyProfileSettingsApiSuccess,
    getCompanyProfileSettingsApiFailure,
    updateCompanyProfileSettingsApiStart,
    updateCompanyProfileSettingsApiSuccess,
    updateCompanyProfileSettingsApiFailure,
    resetCompanyProfileSettingsData,
  },
  reducer,
} = createSlice({
  name: 'companyProfileSettings',
  initialState,
  reducers: {
    getCompanyProfileSettingsApiStart: (state) => ({
      ...state,
      isFetchLoading: true,
      isFetchSuccess: false,
    }),

    getCompanyProfileSettingsApiSuccess: (state, action) => ({
      ...state,
      isFetchLoading: false,
      isFetchSuccess: true,
      isFetchError: false,
      settings: getDataForReducer(action, initialState, 'clientDetails'),
    }),
    getCompanyProfileSettingsApiFailure: (state) => ({
      ...state,
      isFetchLoading: false,
      isFetchSuccess: false,
      isFetchError: true,
    }),
    updateCompanyProfileSettingsApiStart: (state) => ({
      ...state,
      isUpdateLoading: true,
      isUpdateSuccess: false,
    }),
    updateCompanyProfileSettingsApiSuccess: (state, action) => ({
      ...state,
      isUpdateLoading: false,
      isUpdateSuccess: true,
      isUpdateError: false,
      settings: getUpdatedCompanySettings({ state, action }),
    }),
    resetUpdateProfileSettingsFlags: (state) => ({
      ...state,
      isUpdateLoading: null,
      isUpdateSuccess: null,
      isUpdateError: null,
    }),
    resetCompanyProfileSettingsData: () => ({
      ...initialState,
    }),
  },
})

export default reducer
export {
  getCompanyProfileSettingsApiStart,
  getCompanyProfileSettingsApiSuccess,
  getCompanyProfileSettingsApiFailure,
  updateCompanyProfileSettingsApiStart,
  updateCompanyProfileSettingsApiSuccess,
  updateCompanyProfileSettingsApiFailure,
  resetCompanyProfileSettingsData,
}

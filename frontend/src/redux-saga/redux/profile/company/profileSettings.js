import { createSlice } from '@reduxjs/toolkit'
import getUpdatedCompanySettings from './helper'
import { getDataForReducer } from '../../../../utils/common'

const initialState = {
  isFetchLoading: false,
  isFetchError: false,
  isFetchSuccess: false,
  isUpdateLoading: null,
  isUpdateSuccess: null,
  isUpdateError: null,
  updatedDataType: null,
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
    resetUpdateProfileSettingsFlags,
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
    updateCompanyProfileSettingsApiStart: (state, action) => ({
      ...state,
      isUpdateLoading: true,
      isUpdateSuccess: false,
      updatedDataType: action.payload.updatedDataType,
    }),
    updateCompanyProfileSettingsApiSuccess: (state, action) => ({
      ...state,
      isUpdateLoading: false,
      isUpdateSuccess: true,
      isUpdateError: false,
      settings: getUpdatedCompanySettings({ state, action }),
    }),
    updateCompanyProfileSettingsApiFailure: (state) => ({
      ...state,
      isUpdateLoading: false,
      isUpdateSuccess: false,
      isUpdateError: true,
    }),
    resetUpdateProfileSettingsFlags: (state) => ({
      ...state,
      isUpdateLoading: null,
      isUpdateSuccess: null,
      isUpdateError: null,
      updatedDataType: null,
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
  resetUpdateProfileSettingsFlags,
  resetCompanyProfileSettingsData,
}

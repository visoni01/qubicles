import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../../utils/common'

const initialState = {
  isLoading: null,
  updateLoading: null,
  updateSuccess: null,
  updateFail: null,
  error: null,
  success: null,
  settings: {},
}

const {
  actions: {
    fetchCompanyProfileSettingsStart,
    fetchCompanyProfileSettingsSuccessful,
    fetchCompanyProfileSettingsFailure,
    updateCompanyProfileSettingsStart,
    updateCompanyProfileSettingsSuccessful,
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
    updateCompanyProfileSettingsStart: (action, state) => ({
      ...state,
      updateLoading: true,
    }),
    updateCompanyProfileSettingsSuccessful: (action, state) => ({
      ...state,
      settings: { ...state.settings, ...getDataForReducer(action, initialState, 'updatedSettings') },
      updateLoading: false,
      updateSuccess: true,
    }),
  },
})

export default reducer
export {
  fetchCompanyProfileSettingsStart,
  fetchCompanyProfileSettingsSuccessful,
  fetchCompanyProfileSettingsFailure,
  updateCompanyProfileSettingsStart,
  updateCompanyProfileSettingsSuccessful,
}

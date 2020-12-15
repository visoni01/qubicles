import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: null,
  error: null,
  success: null,

}

const {
  actions: {
    updateCompanyProfileSettingsStart,
    updateCompanyProfileSettingsSuccessful,
    updateCompanyProfileSettingsFailure,
    resetUpdateCompanyProfileSettings,
  },
  reducer,
} = createSlice({
  name: 'updateCompanyProfile',
  initialState,
  reducers: {
    updateCompanyProfileSettingsStart: (state) => ({
      ...state,
      isLoading: true,
      success: false,
    }),
    updateCompanyProfileSettingsSuccessful: (state) => ({
      ...state,
      success: true,
      isLoading: false,
    }),
    updateCompanyProfileSettingsFailure: (state) => ({
      ...state,
      error: true,
      isLoading: false,
      success: false,
    }),
    resetUpdateCompanyProfileSettings: () => ({
      ...initialState,
    }),
  },
})

export default reducer
export {
  updateCompanyProfileSettingsStart,
  updateCompanyProfileSettingsSuccessful,
  updateCompanyProfileSettingsFailure,
  resetUpdateCompanyProfileSettings,
}

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: null,
  error: null,
  success: null,
  updatedDataType: null,

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
    updateCompanyProfileSettingsStart: (state, action) => ({
      ...state,
      isLoading: true,
      success: false,
      updatedDataType: action.payload.updatedDataType,
    }),
    updateCompanyProfileSettingsSuccessful: (state) => ({
      ...state,
      success: true,
      isLoading: false,
    }),
    updateCompanyProfileSettingsFailure: (state, action) => ({
      ...state,
      error: true,
      isLoading: false,
      success: false,
      errorMessage: action.payload.message,
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

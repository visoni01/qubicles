import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../../utils/common'
import getUpdatedAgentSettings from './helper'

const initialState = {
  isLoading: false,
  error: false,
  success: false,
  updatedDataType: null,
  settings: {},
  requestType: '',
}

const {
  actions: {
    agentProfileSettingsApiStart,
    agentProfileSettingsApiSuccess,
    agentProfileSettingsApiFailure,
    resetAgentProfileSettingsFlags,
    resetAgentProfileSettingsData,
  },
  reducer,
} = createSlice({
  name: 'agentProfileSettings',
  initialState,
  reducers: {
    agentProfileSettingsApiStart: (state, action) => ({
      ...state,
      isLoading: true,
      success: null,
      error: null,
      updatedDataType: action.payload.updatedDataType,
      requestType: action.payload.requestType,
    }),

    agentProfileSettingsApiSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      error: false,
      settings: state.requestType === 'FETCH' && !action.payload.verificationFlow
        ? getDataForReducer(action, initialState, 'agentDetails')
        : getUpdatedAgentSettings({ state, action }),
    }),
    agentProfileSettingsApiFailure: (state) => ({
      ...state,
      isLoading: false,
      success: false,
      error: true,
    }),
    resetAgentProfileSettingsFlags: (state) => ({
      ...state,
      isLoading: null,
      success: null,
      error: null,
      updatedDataType: null,
    }),
    resetAgentProfileSettingsData: () => ({
      ...initialState,
    }),
  },
})

export default reducer
export {
  agentProfileSettingsApiStart,
  agentProfileSettingsApiSuccess,
  agentProfileSettingsApiFailure,
  resetAgentProfileSettingsFlags,
  resetAgentProfileSettingsData,
}

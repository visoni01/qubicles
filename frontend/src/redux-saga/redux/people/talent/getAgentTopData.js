import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../../utils/common'

const initialState = {
  isLoading: null,
  error: null,
  success: null,
  agentTopData: [],
}

const {
  actions: {
    fetchAgentTopDataStart,
    fetchAgentTopDataSuccess,
    fetchAgentTopDataFailed,
  }, reducer,
} = createSlice({
  name: 'agentTopData',
  initialState,
  reducers: {
    fetchAgentTopDataStart: (state) => ({
      ...state,
      isLoading: true,
    }),
    fetchAgentTopDataSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      error: false,
      agentTopData: getDataForReducer(action, initialState.agentTopData, 'agentTopData'),
    }),
    fetchAgentTopDataFailed: (state) => ({
      ...state,
      isLoading: false,
      error: true,
      success: false,
    }),
  },
})

export default reducer
export {
  fetchAgentTopDataStart,
  fetchAgentTopDataSuccess,
  fetchAgentTopDataFailed,
}

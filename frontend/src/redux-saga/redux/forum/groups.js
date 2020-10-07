import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../utils/common'
import { getUpdatedGroups } from '../helper'

const initialState = {
  isLoading: null,
  error: null,
  success: false,
  groups: [],
}

const {
  actions: {
    groupsFetchingStart,
    groupsFetchingSuccessful,
    groupsFetchingFailure,
    updateGroups,
  },
  reducer,
} = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    groupsFetchingStart: (state, action) => ({
      ...initialState,
      isLoading: true,
    }),
    groupsFetchingSuccessful: (state, action) => ({
      ...state,
      success: true,
      isLoading: false,
      groups: getDataForReducer(action, initialState.groups, 'groups'),
      totalGroups: action.payload.count,
    }),
    groupsFetchingFailure: (state, action) => ({
      ...state,
      error: true,
      isLoading: false,
    }),
    updateGroups: (state, action) => getUpdatedGroups({ state, payload: action.payload }),
  },
})

export default reducer
export {
  groupsFetchingStart,
  groupsFetchingSuccessful,
  groupsFetchingFailure,
  updateGroups,
}

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
    updateGroupsList,
  },
  reducer,
} = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    groupsFetchingStart: () => ({
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
    groupsFetchingFailure: (state) => ({
      ...state,
      error: true,
      isLoading: false,
    }),
    updateGroupsList: (state, action) => getUpdatedGroups({ state, payload: action.payload }),
  },
})

export default reducer
export {
  groupsFetchingStart,
  groupsFetchingSuccessful,
  groupsFetchingFailure,
  updateGroupsList,
}

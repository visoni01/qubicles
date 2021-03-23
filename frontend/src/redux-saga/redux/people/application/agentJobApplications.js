import { createSlice } from '@reduxjs/toolkit'
import { updateApplicationsListHelper, updateApplicationFilterHelper } from '../helper'

const initialState = {
  isLoading: null,
  error: null,
  success: null,
  applicationsList: {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
  },
  requestType: '',
  selectedApplicationCategory: 0,
  applicationFilter: {
    0: {
      id: 0, name: 'Invitations', limit: 2, offset: 0, more: false, statusTypes: [ 'invited' ], initialFetch: false,
    },
    1: {
      id: 1, name: 'Screening', limit: 2, offset: 0, more: false, statusTypes: [ 'screening' ], initialFetch: false,
    },
    2: {
      id: 2,
      name: 'Pending',
      limit: 2,
      offset: 0,
      more: false,
      statusTypes: [ 'training', 'offered', 'applied' ],
      initialFetch: false,
    },
    3: {
      id: 3, name: 'Successful', limit: 2, offset: 0, more: false, statusTypes: [ 'hired' ], initialFetch: false,
    },
    4: {
      id: 4,
      name: 'Archived',
      limit: 2,
      offset: 0,
      more: false,
      statusTypes:
      [ 'rejected', 'declined', 'resigned', 'terminated' ],
      initialFetch: false,
    },
  },
}

const {
  actions: {
    agentJobApplicationsRequestStart,
    agentJobApplicationsRequestSuccess,
    agentJobApplicationsRequestFailed,
    updateAgentJobApplicationsCategory,
    updateAgentJobApplicationsFilter,
    updateAgentApplicationInList,
  }, reducer,
} = createSlice({
  name: 'agentJobApplications',
  initialState,
  reducers: {
    agentJobApplicationsRequestStart: (state, action) => ({
      ...state,
      isLoading: true,
      success: null,
      error: null,
      requestType: action.payload.requestType,
    }),
    agentJobApplicationsRequestSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      applicationsList: {
        ...state.applicationsList,
        [ action.payload.category ]: [
          ...state.applicationsList[ action.payload.category ],
          ...action.payload.categoryApplications,
        ],
      },
      applicationFilter: {
        ...state.applicationFilter,
        [ action.payload.category ]: {
          ...state.applicationFilter[ action.payload.category ],
          more: action.payload.more,
          limit: action.payload.limit,
          offset: action.payload.offset,
          initialFetch: true,
        },
      },
    }),
    agentJobApplicationsRequestFailed: (state) => ({
      ...state,
      isLoading: false,
      error: true,
      success: false,
    }),
    updateAgentJobApplicationsCategory: (state, action) => ({
      ...state,
      selectedApplicationCategory: action.payload.category,
    }),
    updateAgentJobApplicationsFilter: (state, action) => ({
      ...state,
      applicationFilter: action.payload.filter,
    }),
    updateAgentApplicationInList: (state, action) => {
      const { updatedApplication, applicationCategoryId } = action.payload
      return ({
        ...state,
        isLoading: false,
        success: true,
        error: false,
        applicationsList: {
          0: updateApplicationsListHelper({
            currentCategoryId: 0,
            applicationList: state.applicationsList[ 0 ],
            updatedApplication,
            applicationCategoryId,
          }),
          1: updateApplicationsListHelper({
            currentCategoryId: 1,
            applicationList: state.applicationsList[ 1 ],
            updatedApplication,
            applicationCategoryId,
          }),
          2: updateApplicationsListHelper({
            currentCategoryId: 2,
            applicationList: state.applicationsList[ 2 ],
            updatedApplication,
            applicationCategoryId,
          }),
          3: updateApplicationsListHelper({
            currentCategoryId: 3,
            applicationList: state.applicationsList[ 3 ],
            updatedApplication,
            applicationCategoryId,
          }),
          4: updateApplicationsListHelper({
            currentCategoryId: 4,
            applicationList: state.applicationsList[ 4 ],
            updatedApplication,
            applicationCategoryId,
          }),
        },
        applicationFilter: {
          ...state.applicationFilter,
          0: updateApplicationFilterHelper({
            currentCategoryId: 0,
            categoryFilter: state.applicationFilter[ 0 ],
            applicationCategoryId,
            updatedApplication,
          }),
          1: updateApplicationFilterHelper({
            currentCategoryId: 1,
            categoryFilter: state.applicationFilter[ 1 ],
            applicationCategoryId,
            updatedApplication,
          }),
          2: updateApplicationFilterHelper({
            currentCategoryId: 2,
            categoryFilter: state.applicationFilter[ 2 ],
            applicationCategoryId,
            updatedApplication,
          }),
          3: updateApplicationFilterHelper({
            currentCategoryId: 3,
            categoryFilter: state.applicationFilter[ 3 ],
            applicationCategoryId,
            updatedApplication,
          }),
          4: updateApplicationFilterHelper({
            currentCategoryId: 4,
            categoryFilter: state.applicationFilter[ 4 ],
            applicationCategoryId,
            updatedApplication,
          }),
        },
      })
    },
  },
})

export default reducer
export {
  agentJobApplicationsRequestStart,
  agentJobApplicationsRequestSuccess,
  agentJobApplicationsRequestFailed,
  updateAgentJobApplicationsCategory,
  updateAgentJobApplicationsFilter,
  updateAgentApplicationInList,
}

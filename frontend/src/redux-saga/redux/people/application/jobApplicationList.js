import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'
import { getDataForReducer } from '../../../../utils/common'
import { jobApplicationListData } from '../../../saga/helper'

const initialState = {
  isLoading: null,
  error: null,
  success: null,
  applicationsData: {},
  requestType: '',
}

const {
  actions: {
    jobApplicationListRequestStart,
    jobApplicationListRequestSuccess,
    jobApplicationListRequestFailed,
    updateJobApplicationInList,
    resetJobApplicationListFlags,
  }, reducer,
} = createSlice({
  name: 'jobApplicationList',
  initialState,
  reducers: {
    jobApplicationListRequestStart: (state, action) => ({
      ...state,
      isLoading: true,
      success: null,
      error: null,
      requestType: action.payload.requestType,
    }),
    jobApplicationListRequestSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      applicationsData: getDataForReducer(action, initialState.applicationsData, 'applicationsData'),
    }),
    jobApplicationListRequestFailed: (state) => ({
      ...state,
      isLoading: false,
      error: true,
      success: false,
      applicationsData: {},
    }),
    updateJobApplicationInList: (state, action) => {
      const { updatedApplication } = action.payload
      let applicationList = []
      if (!_.isEmpty(state.applicationsData)) {
        applicationList = _.concat(
          state.applicationsData.jobApplications.Pending,
          state.applicationsData.jobApplications.Evaluating,
          state.applicationsData.jobApplications.Hired,
          state.applicationsData.jobApplications.Archived,
        )

        applicationList = applicationList.map((app) => {
          if (app.application.applicationId === updatedApplication.applicationId) {
            return {
              application: updatedApplication,
              userDetails: app.userDetails,
            }
          } return app
        })
        const jobApplications = jobApplicationListData(applicationList)
        return ({
          ...state,
          isLoading: false,
          success: true,
          error: false,
          applicationsData: {
            jobApplications,
            jobId: updatedApplication.jobId,
          },
        })
      }
      return (state)
    },
    resetJobApplicationListFlags: () => (initialState),
  },
})

export default reducer
export {
  jobApplicationListRequestStart,
  jobApplicationListRequestSuccess,
  jobApplicationListRequestFailed,
  updateJobApplicationInList,
  resetJobApplicationListFlags,
}

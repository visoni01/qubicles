/* eslint-disable complexity */
import { takeEvery, put, select } from 'redux-saga/effects'
import WebSocket from '../../../../socket'
import { getNotificationMessage, getUserDetails } from '../../../../utils/common'
import {
  agentJobApplicationsRequestStart,
  agentJobApplicationsRequestSuccess,
  agentJobApplicationsRequestFailed,
  showErrorMessage,
  updateAgentApplicationInList,
} from '../../../redux/actions'
import People from '../../../service/people'
import { formatAgentApplicationCards } from '../../helper'

function* jobApplicationListWatcherStart() {
  yield takeEvery(agentJobApplicationsRequestStart.type, jobApplicationListWorker)
}

function* jobApplicationListWorker(action) {
  try {
    const { applicationListData, requestType } = action.payload

    switch (requestType) {
      case 'FETCH': {
        const { data } = yield People.fetchJobApplicationListByAgentId(applicationListData)
        const agentApplications = formatAgentApplicationCards(data)
        yield put(agentJobApplicationsRequestSuccess({
          category: applicationListData.applicationCategoryId,
          categoryApplications: agentApplications,
          limit: applicationListData.limit,
          offset: applicationListData.offset + agentApplications.length,
          more: data.more,
        }))
        break
      }
      case 'UPDATE': {
        const { data } = yield People.updateJobApplication(applicationListData)
        const updatedApplication = {
          applicationId: data.application_id,
          agentUserId: data.user_id,
          clientId: data.client_id,
          jobId: data.job_id,
          coverLetter: data.cover_letter,
          status: data.status,
          createdOn: data.createdAt,
          updateOn: data.updatedAt,
        }
        const { applicationsList } = yield select((state) => state.agentJobApplications)
        yield put(updateAgentApplicationInList({
          updatedApplication,
          applicationCategoryId: applicationListData.applicationCategoryId,
        }))

        if (data && data.status === 'screening') {
          const userDetails = getUserDetails()
          const application = applicationsList && applicationsList[ 0 ]
            && applicationsList[ 0 ].find((item) => item.jobDetails && (item.jobDetails.jobId === data.job_id))
          const message = getNotificationMessage({
            type: 'accept-job-invitation',
            payload: {
              userId: userDetails && userDetails.user_id,
              userName: userDetails && userDetails.full_name,
              jobId: data.job_id,
              jobTitle: application && application.jobDetails && application.jobDetails.jobTitle,
            },
          })

          WebSocket.sendNotification({
            to: data.client_id && data.client_id.toString(),
            from: userDetails.user_id,
            message,
          })
        }
        break
      }
      default: break
    }
  } catch (e) {
    yield put(agentJobApplicationsRequestFailed())
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default jobApplicationListWatcherStart

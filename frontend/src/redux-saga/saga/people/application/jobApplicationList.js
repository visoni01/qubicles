import { takeEvery, put, select } from 'redux-saga/effects'
import WebSocket from '../../../../socket'
import { getNotificationMessage, getSmsNotificationMessage, getUserDetails } from '../../../../utils/common'
import { SUBJECTS } from '../../../../utils/messages'
import {
  jobApplicationListRequestStart,
  jobApplicationListRequestSuccess,
  jobApplicationListRequestFailed,
  showErrorMessage,
  updateJobApplicationInList,
} from '../../../redux/actions'
import People from '../../../service/people'
import { getApplicationData, jobApplicationListData } from '../../helper'

function* jobApplicationListWatcherStart() {
  yield takeEvery(jobApplicationListRequestStart.type, jobApplicationListWorker)
}

// eslint-disable-next-line complexity
function* jobApplicationListWorker(action) {
  try {
    const { applicationListData, requestType } = action.payload

    switch (requestType) {
      case 'FETCH': {
        const { data } = yield People.fetchJobApplicationListByJobId(applicationListData)
        const jobApplications = jobApplicationListData(data)
        yield put(jobApplicationListRequestSuccess({
          applicationsData: {
            jobApplications,
            jobId: applicationListData.jobId,
          },
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
        yield put(updateJobApplicationInList({ updatedApplication }))

        if ([ 'declined', 'invited', 'hired' ].includes(data.status)) {
          const userDetails = getUserDetails()
          const { jobDetails } = yield select((state) => state.jobDetails)
          const { applicationsData } = yield select((state) => state.jobApplicationList)
          const application = getApplicationData({ userId: data.user_id, status: data.status, applicationsData })
          const message = getNotificationMessage({
            type: (data.status === 'declined' && 'cancel-application')
            || (data.status === 'invited' && 'invite-for-job')
            || (data.status === 'hired' && 'hire-for-job'),
            payload: {
              id: data && data.user_id,
              name: application && application.userDetails && application.userDetails.fullName,
              jobId: jobDetails && jobDetails.jobId,
              jobTitle: jobDetails && jobDetails.title,
              companyId: jobDetails.companyDetails.client_id,
              companyName: jobDetails.companyDetails.client_name,
            },
          })

          const smsText = getSmsNotificationMessage({
            type: (data.status === 'declined' && 'cancel-application')
            || (data.status === 'invited' && 'invite-for-job')
            || (data.status === 'hired' && 'hire-for-job'),
            payload: {
              name: application && application.userDetails && application.userDetails.fullName,
              jobTitle: jobDetails && jobDetails.title,
              companyName: jobDetails.companyDetails.client_name,
            },
          })

          WebSocket.sendNotification({
            to: data.user_id && data.user_id.toString(),
            from: userDetails && userDetails.user_id,
            message,
            notifyEmail: data.status === 'hired',
            subject: (data.status === 'declined' && SUBJECTS.JOB_APPLICATION_CANCELLED)
            || (data.status === 'invited' && SUBJECTS.JOB_INVITATION)
            || (data.status === 'hired' && SUBJECTS.HIRED_BY_COMPANY),
            smsText,
          })
        }

        break
      }
      default: break
    }
  } catch (e) {
    yield put(jobApplicationListRequestFailed())
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default jobApplicationListWatcherStart

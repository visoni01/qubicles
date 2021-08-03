/* eslint-disable complexity */
import {
  takeEvery,
  put,
  select,
} from 'redux-saga/effects'
import _ from 'lodash'
import {
  jobApplicationRequestStart,
  jobApplicationRequestSuccess,
  jobApplicationRequestFailed,
  showErrorMessage,
  showSuccessMessage,
  updateAgentApplicationInList,
} from '../../../redux/actions'
import People from '../../../service/people'
import { getNotificationMessage, getUserDetails } from '../../../../utils/common'
import WebSocket from '../../../../socket'

function* jobApplicationWatcherStart() {
  yield takeEvery(jobApplicationRequestStart.type, jobApplicationWorker)
}

// eslint-disable-next-line complexity
function* jobApplicationWorker(action) {
  try {
    const { applicationData, requestType } = action.payload
    switch (requestType) {
      case 'CREATE': {
        const { data } = yield People.createJobApplication(applicationData)
        yield put(jobApplicationRequestSuccess({
          application: {
            applicationId: data.application_id,
            agentUserId: data.user_id,
            clientId: data.client_id,
            jobId: data.job_id,
            coverLetter: data.cover_letter,
            status: data.status,
            createdOn: data.createdAt,
            updateOn: data.updatedAt,
          },
        }))
        yield put(showSuccessMessage({
          msg: applicationData.status === 'invited'
            ? 'Invited successfully!'
            : 'Applied successfully!',
        }))

        if (data && data.status === 'invited') {
          const userDetails = getUserDetails()
          const { agentResume } = yield select((state) => state.agentResume)
          const { jobsWithCategories } = yield select((state) => state.jobsWithCategories)
          let jobDetails

          _.find(jobsWithCategories, (jobsWithCategory) => {
            jobDetails = _.find(jobsWithCategory.jobs, { job_id: data.job_id })
            return jobDetails
          })

          const message = getNotificationMessage({
            type: 'invite-for-job',
            payload: {
              id: data && data.user_id,
              name: agentResume && agentResume.candidateName,
              jobId: data && data.job_id,
              jobTitle: jobDetails && jobDetails.title,
            },
          })

          WebSocket.sendNotification({
            to: data.user_id && data.user_id.toString(),
            from: userDetails && userDetails.user_id,
            message,
          })
        }

        if (applicationData && applicationData.status === 'applied') {
          const userDetails = getUserDetails()
          const { jobDetails } = yield select((state) => state.jobDetails)
          const message = getNotificationMessage({
            type: 'job-applied',
            payload: {
              userId: userDetails && userDetails.user_id,
              userName: userDetails && userDetails.full_name,
              jobId: applicationData.jobId,
              jobTitle: jobDetails && jobDetails.title,
            },
          })

          WebSocket.sendNotification({
            to: jobDetails && jobDetails.jobPostOwnerId && jobDetails.jobPostOwnerId.toString(),
            from: userDetails.user_id,
            message,
          })
        }
        break
      }
      case 'FETCH': {
        const { data } = yield People.fetchJobApplicationById(applicationData)
        if (_.isEmpty(data)) {
          yield put(jobApplicationRequestSuccess({
            application: {},
          }))
        } else {
          yield put(jobApplicationRequestSuccess({
            application: {
              applicationId: data.application_id,
              agentUserId: data.user_id,
              clientId: data.client_id,
              jobId: data.job_id,
              jobTitle: data.job_title,
              coverLetter: data.cover_letter,
              status: data.status,
              createdOn: data.createdAt,
              updateOn: data.updatedAt,
            },
          }))
        }
        break
      }
      case 'UPDATE': {
        const { data } = yield People.updateJobApplication(applicationData)
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
        yield put(jobApplicationRequestSuccess({ application: updatedApplication }))
        if (applicationData.userType && applicationData.userType === 'agent') {
          yield put(updateAgentApplicationInList({
            updatedApplication,
            applicationCategoryId: applicationData.applicationCategoryId,
          }))
        }

        if (data && data.status === 'hired') {
          const { settings } = yield select((state) => state.clientDetails)
          const { agentResume } = yield select((state) => state.agentResume)
          const { application } = yield select((state) => state.jobApplication)
          const message = getNotificationMessage({
            type: 'hire-for-job',
            payload: {
              id: data && data.user_id,
              name: agentResume && agentResume.candidateName,
              jobId: application && application.jobId,
              jobTitle: application && application.jobTitle,
              companyId: settings && settings.companyId,
              companyName: settings && settings.companyName,
            },
          })

          WebSocket.sendNotification({
            to: data.user_id && data.user_id.toString(),
            from: settings && settings.companyId,
            message,
          })
        }

        if (data && data.status === 'declined') {
          const userDetails = getUserDetails()
          const { jobDetails } = yield select((state) => state.jobDetails)
          const message = getNotificationMessage({
            type: 'job-applied',
            payload: {
              userId: userDetails && userDetails.user_id,
              userName: userDetails && userDetails.full_name,
              jobId: data.job_id,
              jobTitle: jobDetails && jobDetails.title,
            },
          })

          WebSocket.deleteNotification({
            to: jobDetails && jobDetails.jobPostOwnerId && jobDetails.jobPostOwnerId.toString(),
            from: userDetails.user_id,
            message,
          })
        }
        break
      }
      default: break
    }
  } catch (e) {
    yield put(jobApplicationRequestFailed())
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default jobApplicationWatcherStart

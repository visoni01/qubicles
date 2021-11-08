/* eslint-disable complexity */
import { takeEvery, put, select } from 'redux-saga/effects'
import _ from 'lodash'
import {
  jobApplicationRequestStart, jobApplicationRequestSuccess, jobApplicationRequestFailed, showErrorMessage,
  showSuccessMessage, updateAgentApplicationInList,
} from '../../../redux/actions'
import People from '../../../service/people'
import { getNotificationMessage, getSmsNotificationMessage, getUserDetails } from '../../../../utils/common'
import WebSocket from '../../../../socket'
import {
  NOTIFICATION_MESSAGES, REQUEST_TYPES, SUBJECTS, USERS,
} from '../../../../utils/constants'

function* jobApplicationWatcherStart() {
  yield takeEvery(jobApplicationRequestStart.type, jobApplicationWorker)
}

// eslint-disable-next-line complexity
function* jobApplicationWorker(action) {
  try {
    const { applicationData, requestType } = action.payload

    switch (requestType) {
      case REQUEST_TYPES.CREATE: {
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
          msg: applicationData.status === 'invited' ? 'Invited successfully!' : 'Applied successfully!',
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
            type: NOTIFICATION_MESSAGES.INVITE_FOR_JOB,
            payload: {
              id: data && data.user_id,
              name: agentResume && agentResume.candidateName,
              jobId: data && data.job_id,
              jobTitle: jobDetails && jobDetails.title,
            },
          })

          const smsText = getSmsNotificationMessage({
            type: NOTIFICATION_MESSAGES.INVITE_FOR_JOB,
            payload: {
              name: agentResume && agentResume.candidateName,
              jobTitle: jobDetails && jobDetails.title,
            },
          })

          WebSocket.sendNotification({
            to: data.user_id && data.user_id.toString(),
            from: userDetails && userDetails.user_id,
            message,
            subject: SUBJECTS.JOB_INVITATION,
            smsText,
          })
        }

        if (applicationData && applicationData.status === 'applied') {
          const userDetails = getUserDetails()
          const { jobDetails } = yield select((state) => state.jobDetails)
          const message = getNotificationMessage({
            type: NOTIFICATION_MESSAGES.JOB_APPLIED,
            payload: {
              userId: userDetails && userDetails.user_id,
              userName: userDetails && userDetails.full_name,
              jobId: applicationData.jobId,
              jobTitle: jobDetails && jobDetails.title,
            },
          })

          const smsText = getSmsNotificationMessage({
            type: NOTIFICATION_MESSAGES.JOB_APPLIED,
            payload: {
              userName: userDetails && userDetails.full_name,
              jobTitle: jobDetails && jobDetails.title,
            },
          })

          WebSocket.sendNotification({
            to: jobDetails && jobDetails.jobPostOwnerId && jobDetails.jobPostOwnerId.toString(),
            from: userDetails.user_id,
            message,
            subject: SUBJECTS.JOB_APPLIED,
            smsText,
          })
        }
        break
      }
      case REQUEST_TYPES.FETCH: {
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
      case REQUEST_TYPES.UPDATE: {
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
        if (applicationData.userType && applicationData.userType === USERS.AGENT) {
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
            type: NOTIFICATION_MESSAGES.HIRE_FOR_JOB,
            payload: {
              id: data && data.user_id,
              name: agentResume && agentResume.candidateName,
              jobId: application && application.jobId,
              jobTitle: application && application.jobTitle,
              companyId: settings && settings.companyId,
              companyName: settings && settings.companyName,
            },
          })

          const smsText = getSmsNotificationMessage({
            type: NOTIFICATION_MESSAGES.HIRE_FOR_JOB,
            payload: {
              name: agentResume && agentResume.candidateName,
              jobTitle: application && application.jobTitle,
              companyName: settings && settings.companyName,
            },
          })

          WebSocket.sendNotification({
            to: data.user_id && data.user_id.toString(),
            from: settings && settings.companyId,
            message,
            subject: SUBJECTS.HIRED_BY_COMPANY,
            notifyEmail: true,
            smsText,
          })
        }

        const userDetails = getUserDetails()

        if (userDetails && _.isEqual(userDetails.user_code, USERS.AGENT)
          && data && [ 'declined', 'screening', 'resigned' ].includes(data.status)) {
          const { jobDetails } = yield select((state) => state.jobDetails)

          const message = getNotificationMessage({
            type: (data.status === 'declined' && NOTIFICATION_MESSAGES.JOB_APPLIED)
            || (data.status === 'screening' && NOTIFICATION_MESSAGES.ACCEPT_JOB_INVITATION)
            || (data.status === 'resigned' && NOTIFICATION_MESSAGES.RESIGN_JOB),
            payload: {
              userId: userDetails && userDetails.user_id,
              userName: userDetails && userDetails.full_name,
              jobId: data.job_id,
              jobTitle: jobDetails && jobDetails.title,
            },
          })

          if (_.isEqual(data.status, 'declined')) {
            WebSocket.deleteNotification({
              to: jobDetails && jobDetails.jobPostOwnerId && jobDetails.jobPostOwnerId.toString(),
              from: userDetails.user_id,
              message,
            })
          } else {
            const smsText = getSmsNotificationMessage({
              type: (data.status === 'screening' && NOTIFICATION_MESSAGES.ACCEPT_JOB_INVITATION)
              || (data.status === 'resigned' && NOTIFICATION_MESSAGES.RESIGN_JOB),
              payload: {
                userName: userDetails && userDetails.full_name,
                jobTitle: jobDetails && jobDetails.title,
              },
            })

            WebSocket.sendNotification({
              to: jobDetails && jobDetails.jobPostOwnerId && jobDetails.jobPostOwnerId.toString(),
              from: userDetails.user_id,
              message,
              subject: (data.status === 'screening' && SUBJECTS.ACCEPT_JOB_INVITATION)
              || (data.status === 'resigned' && SUBJECTS.RESIGN_JOB),
              smsText,
            })
          }
        }

        if (userDetails && _.isEqual(userDetails.user_code, USERS.EMPLOYER)
          && data && [ 'declined', 'invited' ].includes(data.status)) {
          const { application } = yield select((state) => state.jobApplication)
          const { agentResume } = yield select((state) => state.agentResume)
          const message = getNotificationMessage({
            type: (data.status === 'declined' && NOTIFICATION_MESSAGES.CANCEL_APPLICATION)
            || (data.status === 'invited' && NOTIFICATION_MESSAGES.INVITE_FOR_JOB),
            payload: {
              id: data && data.user_id,
              name: agentResume && agentResume.candidateName,
              jobId: application && application.jobId,
              jobTitle: application && application.jobTitle,
            },
          })

          const smsText = getSmsNotificationMessage({
            type: (data.status === 'declined' && NOTIFICATION_MESSAGES.CANCEL_APPLICATION)
            || (data.status === 'invited' && NOTIFICATION_MESSAGES.INVITE_FOR_JOB),
            payload: {
              name: agentResume && agentResume.candidateName,
              jobTitle: application && application.jobTitle,
            },
          })

          WebSocket.sendNotification({
            to: data.user_id && data.user_id.toString(),
            from: userDetails && userDetails.user_id,
            message,
            subject: (data.status === 'declined' && SUBJECTS.JOB_APPLICATION_CANCELLED)
            || (data.status === 'invited' && SUBJECTS.JOB_INVITATION),
            smsText,
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

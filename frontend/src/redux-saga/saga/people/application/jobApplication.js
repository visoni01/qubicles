import {
  takeEvery,
  put,
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

function* jobApplicationWatcherStart() {
  yield takeEvery(jobApplicationRequestStart.type, jobApplicationWorker)
}

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

import { takeEvery, put } from 'redux-saga/effects'
import {
  jobApplicationListRequestStart,
  jobApplicationListRequestSuccess,
  jobApplicationListRequestFailed,
  showErrorMessage,
  updateJobApplicationInList,
} from '../../../redux/actions'
import People from '../../../service/people'
import { jobApplicationListData } from '../../helper'

function* jobApplicationListWatcherStart() {
  yield takeEvery(jobApplicationListRequestStart.type, jobApplicationListWorker)
}

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

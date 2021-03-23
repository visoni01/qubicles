import { takeEvery, put } from 'redux-saga/effects'
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
        yield put(updateAgentApplicationInList({
          updatedApplication,
          applicationCategoryId: applicationListData.applicationCategoryId,
        }))
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

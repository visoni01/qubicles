import { put, takeEvery } from 'redux-saga/effects'
import People from '../../../../service/people'
import {
  fetchAgentJobsStart, fetchAgentJobsSuccess, fetchAgentJobsFailed, showErrorMessage,
} from '../../../../redux/actions'

function* fetchAgentJobsWatcherStart() {
  yield takeEvery(fetchAgentJobsStart.type, fetchAgentJobsWorker)
}

function* fetchAgentJobsWorker(action) {
  try {
    const filter = action.payload
    const { data } = yield People.fetchAgentJobs(filter)
    yield put(fetchAgentJobsSuccess({
      agentJobsData: data,
    }))
  } catch (e) {
    yield put(fetchAgentJobsFailed())
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default fetchAgentJobsWatcherStart

import { takeEvery, put } from 'redux-saga/effects'
import {
  fetchAgentResumeStart,
  fetchAgentResumeSuccess,
  fetchAgentResumeFailed,
  showErrorMessage,
} from '../../../redux/actions'
import People from '../../../service/people'

function* agentResumeSkillsWatcherStart() {
  yield takeEvery(fetchAgentResumeStart.type, agentResumeSkillsWorker)
}

function* agentResumeSkillsWorker(action) {
  try {
    const { candidateId } = action.payload
    const { data } = yield People.getAgentResume({ candidateId })
    yield put(fetchAgentResumeSuccess({ agentResume: data }))
  } catch (e) {
    yield put(fetchAgentResumeFailed())
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default agentResumeSkillsWatcherStart

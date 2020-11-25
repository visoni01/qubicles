import { takeEvery, put } from 'redux-saga/effects'
import {
  fetchAgentResumeStart,
  fetchAgentResumeSuccess,
  fetchAgentResumeFailed,
} from '../../../redux/newPeople/talent/agentResume'
import NewPeople from '../../../service/newPeople'
import { showErrorMessage } from '../../../redux/actions'

function* agentResumeSkillsWatcherStart() {
  yield takeEvery(fetchAgentResumeStart.type, agentResumeSkillsWorker)
}

function* agentResumeSkillsWorker(action) {
  try {
    const { candidateId } = action.payload
    const { data } = yield NewPeople.getAgentResume({ candidateId })
    yield put(fetchAgentResumeSuccess({ agentResume: data }))
  } catch (e) {
    yield put(fetchAgentResumeFailed())
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default agentResumeSkillsWatcherStart

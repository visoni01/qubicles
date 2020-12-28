import { takeEvery, put } from 'redux-saga/effects'
import {
  fetchAgentResumeSkillsStart,
  fetchAgentResumeSkillsSuccess,
  fetchAgentResumeSkillsFailed,
} from '../../../redux/people/talent/agentResumeSkills'
import People from '../../../service/people'
import { showErrorMessage } from '../../../redux/actions'

function* agentResumeSkillsWatcherStart() {
  yield takeEvery(fetchAgentResumeSkillsStart.type, agentResumeSkillsWorker)
}

function* agentResumeSkillsWorker(action) {
  const { candidateId } = action.payload
  try {
    const { data } = yield People.getUserSkills({ candidateId })
    yield put(fetchAgentResumeSkillsSuccess({ agentResumeSkills: data }))
  } catch (e) {
    yield put(fetchAgentResumeSkillsFailed())
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default agentResumeSkillsWatcherStart

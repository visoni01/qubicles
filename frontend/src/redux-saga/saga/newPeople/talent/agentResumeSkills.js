import { takeEvery, put } from 'redux-saga/effects'
import {
  fetchAgentResumeSkillsStart,
  fetchAgentResumeSkillsSuccess,
  fetchAgentResumeSkillsFailed,
} from '../../../redux/newPeople/talent/agentResumeSkills'
import NewPeople from '../../../service/newPeople'
import { showErrorMessage } from '../../../redux/actions'

function* agentResumeSkillsWatcherStart() {
  yield takeEvery(fetchAgentResumeSkillsStart.type, agentResumeSkillsWorker)
}

function* agentResumeSkillsWorker(action) {
  try {
    const data = yield NewPeople.getAgentResumeSkills()
    yield put(fetchAgentResumeSkillsSuccess(data))
  } catch (e) {
    yield put(fetchAgentResumeSkillsFailed())
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default agentResumeSkillsWatcherStart

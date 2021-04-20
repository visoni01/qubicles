import { takeEvery, put } from 'redux-saga/effects'
import {
  agentResumeSkillsStart,
  agentResumeSkillsSuccess,
  agentResumeSkillsFailed,
} from '../../../redux/people/talent/agentResumeSkills'
import People from '../../../service/people'
import { showErrorMessage, showSuccessMessage } from '../../../redux/actions'

function* agentResumeSkillsWatcherStart() {
  yield takeEvery(agentResumeSkillsStart.type, agentResumeSkillsWorker)
}

function* agentResumeSkillsWorker(action) {
  const { candidateId, requestType, skills } = action.payload
  try {
    switch (requestType) {
      case 'FETCH': {
        const { data } = yield People.getUserSkills({ candidateId })
        yield put(agentResumeSkillsSuccess({ agentResumeSkills: data }))
        break
      }
      case 'UPDATE': {
        const skillIds = skills.map((skill) => skill.skillId)
        yield People.updateUserSkills(candidateId, { updatedData: skillIds })
        yield put(agentResumeSkillsStart({ candidateId, requestType: 'FETCH' }))
        yield put(showSuccessMessage({ msg: 'Skills and Languages updated successfuly' }))
        break
      }
      default: break
    }
  } catch (e) {
    yield put(agentResumeSkillsFailed())
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default agentResumeSkillsWatcherStart

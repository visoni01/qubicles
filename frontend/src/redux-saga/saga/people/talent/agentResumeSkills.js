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
  const {
    candidateId, requestType, updatedData, updatedDataType,
  } = action.payload
  try {
    switch (requestType) {
      case 'FETCH': {
        const { data } = yield People.getUserSkills({ candidateId })
        yield put(agentResumeSkillsSuccess({ agentResumeSkills: data }))
        break
      }
      case 'UPDATE': {
        const { data } = yield People.updateUserSkills({ candidateId, updatedData, updatedDataType })
        yield put(agentResumeSkillsSuccess({
          agentResumeSkills: {
            candidateId: data.candidateId,
            skills: data.skills,
            canEndorse: data.canEndorse,
          },
        }))
        switch (updatedDataType) {
          case 'Skills':
            yield put(showSuccessMessage({ msg: 'Skills and Languages updated successfully' }))
            break
          case 'AddEndorse': {
            yield put(showSuccessMessage({ msg: 'Endorsed successfully' }))
            break
          }
          case 'RemoveEndorse': {
            yield put(showSuccessMessage({ msg: 'Removed endorsement successfully' }))
            break
          }
          default:
            break
        }
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

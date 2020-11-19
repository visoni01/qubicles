import { put, takeEvery } from 'redux-saga/effects'
import NewPeople from '../../../service/newPeople'
import { GET_TALENT_SKILL_TAGS, SET_TALENT_SKILL_TAGS } from '../../../redux/constants'
import { updateTalentCards } from '../../../redux/actions'

const { showErrorMessage } = require('../../../redux/actions')

function* updateTalentCardsWatcherStart() {
  yield takeEvery([
    GET_TALENT_SKILL_TAGS,
    SET_TALENT_SKILL_TAGS,
  ], updateTalentCardsWorker)
}

function* updateTalentCardsWorker(action) {
  try {
    switch (action.type) {
      case GET_TALENT_SKILL_TAGS: {
        const { candidateId } = action.payload
        const { data } = yield NewPeople.getUserSkills({ candidateId })

        yield put(updateTalentCards({
          type: SET_TALENT_SKILL_TAGS,
          candidateId: data.candidateId,
          skills: data.skills,
        }))
        break
      }
      default:
        break
    }
  } catch (e) {
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default updateTalentCardsWatcherStart

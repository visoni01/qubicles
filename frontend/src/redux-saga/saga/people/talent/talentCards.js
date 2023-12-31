import { put, takeEvery } from 'redux-saga/effects'
import People from '../../../service/people'
import { fetchTalentCardsStart, fetchTalentCardsSuccess, fetchTalentCardsFailed } from '../../../redux/actions'

const { showErrorMessage } = require('../../../redux/actions')

function* talentCardsWatcherStart() {
  yield takeEvery(fetchTalentCardsStart.type, talentCardsWorker)
}

function* talentCardsWorker(action) {
  try {
    const filter = action.payload
    const { data } = yield People.getTalentCards(filter)
    yield put(fetchTalentCardsSuccess({
      talentCards: data,
    }))
  } catch (e) {
    yield put(fetchTalentCardsFailed())
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default talentCardsWatcherStart

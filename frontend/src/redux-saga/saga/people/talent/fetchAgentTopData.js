import { put, takeEvery } from 'redux-saga/effects'
import People from '../../../service/people'
import {
  fetchAgentTopDataStart,
  fetchAgentTopDataSuccess,
  fetchAgentTopDataFailed,
  showErrorMessage,
} from '../../../redux/actions'
import { PEOPLE_YOU_MAY_KNOW, TOP_TALENT } from '../../../redux/constants'

function* fetchAgentTopDataWatcherStart() {
  yield takeEvery(fetchAgentTopDataStart.type, fetchAgentTopDataWorker)
}

function* fetchAgentTopDataWorker(action) {
  const { dataType } = action.payload
  try {
    switch (dataType) {
      case TOP_TALENT: {
        const { data } = yield People.fetchTopTalent()
        yield put(fetchAgentTopDataSuccess({
          agentTopData: data,
        }))
        break
      }
      case PEOPLE_YOU_MAY_KNOW: {
        const { data } = yield People.fetchPeopleYouMayKnow()
        yield put(fetchAgentTopDataSuccess({
          agentTopData: data,
        }))
        break
      }
      default:
        break
    }
  } catch (e) {
    yield put(fetchAgentTopDataFailed())
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default fetchAgentTopDataWatcherStart

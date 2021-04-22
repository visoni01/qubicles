import { put, takeEvery } from 'redux-saga/effects'
import People from '../../../service/people'
import {
  fetchAgentTopDataStart,
  fetchAgentTopDataSuccess,
  fetchAgentTopDataFailed,
  showErrorMessage,
} from '../../../redux/actions'

function* fetchAgentTopDataWatcherStart() {
  yield takeEvery(fetchAgentTopDataStart.type, fetchAgentTopDataWorker)
}

function* fetchAgentTopDataWorker(action) {
  const { dataType } = action.payload
  try {
    switch (dataType) {
      case 'top-talent': {
        const { data } = yield People.fetchTopTalent()
        yield put(fetchAgentTopDataSuccess({
          agentTopData: data,
        }))
        break
      }
      case 'people-you-may-know': {
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

import { put, takeEvery } from 'redux-saga/effects'
import People from '../../../../service/people'
import {
  fetchTopCompaniesStart,
  fetchTopCompaniesSuccess,
  fetchTopCompaniesFailed,
  showErrorMessage,
} from '../../../../redux/actions'

function* fetchTopCompaniesWatcherStart() {
  yield takeEvery(fetchTopCompaniesStart.type, fetchTopCompaniesWorker)
}

function* fetchTopCompaniesWorker() {
  try {
    const { data } = yield People.fetchTopCompanies()
    yield put(fetchTopCompaniesSuccess({
      topCompanies: data,
    }))
  } catch (e) {
    yield put(fetchTopCompaniesFailed())
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default fetchTopCompaniesWatcherStart

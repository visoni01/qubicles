import { takeEvery, put } from 'redux-saga/effects'
import _ from 'lodash'
import {
  jobCategoriesFetchStart,
  jobCategoriesFetchSuccessful,
} from '../../redux/actions'
import { showErrorMessage } from '../../redux/snackbar'
import People from '../../service/people'

function* categoryDataFetchingWatcherStart() {
  yield takeEvery(jobCategoriesFetchStart.type, categoryDataFetchingWorker)
}

function* categoryDataFetchingWorker(action) {
  try {
    const { searchKeyword } = action.payload
    let { data } = yield People.fetchJobCategories({ searchKeyword })
    data = data.sort((category1, category2) => category2.jobs.length - category1.jobs.length)
    if (!_.isEmpty(searchKeyword)) {
      data = data.filter((category) => !_.isEmpty(category.jobs))
    }
    yield put(jobCategoriesFetchSuccessful({ jobCategories: data }))
  } catch (e) {
    yield put(showErrorMessage({ msg: e }))
  }
}

export default categoryDataFetchingWatcherStart

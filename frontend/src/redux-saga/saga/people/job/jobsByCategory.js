import { takeEvery, put } from 'redux-saga/effects'
import {
  jobsWithCategoriesFetchStart,
  jobsWithCategoriesFetchSuccessful,
} from '../../../redux/actions'
import { showErrorMessage } from '../../../redux/snackbar'
import People from '../../../service/people'

function* jobsByCategoryWatcherStart() {
  yield takeEvery([ jobsWithCategoriesFetchStart.type ], jobsByCategoryWorker)
}

function* jobsByCategoryWorker(action) {
  try {
    const {
      categoryId, searchKeyword, status, clientId, limit, offset,
    } = action.payload
    const { data } = yield People.fetchJobCategoriesAndJobs({
      categoryId,
      searchKeyword,
      status: status === 'all' ? '' : status,
      clientId,
      limit,
      offset,
    })

    yield put(jobsWithCategoriesFetchSuccessful({
      jobsWithCategories: data.jobs,
      isAllJobsFetched: data.isAllJobsFetched,
    }))
  } catch (e) {
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default jobsByCategoryWatcherStart

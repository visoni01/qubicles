import { takeEvery, put } from 'redux-saga/effects'
import _ from 'lodash'
import {
  newJobCategoriesFetchStart,
  newJobCategoriesFetchSuccessful,
  jobsByCategorySuccessful,
} from '../../redux/actions'
import { showErrorMessage } from '../../redux/snackbar'
import People from '../../service/people'
import { GET_JOB_BY_CATEGORY } from '../../redux/constants'

function* jobsByCategoryWatcherStart() {
  yield takeEvery([ newJobCategoriesFetchStart.type, GET_JOB_BY_CATEGORY ], jobsByCategoryWorker)
}

function* jobsByCategoryWorker(action) {
  try {
    switch (action.type) {
      case GET_JOB_BY_CATEGORY: {
        const { categoryId } = action.payload
        const { data: jobsData } = yield People.fetchJobCategoriesAndJobs({ categoryId })
        yield put(jobsByCategorySuccessful({ data: jobsData, categoryId }))
        break
      }
      case newJobCategoriesFetchStart.type: {
        const { searchKeyword } = action.payload
        let { data } = yield People.fetchJobCategoriesAndJobs({ searchKeyword })
        data = data.sort((category1, category2) => category2.jobs.length - category1.jobs.length)
        if (!_.isEmpty(searchKeyword)) {
          data = data.filter((category) => !_.isEmpty(category.jobs))
        }
        yield put(newJobCategoriesFetchSuccessful({ newJobCategories: data }))
        break
      }
      default: return
    }
  } catch (e) {
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default jobsByCategoryWatcherStart

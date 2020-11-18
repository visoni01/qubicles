import { takeEvery, put, select } from 'redux-saga/effects'
import _ from 'lodash'
import { jobsByCategorySuccessful } from '../../redux/actions'
import { showErrorMessage } from '../../redux/snackbar'
import People from '../../service/people'
import { GET_JOB_BY_CATEGORY } from '../../redux/constants'

function* jobsByCategoryWatcherStart() {
  yield takeEvery([ GET_JOB_BY_CATEGORY ], jobsByCategoryWorker)
}

function* jobsByCategoryWorker(action) {
  try {
    const { categoryId } = action.payload
    // console.log('')
    // debugger
    const { data: jobs } = yield People.fetchJobCategories({ categoryId })
    // Modifying the job data
    const data = yield select((state) => state.newJobCategories)
    const newJobCategories = _.cloneDeep(data.newJobCategories)
    const index = newJobCategories.findIndex((category) => category.categoryId === categoryId)
    newJobCategories[ index ].jobs = jobs
    yield put(jobsByCategorySuccessful({ data: newJobCategories, categoryId }))
  } catch (e) {
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default jobsByCategoryWatcherStart

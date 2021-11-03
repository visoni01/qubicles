import { takeEvery, put } from 'redux-saga/effects'
import { companyCoursesFetchStart, companyCoursesFetchSuccessful } from '../../../redux/actions'
import { showErrorMessage } from '../../../redux/utils/snackbar'
import People from '../../../service/people'

function* companyCoursesWatcherStart() {
  yield takeEvery([ companyCoursesFetchStart.type ], companyCoursesWorker)
}

function* companyCoursesWorker(action) {
  try {
    const { companyId, courseFilter, offset } = action.payload

    const { data } = yield People.fetchCompanyCourses({ companyId, courseFilter, offset })

    yield put(companyCoursesFetchSuccessful({
      courses: data.courses,
      count: data.count,
    }))
  } catch (e) {
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default companyCoursesWatcherStart

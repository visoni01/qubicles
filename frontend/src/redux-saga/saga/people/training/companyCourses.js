import { takeEvery, put } from 'redux-saga/effects'
import { companyCoursesData } from '../../../../containers/People/ContactCenter/Training/CompanyCourses/testData'
import {
  companyCoursesFetchStart,
  companyCoursesFetchSuccessful,
} from '../../../redux/actions'
import { showErrorMessage } from '../../../redux/utils/snackbar'

function* companyCoursesWatcherStart() {
  yield takeEvery([ companyCoursesFetchStart.type ], companyCoursesWorker)
}

function* companyCoursesWorker() {
  try {
    const data = companyCoursesData

    yield put(companyCoursesFetchSuccessful({
      courses: data.courses,
      count: data.count,
    }))
  } catch (e) {
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default companyCoursesWatcherStart

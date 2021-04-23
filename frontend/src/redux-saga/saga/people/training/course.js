import { takeEvery, put } from 'redux-saga/effects'
import {
  trainingCourseRequestStart,
  trainingCourseRequestSuccess,
  trainingCourseRequestFailed,
  showErrorMessage,
  showSuccessMessage,
} from '../../../redux/actions'
import People from '../../../service/people'

function* trainingCourseWatcherStart() {
  yield takeEvery(trainingCourseRequestStart.type, trainingCourseWorker)
}

function* trainingCourseWorker(action) {
  try {
    const { course, requestType } = action.payload

    switch (requestType) {
      case 'CREATE': {
        const { data, message } = yield People.addCourse({ course })
        yield put(trainingCourseRequestSuccess({ course: data.courseData }))
        yield put(showSuccessMessage({ msg: message }))
        break
      }
      case 'FETCH': {
        const { data } = yield People.fetchCourse({ courseId: course.courseId })
        yield put(trainingCourseRequestSuccess({ course: data }))
        break
      }
      default: break
    }
  } catch (e) {
    yield put(trainingCourseRequestFailed())
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default trainingCourseWatcherStart

import { takeEvery, put } from 'redux-saga/effects'
import {
  viewCourseRequestStart,
  viewCourseRequestSuccess,
  viewCourseRequestFailed,
  showErrorMessage,
} from '../../../redux/actions'
import People from '../../../service/people'

function* viewCourseWatcher() {
  yield takeEvery(viewCourseRequestStart.type, viewCourseWorker)
}

function* viewCourseWorker(action) {
  try {
    const {
      requestType, dataType, courseId, unitId, status, sectionId,
    } = action.payload

    switch (requestType) {
      case 'FETCH': {
        switch (dataType) {
          case 'Course Info': {
            const { data } = yield People.fetchViewCourse({ courseId })
            yield put(viewCourseRequestSuccess({ course: data }))
            break
          }

          case 'Start Course': {
            const { data } = yield People.startCourse({ courseId })
            yield put(viewCourseRequestSuccess({ courseDetails: data }))
            break
          }

          default: break
        }
        break
      }

      case 'UPDATE': {
        switch (dataType) {
          case 'Course Unit': {
            const { data } = yield People.fetchAndUpdateCourseUnit({ courseId, unitId, status })
            yield put(viewCourseRequestSuccess({ unit: data, sectionId }))
            break
          }

          default: break
        }
        break
      }

      default: break
    }
  } catch (e) {
    yield put(viewCourseRequestFailed())
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default viewCourseWatcher

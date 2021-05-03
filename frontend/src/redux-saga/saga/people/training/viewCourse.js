import { takeEvery, put } from 'redux-saga/effects'
import { viewCourseData } from '../../../../containers/People/ContactCenter/Training/testData'
import {
  viewCourseRequestStart,
  viewCourseRequestSuccess,
  viewCourseRequestFailed,
  showErrorMessage,
} from '../../../redux/actions'
// import People from '../../../service/people'

function* viewCourseWatcher() {
  yield takeEvery(viewCourseRequestStart.type, viewCourseWorker)
}

function* viewCourseWorker(action) {
  try {
    const { requestType, dataType } = action.payload

    switch (requestType) {
      case 'FETCH': {
        switch (dataType) {
          case 'Course Info': {
            // WIP viewCourse API required
            // const { data } = yield People.fetchViewCourse({ courseId: course.courseId })
            yield put(viewCourseRequestSuccess({ course: viewCourseData, dataType }))
            break
          }

          default:
            break
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

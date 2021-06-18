import { takeEvery, put } from 'redux-saga/effects'
import {
  allCoursesRequestStart,
  allCoursesRequestSuccess,
  allCoursesRequestFailed,
  showErrorMessage,
  showSuccessMessage,
  updateAllCoursesReducer,
} from '../../../redux/actions'
import People from '../../../service/people'

function* allCoursesWatcherStart() {
  yield takeEvery(allCoursesRequestStart.type, allCoursesWorker)
}

function* allCoursesWorker(action) {
  try {
    const { requestType } = action.payload

    switch (requestType) {
      case 'FETCH': {
        const { data } = yield People.fetchAllCourses()
        yield put(allCoursesRequestSuccess({ courses: data }))
        break
      }

      case 'UPDATE': {
        const { data } = yield People.fetchCourse({ courseId: action.payload.courseId })
        const { data: courseData } = yield People.copyCourse({
          course: {
            ...data,
            status: 'draft',
            image_url: data.contentSection.thumbnailImage,
            video_url: data.contentSection.introductionVideo,
          },
        })
        yield put(updateAllCoursesReducer({
          courseId: courseData.courseData.courseId,
          newCourseId: action.payload.courseId,
        }))
        yield put(showSuccessMessage({ msg: 'Course copied successfully!' }))
        break
      }
      default: break
    }
  } catch (e) {
    yield put(allCoursesRequestFailed())
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default allCoursesWatcherStart

import { takeEvery, put } from 'redux-saga/effects'
import {
  trainingCourseRequestStart,
  trainingCourseRequestSuccess,
  trainingCourseRequestFailed,
  showErrorMessage,
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
        const formData = new FormData()
        if (course && course.thumbnailImageFile) {
          formData.append('file', course.thumbnailImageFile)
        }
        formData.set('informationSection', course.informationSection)
        formData.set('contentSection', course.contentSection)
        formData.set('courseContent', course.courseContent)
        // const { data } = yield People.addCourse({ course, data: formData })
        const { data } = yield People.addCourse({ data: formData })
        const addedCourse = {
          courseId: data.course_id,
          agentUserId: data.user_id,
          creatorId: data.creator_id,
          createdOn: data.createdAt,
          updateOn: data.updatedAt,
        }
        // WIP
        yield put(trainingCourseRequestSuccess({ course: addedCourse }))
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

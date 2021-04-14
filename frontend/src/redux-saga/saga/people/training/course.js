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
        const { thumbnailImage, ...contentSectionRest } = course.contentSection
        if (course && thumbnailImage) {
          formData.append('file', course.thumbnailImageFile)
        }
        const courseJson = JSON.stringify({
          ...course,
          contentSection: contentSectionRest,
        })

        formData.set('course', courseJson)
        const { data } = yield People.addCourse({ data: formData })
        const addedCourse = {
          courseId: data.course_id,
          agentUserId: data.user_id,
          creatorId: data.creator_id,
          createdOn: data.createdAt,
          updateOn: data.updatedAt,
        }

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

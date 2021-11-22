/* eslint-disable complexity */
import { takeEvery, put } from 'redux-saga/effects'
import { REQUEST_TYPES } from '../../../../utils/constants'
import {
  viewCourseRequestStart, viewCourseRequestSuccess, viewCourseRequestFailed, showErrorMessage,
  courseRatingsFetchSuccessful,
} from '../../../redux/actions'
import {
  ASSESSMENT_TEST, BUY_COURSE, COURSE_INFO, COURSE_UNIT, SECTION_TEST, SECTION_TEST_RESULT, START_COURSE,
} from '../../../redux/constants'
import People from '../../../service/people'

function* viewCourseWatcher() {
  yield takeEvery(viewCourseRequestStart.type, viewCourseWorker)
}

function* viewCourseWorker(action) {
  try {
    const {
      requestType, dataType, courseId, unitId, status, sectionId, questions, courseStatus,
    } = action.payload

    switch (requestType) {
      case REQUEST_TYPES.FETCH: {
        switch (dataType) {
          case COURSE_INFO: {
            const { data } = yield People.fetchViewCourse({ courseId })
            yield put(viewCourseRequestSuccess({ course: data }))
            break
          }

          case START_COURSE: {
            const { data } = yield People.startCourse({ courseId })
            yield put(viewCourseRequestSuccess({ courseDetails: data }))
            yield put(courseRatingsFetchSuccessful({ addReviewAccess: true }))
            break
          }

          case SECTION_TEST: {
            const { data } = yield People.fetchSectionTest({ courseId, sectionId })
            yield put(viewCourseRequestSuccess({ sectionTest: data, sectionId }))
            break
          }

          case BUY_COURSE: {
            const { data } = yield People.buyCourse({ courseId })
            yield put(viewCourseRequestSuccess({ course: data }))
            break
          }

          case ASSESSMENT_TEST: {
            const { data } = yield People.fetchAssessmentTest({ courseId })
            yield put(viewCourseRequestSuccess({ assessmentTest: data }))
            break
          }

          case SECTION_TEST_RESULT: {
            const { data } = yield People.fetchSectionTestResult({ courseId, sectionId })
            yield put(viewCourseRequestSuccess({
              dataType, sectionId, isTestEvaluated: data.isTestEvaluated, testResult: data.testResult,
            }))
            break
          }

          default: break
        }
        break
      }

      case REQUEST_TYPES.UPDATE: {
        switch (dataType) {
          case COURSE_UNIT: {
            const { data } = yield People.fetchAndUpdateCourseUnit({ courseId, unitId, status })
            yield put(viewCourseRequestSuccess({ unit: data, sectionId }))
            break
          }

          case SECTION_TEST: {
            const { data } = yield People.submitSectionTest({
              courseId, sectionId, questions, courseStatus,
            })
            yield put(viewCourseRequestSuccess({ sectionTest: data, sectionId, courseStatus }))
            break
          }

          default: break
        }
        break
      }

      case REQUEST_TYPES.CREATE: {
        switch (dataType) {
          case ASSESSMENT_TEST: {
            const { data } = yield People.submitAssessmentTest({ courseId, questions })
            yield put(viewCourseRequestSuccess({ assessmentTest: data }))
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

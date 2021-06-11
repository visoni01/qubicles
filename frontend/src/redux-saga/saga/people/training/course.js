import _ from 'lodash'
import { eventChannel } from 'redux-saga'
import {
  takeEvery, put, delay, take, fork, call,
} from 'redux-saga/effects'
import { axiosInst } from '../../../../utils/apiClient'
import {
  trainingCourseRequestStart,
  trainingCourseRequestSuccess,
  trainingCourseRequestFailed,
  showErrorMessage,
  showSuccessMessage,
  uploadProgress,
} from '../../../redux/actions'
import People from '../../../service/people'

let emit
const chan = eventChannel((emitter) => {
  emit = emitter
  return () => {}
})

const uploadEmitter = async ({ course, method }) => {
  const formData = new FormData()

  if (course.contentSection.thumbnailImage) {
    const imageFile = await fetch(course.contentSection.thumbnailImage).then((r) => r.blob())
    formData.append('imageFile', imageFile)
  }

  if (course.contentSection.introductionVideo) {
    const introFile = await fetch(course.contentSection.introductionVideo).then((r) => r.blob())
    formData.append('introFile', introFile)
  }

  const courseJson = JSON.stringify(course)
  formData.set('course', courseJson)

  let oldProgressData = -1

  const response = await axiosInst({
    method,
    url: '/people/course',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (progress) => {
      const uploadProgressData = progress.total && Math.round((100 * progress.loaded) / progress.total)
      if (!_.isEqual(oldProgressData, uploadProgressData) && uploadProgressData < 90) {
        emit(uploadProgressData)
        oldProgressData = uploadProgressData
      }
    },
  })

  return response
}

function* watchOnProgress() {
  while (true) {
    const data = yield take(chan)
    yield put(uploadProgress({ uploadProgressData: data }))
  }
}

function* uploadSaga({ action, method }) {
  yield fork(watchOnProgress)
  const { data, message } = yield call(uploadEmitter, { course: action.payload.course, method })
  yield put(uploadProgress({ uploadProgressData: 100 }))
  yield delay(500)
  yield put(trainingCourseRequestSuccess({ course: { ...data.courseData, status: action.payload.course.status } }))
  yield put(showSuccessMessage({ msg: message }))
}

function* trainingCourseWatcherStart() {
  yield takeEvery(trainingCourseRequestStart.type, trainingCourseWorker)
}

function* trainingCourseWorker(action) {
  try {
    const { course, requestType } = action.payload

    switch (requestType) {
      case 'CREATE': {
        yield call(uploadSaga, { action, method: 'post' })
        break
      }
      case 'UPDATE': {
        yield call(uploadSaga, { action, method: 'put' })
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

/* eslint-disable complexity */
import { takeLatest, put } from 'redux-saga/effects'
import apiClient from '../../utils/apiClient'
import {
  postSignUpStepStart,
  postSignUpStepSuccessful,
  postSignUpPreviousDataSuccess,
  postSignUpStepFailure,
  postSignUpPreviousDataFetch,
} from '../redux/postSignup'
import {
  POST_SIGNUP_EMPLOYER_PREVIOUS_DATA_FETCH,
  POST_SIGNUP_AGENT_PREVIOUS_DATA_FETCH,
} from '../redux/constants'
import { startLoader, stopLoader } from '../redux/loader'
import { showErrorMessage } from '../redux/snackbar'
import SignUp from '../service/signup'
import { getPostSignUpStepsData } from './helper'
import { resetUserDetails, showInvitePopup } from '../redux/login'
import User from '../service/user'

function* postSignupStepWatcher() {
  yield takeLatest([
    postSignUpStepStart.type,
    postSignUpPreviousDataFetch.type,
  ], postSignupStepWorker)
}

function* postSignupStepWorker(action) {
  try {
    switch (action.type) {
      case postSignUpStepStart.type: {
        yield put(startLoader())
        const { type, step, data } = action.payload
        if (step === 1) data.user_code = type
        if (step === 4 && type !== 'employer') {
          const formData = new FormData()
          formData.append('file', data.id_url)
          const uploadResult = yield User.uploadDocumentId({ userType: type, step, data: formData })
          yield put(postSignUpStepSuccessful({ step, data: { id_url: uploadResult.data.url } }))
        } else {
          yield apiClient.postSignUp(type, step, data)
          yield put(postSignUpStepSuccessful({ step, data }))
        }
        if ((type === 'employer' && step === 3) || (type !== 'employer' && step === 5)) {
          yield put(resetUserDetails())
          yield put(showInvitePopup())
        }

        yield put(stopLoader())
        break
      }
      case postSignUpPreviousDataFetch.type: {
        const { type } = action.payload
        yield put(startLoader())
        let stepsData = {}
        if (type === POST_SIGNUP_EMPLOYER_PREVIOUS_DATA_FETCH) {
          yield put(startLoader())
          const { data } = yield SignUp.previousPostSignupDataForEmployee()
          stepsData = getPostSignUpStepsData({ type: POST_SIGNUP_EMPLOYER_PREVIOUS_DATA_FETCH, data })
        } else {
          yield put(startLoader())
          const { data } = yield SignUp.previousPostSignupDataForAgent()
          stepsData = getPostSignUpStepsData({ type: POST_SIGNUP_AGENT_PREVIOUS_DATA_FETCH, data })
        }
        yield put(postSignUpPreviousDataSuccess({ stepsData }))
        yield put(stopLoader())
        break
      }
      default:
        break
    }
  } catch (e) {
    yield put(showErrorMessage({ msg: e.errMsg }))
    yield put(postSignUpStepFailure())

    yield put(stopLoader())
  }
}

export default postSignupStepWatcher

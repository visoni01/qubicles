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
        yield apiClient.postSignUp(type, step, data)
        yield put(postSignUpStepSuccessful({ step, data }))
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
          const { data } = yield SignUp.previousPostSignupDataForCompany()
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

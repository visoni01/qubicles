/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import _ from 'lodash'
import moment from 'moment'
import { POST_SIGNUP_AGENT_PREVIOUS_DATA_FETCH } from '../../../../../redux-saga/redux/constants'
import StepperComponent from '../../../../../components/User/Stepper'
import MultipartForm from './multipartForm'
import {
  postSignUpStepStart, handleBackStep, handleNextStep, postSignUpPreviousDataFetch,
} from '../../../../../redux-saga/redux/user/postSignup'

const AgentMultipartForm = () => {
  const { stepsData, currentStep, isLoading } = useSelector((state) => state.postSignUp)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(postSignUpPreviousDataFetch({ type: POST_SIGNUP_AGENT_PREVIOUS_DATA_FETCH }))
  }, [ dispatch ])

  const handleOnNext = (data) => {
    if (data.dob) {
      data.dob = moment(data.dob, 'YYYY-MM-DD').format('YYYY-MM-DD')
    }

    if (currentStep !== 5 && ((stepsData[ currentStep ] && _.isEqual(stepsData[ currentStep ], data)))) {
      return dispatch(handleNextStep())
    }

    return dispatch(postSignUpStepStart({ type: 'agent', step: currentStep, data }))
  }

  const handleOnBack = () => dispatch(handleBackStep())

  if (isLoading) {
    return <></>
  }

  return (
    <>
      {/* activeStep prop starts from index value of steps provided i.e. 5 for agent-form */}
      <StepperComponent steps={ 5 } activeStep={ currentStep - 1 } />
      <MultipartForm
        step={ currentStep }
        onNext={ handleOnNext }
        onBack={ handleOnBack }
        onSubmit={ handleOnNext }
        stepData={ stepsData && stepsData[ currentStep ] }
      />
      {currentStep === 6 && <Redirect to='/dashboard' />}
    </>
  )
}

export default AgentMultipartForm

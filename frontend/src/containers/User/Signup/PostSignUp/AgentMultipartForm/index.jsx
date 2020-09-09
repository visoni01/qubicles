import React, { useEffect } from 'react'
import {
  faCheck, faVenusMars, faBriefcase, faIdCard, faPoll, faAddressCard,
} from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import _ from 'lodash'
import moment from 'moment'
import { POST_SIGNUP_AGENT_PREVIOUS_DATA_FETCH } from '../../../../../redux-saga/redux/constants'

import StepperComponent from '../../../../../components/Stepper'
import MultipartForm from './multipartForm'
import {
  postSignUpStepStart,
  handleBackStep,
  handleNextStep,
  postSignUpPreviousDataFetch,
} from '../../../../../redux-saga/redux/postSignup'

const AgentMultipartForm = () => {
  const dispatch = useDispatch()
  const {
    stepsData, currentStep, isLoading,
  } = useSelector(
    (state) => state.postSignUp,
  )

  useEffect(() => {
    dispatch(postSignUpPreviousDataFetch({ type: POST_SIGNUP_AGENT_PREVIOUS_DATA_FETCH }))
  }, [ dispatch ])

  const handleOnNext = (data) => {
    if (data.dob) {
      data.dob = moment(data.dob, 'YYYY-MM-DD').format('YYYY-MM-DD')
    }

    if (currentStep !== 5 && ((stepsData[ currentStep ] && _.isEqual(stepsData[ currentStep ], data)) || currentStep === 4)) {
      return dispatch(handleNextStep())
    }
    return dispatch(postSignUpStepStart({ type: 'agent', step: currentStep, data }))
  }

  const handleOnBack = () => dispatch(handleBackStep())

  const steps = [
    { icon: faCheck },
    { icon: faVenusMars },
    { icon: faAddressCard },
    { icon: faBriefcase },
    { icon: faIdCard },
    { icon: faPoll },
  ].map((step, index) => {
    if (index < currentStep) return { icon: faCheck }
    return step
  })

  if (isLoading) {
    return <></>
  }

  return (
    <>
      <StepperComponent steps={ steps } activeStep={ currentStep } />
      <MultipartForm
        step={ currentStep }
        onNext={ handleOnNext }
        onBack={ handleOnBack }
        onSubmit={ handleOnNext }
        stepData={ stepsData && stepsData[ currentStep ] }
      />
      {currentStep === 6 && <Redirect to='/invite-friends' />}
    </>
  )
}

export default AgentMultipartForm

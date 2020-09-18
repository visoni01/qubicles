import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import _ from 'lodash'
import { POST_SIGNUP_EMPLOYER_PREVIOUS_DATA_FETCH } from '../../../../../redux-saga/redux/constants'
import Form from './multipartForm'
import StepperComponent from '../../../../../components/Stepper'
import {
  postSignUpStepStart,
  handleBackStep,
  handleNextStep,
  postSignUpPreviousDataFetch,
} from '../../../../../redux-saga/redux/postSignup'

const ContactCenterMultiPartForm = () => {
  const dispatch = useDispatch()
  const {
    stepsData, currentStep, isLoading,
  } = useSelector(
    (state) => state.postSignUp,
  )

  useEffect(() => {
    dispatch(postSignUpPreviousDataFetch({ type: POST_SIGNUP_EMPLOYER_PREVIOUS_DATA_FETCH }))
  }, [ dispatch ])

  const handleOnNext = (data) => {
    const stepDataForCurrentStep = stepsData[ currentStep ]
    if (currentStep !== 3 && stepDataForCurrentStep && _.isEqual(stepDataForCurrentStep, data)) {
      return dispatch(handleNextStep())
    }

    return dispatch(postSignUpStepStart({ type: 'employer', step: currentStep, data }))
  }
  const handleOnBack = () => dispatch(handleBackStep())

  const steps = [
    { icon: 1, label: 1 },
    { icon: 2, label: 2 },
    { icon: 3, label: 3 },
  ].map((step) => step)

  if (isLoading) {
    return <></>
  }

  return (
    <>
      {/* activeStep prop starts from initial index value of steps array */}
      <StepperComponent steps={ steps } activeStep={ currentStep - 1 } />
      <Form
        step={ currentStep }
        onNext={ handleOnNext }
        onBack={ handleOnBack }
        onSubmit={ handleOnNext }
        stepData={ stepsData && stepsData[ currentStep ] }
      />
      {currentStep === 4 && <Redirect to='/invite-friends' />}
    </>
  )
}

export default ContactCenterMultiPartForm

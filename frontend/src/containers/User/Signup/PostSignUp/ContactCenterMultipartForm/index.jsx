import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import _ from 'lodash'
import { POST_SIGNUP_EMPLOYER_PREVIOUS_DATA_FETCH } from '../../../../../redux-saga/redux/constants'
import Form from './multipartForm'
import StepperComponent from '../../../../../components/User/Stepper'
import {
  postSignUpStepStart, handleBackStep, handleNextStep, postSignUpPreviousDataFetch,
} from '../../../../../redux-saga/redux/user/postSignup'

const ContactCenterMultiPartForm = () => {
  const { stepsData, currentStep } = useSelector((state) => state.postSignUp)

  const dispatch = useDispatch()

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

  return (
    <>
      {/* activeStep prop starts from index value of steps provided i.e. 3 for contact-center-form */}
      <StepperComponent steps={ 3 } activeStep={ currentStep - 1 } />
      <Form
        step={ currentStep }
        onNext={ handleOnNext }
        onBack={ handleOnBack }
        onSubmit={ handleOnNext }
        stepData={ stepsData && stepsData[ currentStep ] }
      />
      {currentStep === 4 && <Redirect to='/dashboard' />}
    </>
  )
}

export default ContactCenterMultiPartForm

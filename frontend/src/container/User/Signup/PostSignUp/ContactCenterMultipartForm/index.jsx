import React, { useState } from 'react'
import { faCog } from '@fortawesome/free-solid-svg-icons'

import { useSelector, useDispatch } from 'react-redux'
import Form from './multipartForm'
import StepperComponent from '../../../../../components/Stepper'
import { postSignUpStepStart, handleBackStep } from '../../../../../redux-saga/redux/postSignup'

const ContactCenterMultiPartForm = ( { role } ) => {
  const dispatch = useDispatch()
  const {
    stepsData, currentStep,
  } = useSelector(
    ( state ) => state.postSignUp,
  )

  const handleOnNext = ( data ) => {
    dispatch( postSignUpStepStart( { type: role, step: currentStep, data } ) )
  }
  const handleOnBack = () => dispatch( handleBackStep() )
  const handleSubmit = () => {}

  const steps = [ { icon: faCog }, { icon: faCog }, { icon: faCog } ]

  return (
    <>
      <StepperComponent steps={ steps } activeStep={ currentStep - 1 } />
      <Form
        step={ currentStep }
        onNext={ handleOnNext }
        onBack={ handleOnBack }
        onSubmit={ handleSubmit }
        stepData={ stepsData && stepsData[ currentStep ] }
      />
    </>
  )
}

export default ContactCenterMultiPartForm

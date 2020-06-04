import React, { useState } from 'react'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'

import StepperComponent from '../../../../../components/Stepper'
import MutlipartForm from './multipartForm'
import { postSignUpStepStart, handleBackStep } from '../../../../../redux-saga/redux/postSignup'

const AgentMultipartForm = ( { role } ) => {
  const dispatch = useDispatch()
  const {
    stepsData, currentStep,
  } = useSelector(
    ( state ) => state.postSignUp,
  )
  const handleOnNext = ( data ) => {
    dispatch( postSignUpStepStart( { type: role, currentStep, data } ) )
  }
  const handleOnBack = () => dispatch( handleBackStep() )
  const handleSubmit = () => {}

  const steps = [
    { icon: faCog },
    { icon: faCog },
    { icon: faCog },
    { icon: faCog },
    { icon: faCog },
  ]

  return (
    <>
      <StepperComponent steps={ steps } activeStep={ currentStep - 1 } />
      <MutlipartForm
        step={ currentStep }
        onNext={ handleOnNext }
        onBack={ handleOnBack }
        onSubmit={ handleSubmit }
        stepData={ stepsData && stepsData[ currentStep ] }
      />
    </>
  )
}

export default AgentMultipartForm

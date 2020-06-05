import React, { useState } from 'react'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import {Redirect} from 'react-router-dom';

import StepperComponent from '../../../../../components/Stepper'
import MutlipartForm from './multipartForm'
import {
  postSignUpStepStart,
  handleBackStep,
  handleNextStep,
} from '../../../../../redux-saga/redux/postSignup'

const AgentMultipartForm = ( { role } ) => {
  const dispatch = useDispatch()
  const {
    stepsData, currentStep,
  } = useSelector(
    ( state ) => state.postSignUp,
  )
  const handleOnNext = ( data ) => {
    if ( stepsData[currentStep] ) {
      return dispatch(handleNextStep())
    }
    dispatch( postSignUpStepStart( { type: role, step: currentStep, data } ) )
  }
  const handleOnBack = () => dispatch( handleBackStep() )

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
        onSubmit={ handleOnNext }
        stepData={ stepsData && stepsData[ currentStep ] }
      />
      {currentStep === 6 && <Redirect to='/dashboard' />}
    </>
  )
}

export default AgentMultipartForm

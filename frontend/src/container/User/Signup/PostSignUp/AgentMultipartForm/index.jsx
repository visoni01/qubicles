import React from 'react'
import {
  faCheck, faVenusMars, faBriefcase, faIdCard, faPoll, faAddressCard,
} from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'

import StepperComponent from '../../../../../components/Stepper'
import MutlipartForm from './multipartForm'
import {
  postSignUpStepStart,
  handleBackStep,
  handleNextStep,
} from '../../../../../redux-saga/redux/postSignup'

const AgentMultipartForm = () => {
  const dispatch = useDispatch()
  const {
    stepsData, currentStep,
  } = useSelector(
    ( state ) => state.postSignUp,
  )
  const handleOnNext = ( data ) => {
    if ( stepsData[ currentStep ] || currentStep === 4 ) {
      return dispatch( handleNextStep() )
    }
    return dispatch( postSignUpStepStart( { type: 'agent', step: currentStep, data } ) )
  }
  const handleOnBack = () => dispatch( handleBackStep() )

  const steps = [
    { icon: faCheck },
    { icon: faVenusMars },
    { icon: faAddressCard },
    { icon: faBriefcase },
    { icon: faIdCard },
    { icon: faPoll },
  ].map( ( step, index ) => {
    if ( index < currentStep ) return { icon: faCheck }
    return step
  } )

  return (
    <>
      <StepperComponent steps={ steps } activeStep={ currentStep } />
      <MutlipartForm
        step={ currentStep }
        onNext={ handleOnNext }
        onBack={ handleOnBack }
        onSubmit={ handleOnNext }
        stepData={ stepsData && stepsData[ currentStep ] }
      />
      {currentStep === 6 && <Redirect to="/invite-friends" />}
    </>
  )
}

export default AgentMultipartForm

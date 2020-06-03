import React, { useState } from 'react'
import { faCog } from '@fortawesome/free-solid-svg-icons'

import { useSelector, useDispatch } from 'react-redux'
import Form from './multipartForm'
import StepperComponent from '../../../../../components/Stepper'
import { postSignUpStepStart } from '../../../../../redux-saga/redux/postSignup'

const ContactCenterMultiPartForm = ( { role } ) => {
  const dispatch = useDispatch()
  const {
    error, isLoading, success, stepsData,
  } = useSelector(
    ( state ) => state.postSignUp,
  )

  const [ step, setStep ] = useState( 1 )
  const handleOnNext = ( data ) => {
    dispatch( postSignUpStepStart( { type: role, step, data } ) )
    success && setStep( step + 1 )
  }
  const handleOnBack = () => setStep( step - 1 )
  const handleSubmit = () => {}

  const steps = [ { icon: faCog }, { icon: faCog }, { icon: faCog } ]

  return (
    <>
      <StepperComponent steps={ steps } activeStep={ step - 1 } />
      <Form
        step={ step }
        onNext={ handleOnNext }
        onBack={ handleOnBack }
        onSubmit={ handleSubmit }
      />
    </>
  )
}

export default ContactCenterMultiPartForm

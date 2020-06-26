import React from 'react'
import {
  faCheck, faAddressBook, faPoll, faBuilding,
} from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Form from './multipartForm'
import StepperComponent from '../../../../../components/Stepper'
import {
  postSignUpStepStart,
  handleBackStep,
  handleNextStep,
} from '../../../../../redux-saga/redux/postSignup'

const ContactCenterMultiPartForm = () => {
  const dispatch = useDispatch()
  const {
    stepsData, currentStep,
  } = useSelector(
    (state) => state.postSignUp,
  )

  const handleOnNext = (data) => {
    if (stepsData[ currentStep ]) {
      return dispatch(handleNextStep)
    }
    return dispatch(postSignUpStepStart({ type: 'employer', step: currentStep, data }))
  }
  const handleOnBack = () => dispatch(handleBackStep())

  const steps = [ { icon: faCheck }, { icon: faAddressBook }, { icon: faBuilding }, { icon: faPoll } ].map((step, index) => {
    if (index < currentStep) return { icon: faCheck }
    return step
  })

  return (
    <>
      <StepperComponent steps={ steps } activeStep={ currentStep } />
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

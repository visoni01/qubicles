import React, { useEffect } from 'react'
import {
  faCheck, faAddressBook, faPoll, faBuilding,
} from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { POST_SIGNUP_EMPLOYEE_PREVIOUS_DATA_FETCH } from '../../../../../redux-saga/redux/constants'
import Form from './multipartForm'
import StepperComponent from '../../../../../components/Stepper'
import {
  postSignUpStepStart,
  handleBackStep,
  handleNextStep,
  postSignUpPreviousDataFetch
} from '../../../../../redux-saga/redux/postSignup'

const ContactCenterMultiPartForm = () => {
  const dispatch = useDispatch()
  const {
    stepsData, currentStep, isLoading
  } = useSelector(
    (state) => state.postSignUp,
  )

  useEffect(() => {
    dispatch(postSignUpPreviousDataFetch({ type: POST_SIGNUP_EMPLOYEE_PREVIOUS_DATA_FETCH }))
  }, [ ])

  const handleOnNext = (data) => {
    if (stepsData[ currentStep ]) {
      return dispatch(handleNextStep)
    }
    return dispatch(postSignUpStepStart({ type: 'employer', step: currentStep, data }))
  }
  const handleOnBack = () => dispatch(handleBackStep())

  const steps = [
    { icon: faCheck },
    { icon: faAddressBook },
    { icon: faBuilding },
    { icon: faPoll } ].map((step, index) => {
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

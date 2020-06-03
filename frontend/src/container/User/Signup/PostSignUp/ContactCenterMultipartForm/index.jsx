import React, { useState } from 'react'
import { faCog } from '@fortawesome/free-solid-svg-icons'

import Form from './form'
import StepperComponent from '../../../../../components/Stepper'

const ContactCenterMultiPartForm = () => {
  const [ step, setStep ] = useState( 1 )
  const handleOnNext = () => setStep( step + 1 )
  const handleOnBack = () => setStep( step - 1 )

  const steps = [
    { icon: faCog },
    { icon: faCog },
    { icon: faCog },
    { icon: faCog },
  ]

  return (
    <>
      <StepperComponent steps={ steps } activeStep={ step } />
      <Form step={ step } onNext={ handleOnNext } onBack={ handleOnBack } />
    </>
  )
}

export default ContactCenterMultiPartForm

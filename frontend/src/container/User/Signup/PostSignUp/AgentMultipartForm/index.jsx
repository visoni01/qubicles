import React, { useState } from 'react'
import { faCog } from '@fortawesome/free-solid-svg-icons'

import StepperComponent from '../../../../../components/Stepper'
import MutlipartForm from './multipartForm'

const AgentMultipartForm = () => {
  const [ step, setStep ] = useState( 1 )
  const handleOnNext = () => setStep( step + 1 )
  const handleOnBack = () => setStep( step - 1 )

  const steps = [
    { icon: faCog },
    { icon: faCog },
    { icon: faCog },
    { icon: faCog },
    { icon: faCog },
    { icon: faCog },
  ]

  return (
    <>
      <StepperComponent steps={ steps } activeStep={ step } />
      <MutlipartForm step={ step } onNext={ handleOnNext } onBack={ handleOnBack } />
    </>
  )
}

export default AgentMultipartForm

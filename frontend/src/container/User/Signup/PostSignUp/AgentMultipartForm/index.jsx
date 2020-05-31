import React, { useState } from 'react'
import StepForm from './stepForm'

const AgentMultipartForm = () => {
  const [ step, setStep ] = useState( 1 )
  const handleOnNext = () => setStep( step + 1 )
  const handleOnBack = () => setStep( step - 1 )

  return <StepForm step={ step } onNext={ handleOnNext } onBack={ handleOnBack } />
}

export default AgentMultipartForm

import React, { useState } from 'react'
import Form from './form'

const ContactCenterMultiPartForm = () => {
  const [ step, setStep ] = useState( 1 )
  const handleOnNext = () => setStep( step + 1 )
  const handleOnBack = () => setStep( step - 1 )

  return <Form step={ step } onNext={ handleOnNext } onBack={ handleOnBack } />
}

export default ContactCenterMultiPartForm

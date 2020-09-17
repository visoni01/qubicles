import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import ROUTE_PATHS from '../../routes/routesPath'

const VerificationPageButton = () => {
  const history = useHistory()
  const handleCreateAccountLink = useCallback(() => {
    history.push(ROUTE_PATHS.VERIFY_EMAIL)
  }, [ history ])

  return (
    <button type='button' className='text-button mb-20' onClick={ handleCreateAccountLink }>
      Resend Verification Link from here
    </button>
  )
}

export default VerificationPageButton

import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import ROUTE_PATHS from '../../routes/routesPath'

const VerificationPageButton = () => {
  const { showVerifyMailButton } = useSelector((state) => state.login)
  const history = useHistory()
  const handleCreateAccountLink = useCallback(() => {
    history.push(ROUTE_PATHS.VERIFY_EMAIL)
  })
  if (showVerifyMailButton) {
    return (
      <button type='button' className='text-button mt-20' onClick={ handleCreateAccountLink }>
        Click here to verify your Email
      </button>
    )
  }
  return (<></>)
}

export default VerificationPageButton

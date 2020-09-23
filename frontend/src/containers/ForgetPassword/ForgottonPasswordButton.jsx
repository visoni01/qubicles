import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import ROUTE_PATHS from '../../routes/routesPath'

const ForgottenPasswordButton = () => {
  const history = useHistory()
  const handleCreateAccountLink = useCallback(() => {
    history.push(ROUTE_PATHS.FORGET_PASSWORD)
  }, [ history ])

  return (
    <button type='button' className='text-button mb-20' onClick={ handleCreateAccountLink }>
      Forgotten password ?
    </button>
  )
}

export default ForgottenPasswordButton

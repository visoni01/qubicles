import React, { useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { emailVerificationStart } from '../../../../redux-saga/redux/emailVerification'
import './style.scss'

const EmailVerification = () => {
  const { token } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(emailVerificationStart(token))
    // eslint-disable-next-line
  }, [ dispatch ])
  const {
    error, success, email, tokenType,
  } = useSelector(
    (state) => state.emailVerification,
  )
  return (
    <>
      {console.log('tokenType, email,  success*****', tokenType, email, success)}
      { (tokenType && success) && <Redirect to='/reset-new-password' />}
      {success && <Redirect to='/post-signup' />}
      {error && <div className='email-verification-error-msg'>{' Link is expired or invalid!! '}</div>}
    </>
  )
}

export default EmailVerification

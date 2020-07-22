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
  const { error, success } = useSelector(
    (state) => state.emailVerification,
  )
  return (
    <>
      {success && <Redirect to='/post-signup' />}
      {error && <>{' An unexpected error occured '}</>}
    </>
  )
}

export default EmailVerification

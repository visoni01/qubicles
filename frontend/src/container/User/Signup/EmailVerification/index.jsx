import React, { useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { emailVerificationStart } from '../../../../redux-saga/redux/emailVerification'
import { CircularLoader } from '../../../../components/loaders'
import './style.scss'

const EmailVerification = () => {
  const { token } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(emailVerificationStart(token))
  }, [])
  const { error, isLoading, success } = useSelector(
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
